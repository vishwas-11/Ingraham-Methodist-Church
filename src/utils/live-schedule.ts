/**
 * Live Broadcast Schedule & Monitoring Windows
 * 
 * Defines standard recurring Sunday live broadcast windows and one-off special event windows.
 * Safe for use in both client and server components.
 */

export interface SpecialLiveEvent {
  id: string;
  date: string; // YYYY-MM-DD in Asia/Kolkata timezone
  startHour: number; // 24-hour format
  startMinute: number;
  endHour: number;
  endMinute: number;
  title: string;
  slug?: string;
}

export const SPECIAL_LIVE_EVENTS: SpecialLiveEvent[] = [
  {
    id: 'shubh-sandesh-worship-his-majesty-dr-vijay-benedict-2026',
    date: '2026-11-03', // Tuesday, Nov 3, 2026
    startHour: 16,
    startMinute: 30, // 4:30 PM IST (pre-service preparation)
    endHour: 22,
    endMinute: 30, // 10:30 PM IST (concert conclusion)
    title: 'Shubh Sandesh & Worship His Majesty ft. Dr. Vijay Benedict',
    slug: 'shubh-sandesh-worship-his-majesty',
  },
];

/**
 * Returns the current date/time converted to Asia/Kolkata timezone.
 */
export function getISTTime(date = new Date()): Date {
  const istString = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  return new Date(istString);
}

/**
 * Returns formatted YYYY-MM-DD string in Asia/Kolkata timezone.
 */
export function getISTDateString(date = new Date()): string {
  const ist = getISTTime(date);
  const yyyy = ist.getFullYear();
  const mm = String(ist.getMonth() + 1).padStart(2, '0');
  const dd = String(ist.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Determines whether the current time is within an active live monitoring window:
 * 1. Regular Sunday Church Service: Sundays 9:00 AM – 1:00 PM IST
 * 2. Special Events: Any event listed in SPECIAL_LIVE_EVENTS during its date and time window
 */
export function isLiveMonitoringWindow(date = new Date()): boolean {
  const ist = getISTTime(date);
  const dayOfWeek = ist.getDay(); // 0 = Sunday
  const hour = ist.getHours();
  const minute = ist.getMinutes();
  const currentMinutes = hour * 60 + minute;

  // 1. Regular Sunday Church Service: 9:00 AM - 1:00 PM IST (540 to 780 minutes)
  const isSundayChurchHours = dayOfWeek === 0 && currentMinutes >= 9 * 60 && currentMinutes < 13 * 60;
  if (isSundayChurchHours) {
    return true;
  }

  // 2. Special one-off events
  const todayDateStr = getISTDateString(date);
  for (const event of SPECIAL_LIVE_EVENTS) {
    if (todayDateStr === event.date) {
      const startMin = event.startHour * 60 + event.startMinute;
      const endMin = event.endHour * 60 + event.endMinute;
      if (currentMinutes >= startMin && currentMinutes <= endMin) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Returns the active special event if current time is within its window.
 */
export function getActiveSpecialEvent(date = new Date()): SpecialLiveEvent | undefined {
  const ist = getISTTime(date);
  const hour = ist.getHours();
  const minute = ist.getMinutes();
  const currentMinutes = hour * 60 + minute;
  const todayDateStr = getISTDateString(date);

  return SPECIAL_LIVE_EVENTS.find((event) => {
    if (todayDateStr !== event.date) return false;
    const startMin = event.startHour * 60 + event.startMinute;
    const endMin = event.endHour * 60 + event.endMinute;
    return currentMinutes >= startMin && currentMinutes <= endMin;
  });
}
