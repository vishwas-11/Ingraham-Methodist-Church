# Ingraham Shalom Methodist Church — Events Playbook & Architecture Rules

This document serves as the **definitive source of truth, rules, and architectural decisions** for adding, updating, or maintaining church events on this website. Future AI assistants and developers must adhere to these conventions.

---

## 1. Architecture Overview & Data Flow

Events are managed through a centralized, reactive data architecture:

```
src/data/events.ts (Single Source of Truth)
   │
   ├── getUpcomingEvents()  ──> Homepage Carousel (UpcomingEventsCarousel) & /events (Upcoming Grid)
   ├── getPastEvents()      ──> /events (Past Events Grid) & Homepage Carousel Archive
   └── getEventBySlug()     ──> Dynamic Event Detail Page (/events/[slug])
```

- **Data File**: [`src/data/events.ts`](file:///c:/IngrahamChurch/ingraham_church_website/src/data/events.ts)
- **Live Scheduling Helper**: [`src/utils/live-schedule.ts`](file:///c:/IngrahamChurch/ingraham_church_website/src/utils/live-schedule.ts)
- **Card Component**: [`src/components/EventCard.tsx`](file:///c:/IngrahamChurch/ingraham_church_website/src/components/EventCard.tsx)
- **Gallery Viewer Component**: [`src/components/EventGalleryViewer.tsx`](file:///c:/IngrahamChurch/ingraham_church_website/src/components/EventGalleryViewer.tsx)
- **Live Stream Embed Component**: [`src/components/EventLivePlayer.tsx`](file:///c:/IngrahamChurch/ingraham_church_website/src/components/EventLivePlayer.tsx)
- **Event Detail Route**: [`src/app/events/[slug]/page.tsx`](file:///c:/IngrahamChurch/ingraham_church_website/src/app/events/%5Bslug%5D/page.tsx)

---

## 2. Event Schema & Field Specifications

Every event in `eventsData` follows the `ChurchEvent` interface:

```typescript
export type EventStatus = 'upcoming' | 'live' | 'past';

export interface ChurchEvent {
  id: string;               // Unique kebab-case identifier (e.g., 'shubh-sandesh-worship-his-majesty-dr-vijay-benedict-2026')
  slug: string;             // URL-friendly slug for /events/[slug]
  title: string;            // Full display title (Serif font, high aesthetic)
  date: string;             // Human-readable date string (e.g., 'Tuesday, November 3, 2026')
  time: string;             // Human-readable time (e.g., '5:30 PM')
  location: string;         // Full venue address (always includes Ingraham Shalom Methodist Church)
  shortDescription: string; // 1-2 concise sentences for event cards (max 3 lines clamp)
  longDescription: string;  // Multi-paragraph markdown/text separated by '\n\n'
  image: string;            // Primary card cover / banner image path (e.g., '/events/images/VB.jpeg')
  status: EventStatus;      // Default static status ('upcoming' | 'live' | 'past')
  eventDate?: string;       // Strict 'YYYY-MM-DD' in Asia/Kolkata timezone (Required for automatic lifecycle)
  eventStartTime?: string;  // 24h format 'HH:mm' in IST (e.g., '17:30' for 5:30 PM)
  eventEndTime?: string;    // 24h format 'HH:mm' in IST (e.g., '22:30' for 10:30 PM)
  isRecurring?: boolean;    // true for weekly services ('sunday-divine-worship', 'aaghaz-saturday-myf-worship')
  gallery?: string[];       // Array of poster/banner image paths for the interactive lightbox viewer
  youtubeUrl?: string;      // Optional external YouTube recording link
  isInfoPending?: boolean;  // Set true if full details are awaited
}
```

### Image Path Convention
- Store images in: `public/events/images/<NAME>.jpeg`
- Also mirror in: `public/images/events/<NAME>.jpeg`
- Reference in code as: `/events/images/<NAME>.jpeg`

---

## 3. Automated Lifecycle & State Machine

**Never manually flip an event to past after it finishes.** The lifecycle is fully autonomous via `getResolvedEventStatus(event)` in `src/data/events.ts`:

### Lifecycle Rules (Asia/Kolkata Timezone)
1. **Pre-Event (`upcoming`)**:
   - `currentDate < eventDate` OR (`currentDate === eventDate` and `currentTime < eventStartTime`).
   - Displays gold **`Upcoming`** badge with breathing pulse.
   - Action button reads: **`Discover More →`** / **`View Details`**.
2. **In Progress (`live`)**:
   - `currentDate === eventDate` AND `currentTime >= eventStartTime` AND `currentTime < eventEndTime`.
   - For recurring Sunday worship: Sundays 9:00 AM – 1:00 PM IST.
   - For Saturday MYF Aaghaz: Saturdays 7:00 PM – 9:30 PM IST.
   - Displays crimson **`🔴 LIVE NOW`** badge with animated radar ping.
   - Action button automatically switches to: **`Watch Live 📡`**.
   - **Priority sorting**: `getUpcomingEvents()` automatically promotes active `live` events to the very front of the carousel and grid.
3. **Concluded (`past`)**:
   - `currentDate > eventDate` OR (`currentDate === eventDate` and `currentTime >= eventEndTime`).
   - Card automatically receives the burgundy **`Past Event`** badge.
   - Automatically leaves the **UPCOMING EVENTS** grid on `/events`.
   - Automatically becomes the top/first item in **PAST EVENTS** on `/events`.
   - Detail page sidebar callout changes from *"Warm Invitation"* to *"Event Concluded"*, linking to the Sermon Archive.

---

## 4. Special Event Livestreams (YouTube Integration)

When an event has an exceptional livestream outside of standard Sunday services:

### 1. Register Special Live Window
In [`src/utils/live-schedule.ts`](file:///c:/IngrahamChurch/ingraham_church_website/src/utils/live-schedule.ts), add the event to `SPECIAL_LIVE_EVENTS`:
```typescript
{
  id: 'shubh-sandesh-worship-his-majesty-dr-vijay-benedict-2026',
  date: '2026-11-03', // YYYY-MM-DD
  startHour: 16,
  startMinute: 30,    // 4:30 PM IST (pre-service preparation)
  endHour: 22,
  endMinute: 30,      // 10:30 PM IST (concert conclusion)
  title: 'Shubh Sandesh & Worship His Majesty ft. Dr. Vijay Benedict',
  slug: 'shubh-sandesh-worship-his-majesty',
}
```

### 2. Multi-Channel Live Detection
- **SSR Detection**: `src/app/sermons/page.tsx` checks YouTube directly during active live hours (`isLiveMonitoringWindow()`).
- **Client Smart Polling**: `SermonsClient.tsx` polls `/api/cron/check-live` periodically during the event window.
- **Realtime Webhooks**: YouTube PubSubHubbub webhooks update `live_status` in Supabase instantly.
- **Authorized Endpoints**: `/api/cron/check-live` authorizes unauthenticated client calls during both Sunday hours and registered `SPECIAL_LIVE_EVENTS`.

### 3. Display Points when Live
- **Homepage**: Animated pulse pill badge `WE'RE LIVE` lights up, linking to `/sermons`.
- **Sermons Platform (`/sermons`)**: Dynamic live embed iframe banner with YouTube live chat and title.
- **Event Detail Page (`/events/[slug]`)**: [`EventLivePlayer`](file:///c:/IngrahamChurch/ingraham_church_website/src/components/EventLivePlayer.tsx) embeds the live broadcast directly above the gathering overview.
- **Event Card**: Highlights with glowing `🔴 LIVE NOW` badge and `Watch Live` button.

---

## 5. Interactive Event Gallery & Lightbox Viewer

All event banners and flyers must be viewable in full-screen without cropping:

- **Component**: [`src/components/EventGalleryViewer.tsx`](file:///c:/IngrahamChurch/ingraham_church_website/src/components/EventGalleryViewer.tsx)
- **Thumbnail**: Displayed in an `aspect-[4/3]` rounded card with a hover overlay showing `[ 🔍 Click to Enlarge & Read ]`.
- **Modal Viewer**:
  - Deep royal burgundy background (`#110205`/95) with backdrop blur.
  - Uncropped natural aspect ratio so all poster text is legible.
  - Controls: Zoom In (`+`), Zoom Out (`-`), Zoom Percentage toggle, Reset (`0`), Close (`✕` / `Escape`).
  - Next/Previous controls for multi-image galleries (keyboard arrow navigation supported).
  - Background body scroll lock while open.

---

## 6. Editorial & Content Standards

When writing copy and descriptions for church events:

1. **Scripture Anchor**: Always include a relevant scripture passage at the beginning (e.g., Psalm 95:6).
2. **Special Guest Profile**: Conduct research on the guest/speaker and highlight their musical background, faith journey, and prominent songs/albums (e.g., Dr. Vijay Benedict's Bollywood transition, albums like *Yeshu Tu Hai Mahan*).
3. **Leadership Credits**: Always acknowledge church leadership:
   - **Rev. Masih Lal** — *Priest In-Charge & District Superintendent, Ingraham Shalom Methodist Church*
   - **Wg. Cdr. P. Jethro** — *Director, Ingraham Institute, Ghaziabad*
4. **Paragraphing**: Separate distinct sections with double newlines (`\n\n`) to ensure clean paragraph rendering.
5. **Entry Policy**: **Do not** mention entry restrictions unless explicitly requested by the user.

---

## 7. Quick Checklist for Adding a New Event

1. [ ] **Image**: Place poster at `public/events/images/<NAME>.jpeg` (and `public/images/events/<NAME>.jpeg`).
2. [ ] **Event Entry**: Prepend the new event to `eventsData` in `src/data/events.ts` with `eventDate`, `eventStartTime`, `eventEndTime`, and `gallery`.
3. [ ] **Livestream (if applicable)**: If the event has a live broadcast, register the date and time window in `SPECIAL_LIVE_EVENTS` in `src/utils/live-schedule.ts`.
4. [ ] **Verification**: Run `npx tsc --noEmit` to verify type safety.
5. [ ] **Confirm UI**:
   - Featured on Homepage Carousel (`/`).
   - Listed in UPCOMING EVENTS on `/events`.
   - Detail page loads at `/events/<slug>` with full description, leadership credits, and zoomable gallery.
