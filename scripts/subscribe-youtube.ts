import fetch from 'node-fetch'; // Will use node-fetch or native fetch in Node 18+

async function subscribe() {
  // Replace this with your actual production Vercel URL
  const CALLBACK_URL = 'https://ingraham-methodist-church.vercel.app/api/webhooks/youtube';
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!CHANNEL_ID) {
    console.error('YOUTUBE_CHANNEL_ID is not set in your environment.');
    return;
  }

  const TOPIC_URL = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const HUB_URL = 'https://pubsubhubbub.appspot.com/subscribe';

  const formData = new URLSearchParams();
  formData.append('hub.callback', CALLBACK_URL);
  formData.append('hub.topic', TOPIC_URL);
  formData.append('hub.verify', 'async');
  formData.append('hub.mode', 'subscribe');

  console.log(`Subscribing to YouTube PubSubHubbub...`);
  console.log(`Topic: ${TOPIC_URL}`);
  console.log(`Callback: ${CALLBACK_URL}`);

  try {
    const response = await fetch(HUB_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      console.log('Successfully requested subscription. YouTube will send a GET request to your callback to verify.');
    } else {
      const text = await response.text();
      console.error(`Failed to subscribe. Status: ${response.status}. Message: ${text}`);
    }
  } catch (error) {
    console.error('Error during subscription:', error);
  }
}

subscribe();
