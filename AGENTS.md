<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Events System & Livestream Architecture
When adding, modifying, or managing church events or event livestreams, **always read and follow [`EVENTS_PLAYBOOK.md`](./EVENTS_PLAYBOOK.md)**.
It specifies the single source of truth (`src/data/events.ts`), automatic lifecycle rules (`upcoming` -> `live` -> `past`), livestream scheduling (`src/utils/live-schedule.ts`), editorial standards (leadership credits, scripture), and the interactive gallery viewer (`EventGalleryViewer`).
