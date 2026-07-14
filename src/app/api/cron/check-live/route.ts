import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { supabaseAdmin } from '@/utils/supabase/admin';
import fetchNode from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Force dynamic so it doesn't get cached at build time
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let isLive = false;
    let platform: string | null = null;
    let videoId: string | null = null;
    let embedUrl: string | null = null;
    let title: string | null = null;
    let thumbnailUrl: string | null = null;

    // 1. Check Facebook
    // FACEBOOK_PAGE_USERNAME might be a full URL or just the username
    let fbBaseUrl = process.env.FACEBOOK_PAGE_USERNAME || '';
    if (!fbBaseUrl.startsWith('http')) {
      fbBaseUrl = `https://www.facebook.com/${fbBaseUrl}`;
    }
    // ensure no trailing slash
    fbBaseUrl = fbBaseUrl.replace(/\/$/, '');
    
    const fbLiveUrl = `${fbBaseUrl}/live`;
    
    try {
      const proxyPassword = process.env.APIFY_PROXY_PASSWORD;
      // Using 'auto' group which selects a proxy dynamically from Apify datacenter or residential proxies
      const agent = proxyPassword ? new HttpsProxyAgent(`http://auto:${proxyPassword}@proxy.apify.com:8000`) : undefined;

      const fbRes = await fetchNode(fbLiveUrl, {
        agent,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });
      const fbHtml = await fbRes.text();
      const $ = cheerio.load(fbHtml);

      // Facebook often redirects to the video permalink when live.
      // E.g. https://www.facebook.com/username/videos/123456789
      const ogUrl = $('meta[property="og:url"]').attr('content') || fbRes.url;
      const isFbVideo = ogUrl.includes('/videos/');
      
      // Some other indicators in case of no redirect:
      const ogTitle = $('meta[property="og:title"]').attr('content') || '';
      
      // If the resulting page is a specific video, we assume they are live (or it's the latest video, 
      // but /live specifically redirects to the currently live video if active).
      // Note: Facebook scraping is notoriously unreliable without auth. We make a best-effort check.
      if (isFbVideo && !ogTitle.toLowerCase().includes('not found')) {
        isLive = true;
        platform = 'facebook';
        title = ogTitle;
        thumbnailUrl = $('meta[property="og:image"]').attr('content') || null;
        embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(ogUrl)}&show_text=false`;
      }
    } catch (fbError) {
      console.error('Facebook check failed:', fbError);
    }

    // 2. Check YouTube if Facebook is not live
    if (!isLive) {
      const ytChannelId = process.env.YOUTUBE_CHANNEL_ID;
      if (ytChannelId) {
        const ytLiveUrl = `https://www.youtube.com/channel/${ytChannelId}/live`;
        try {
          const ytRes = await fetch(ytLiveUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          });
          const ytHtml = await ytRes.text();
          
          if (ytHtml.includes('"isLiveNow":true') || ytHtml.includes('"isLive":true')) {
            isLive = true;
            platform = 'youtube';
            
            const $ = cheerio.load(ytHtml);
            const canonicalUrl = $('link[rel="canonical"]').attr('href') || '';
            const vIdMatch = canonicalUrl.match(/v=([^&]+)/);
            if (vIdMatch) {
              videoId = vIdMatch[1];
            } else {
              // fallback videoId extraction
              const fallbackMatch = ytHtml.match(/"videoId":"([^"]+)"/);
              if (fallbackMatch) videoId = fallbackMatch[1];
            }
            
            title = $('meta[name="title"]').attr('content') || $('title').text().replace(' - YouTube', '');
            
            if (videoId) {
              thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
              embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
          }
        } catch (ytError) {
          console.error('YouTube check failed:', ytError);
        }
      }
    }

    // 3. Update Supabase
    // We only have one row with id = 1
    const { error } = await supabaseAdmin
      .from('live_status')
      .update({
        is_live: isLive,
        platform,
        video_id: videoId,
        embed_url: embedUrl,
        title,
        thumbnail_url: thumbnailUrl,
        last_checked: new Date().toISOString(),
      })
      .eq('id', 1);

    if (error) {
      console.error('Failed to update live_status:', error);
      return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      isLive,
      platform,
      title,
    });
  } catch (error: any) {
    console.error('Live check error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
