export type EventStatus = 'upcoming' | 'past';

export interface ChurchEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  status: EventStatus;
  eventDate?: string;
  gallery?: string[];
  youtubeUrl?: string;
  isInfoPending?: boolean;
}

export const eventsData: ChurchEvent[] = [
  {
    id: 'celebrating-80th-independence-day-2026',
    slug: 'celebrating-80th-independence-day',
    title: 'Celebrating 80th Independence Day',
    date: 'Sunday, August 16, 2026',
    eventDate: '2026-08-16',
    time: '9:00 AM',
    location: 'Ingraham Methodist Church, MFF2+JVG, Hapur Rd, Sector 11, Raj Kunj, Raj Nagar, Ghaziabad, Uttar Pradesh 201002',
    shortDescription: 'Join us as we celebrate India’s 80th Independence Day with heartfelt thanksgiving, honoring national freedom and the ultimate spiritual liberty we inherit in Christ.',
    longDescription: 'As our nation marks 80 years of independence, Ingraham Methodist Church invites our congregation and community to gather in gratitude and joy. Scripture reminds us in Galatians 5:1, "It is for freedom that Christ has set us free," and in 2 Corinthians 3:17, "Where the Spirit of the Lord is, there is freedom." True independence is a precious gift—one that calls us to love our neighbors, serve our nation with righteousness, and walk in unity. Join us this Sunday, 16th August, for an uplifting service of worship, patriotic praise, heartfelt prayer for our nation, and warm fellowship as one family in Christ.',
    image: '/independence_day_2026.jpeg',
    status: 'upcoming',
    gallery: [
      '/independence_day_2026.jpeg'
    ]
  },
  {
    id: '3',
    slug: 'christmas-nativity-play-2025',
    title: 'Christmas Nativity Play - Ingraham Methodist Church, Ghaziabad',
    date: 'December 28, 2025',
    time: 'Special Service',
    location: 'Ingraham Methodist Church Sanctuary, Ghaziabad',
    shortDescription: 'A special Christmas Nativity Play presentation by Ingraham Methodist Church, Ghaziabad celebrating the birth of Jesus Christ.',
    longDescription: 'Full information regarding this event will be published soon.',
    image: 'https://img.youtube.com/vi/rpkZTkKgxIY/hqdefault.jpg',
    status: 'past',
    youtubeUrl: 'https://www.youtube.com/watch?v=rpkZTkKgxIY',
    isInfoPending: true
  },
  {
    id: '4',
    slug: 'cantata-service-2025',
    title: 'Ingraham methodist church ( Cantata Service) 2025',
    date: 'December 17, 2025',
    time: 'Cantata Service',
    location: 'Ingraham Methodist Church Sanctuary, Ghaziabad',
    shortDescription: 'Annual Cantata Service 2025 filled with musical worship, choir performances, and praises at Ingraham Methodist Church.',
    longDescription: 'Full information regarding this event will be published soon.',
    image: 'https://img.youtube.com/vi/Y0PkEdIJ4rs/hqdefault.jpg',
    status: 'past',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y0PkEdIJ4rs',
    isInfoPending: true
  },
  {
    id: '5',
    slug: 'easter-play-2025',
    title: 'Easter Play 2025 by Worship Team | IMC Ghaziabad | Jesus resurrection',
    date: 'April 20, 2025',
    time: 'Easter Service',
    location: 'Ingraham Methodist Church, Ghaziabad',
    shortDescription: 'Easter Play 2025 presented by the Worship Team at IMC Ghaziabad celebrating Jesus Christ’s resurrection.',
    longDescription: 'Full information regarding this event will be published soon.',
    image: 'https://img.youtube.com/vi/5sgD1SsmAEw/hqdefault.jpg',
    status: 'past',
    youtubeUrl: 'https://www.youtube.com/watch?v=5sgD1SsmAEw',
    isInfoPending: true
  }
];

export function getResolvedEventStatus(event: ChurchEvent): EventStatus {
  if (event.eventDate) {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    if (today > event.eventDate) {
      return 'past';
    } else {
      return 'upcoming';
    }
  }
  return event.status;
}

export function getEventBySlug(slug: string): ChurchEvent | undefined {
  return eventsData.find(event => event.slug === slug);
}

export function getUpcomingEvents(): ChurchEvent[] {
  return eventsData.filter(event => getResolvedEventStatus(event) === 'upcoming');
}

export function getPastEvents(): ChurchEvent[] {
  return eventsData.filter(event => getResolvedEventStatus(event) === 'past');
}


