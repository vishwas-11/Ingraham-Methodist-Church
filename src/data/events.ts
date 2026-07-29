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
  gallery?: string[];
  youtubeUrl?: string;
  isInfoPending?: boolean;
}

export const eventsData: ChurchEvent[] = [
  {
    id: '1',
    slug: 'sunday-church-service',
    title: 'Sunday Church Service',
    date: 'Every Sunday',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    shortDescription: 'A time-honored rhythm of worship, reflection, and communion. Join us this Sunday to connect, reflect, and find peace in our sanctuary.',
    longDescription: 'Our Sunday Liturgy is the heart of our community life. It is a time when we gather together to lift our voices in worship, hear the reading and preaching of the Word, and partake in communion. Whether you are a lifelong Methodist or exploring faith for the first time, you are welcome here. Expect a blend of traditional hymns and contemporary worship, a thoughtful message, and a warm community ready to receive you.',
    image: '/images/events/sunday_worship.png',
    status: 'upcoming',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCV-UE0krJrh54dNNb42Z22zFUo4D2GilN7qkEHwsM-Eba9EMtTtkkdiw5W59rBuT3yd_4mOnE5K5rQA8Q25KYtd9vfbaFtBbUoQvuZRhrhceVXQaXpgCV9vPLvaoPS61XjoeeDud1UyxrjOdK10zlfsDZXlYx-KLI42RBVwfN8HMaWmoDg1eoil3Q-r1_zcD-yXC4Xe0IpeJugrtJiZ0harRojlT8LEFkHf30nYXRkLPY0OXvp6hO8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbRrxkljqN2Gb4EXBKNh14i-ZEsx6QyN09OceFJXcw6iBmITbhIUAgP1xZxTJfBDd82FW-vVysV-Bd70gZFrMy4NTg9t2Q_mpZMTkm0dBoZMe_J2ipv3ZctBj0TYAm_5znM5fz-ZUyZnBEH4E78QWCb_fxEpVMhJrlSHnUveHhRBTQt05XmFICXi0HSLCwhbHYCnaSFM4Zzwy2E0T8COexE46qnl5o2PKtEqID1ETeAaeCV-BgKUy9'
    ]
  },
  {
    id: '2',
    slug: 'youth-fellowship-seminar',
    title: 'Youth Fellowship Seminar',
    date: 'Next Friday',
    time: '6:30 PM',
    location: 'Fellowship Hall',
    shortDescription: 'Engaging discussions, meaningful connections, and an environment optimized for growth. Come ready to ask questions and build community.',
    longDescription: 'Our Youth Fellowship Seminar is a monthly gathering designed to empower and equip the next generation. We delve into relevant topics facing young adults today, providing a safe space for questions, doubts, and discovery. The evening includes a shared meal, a guest speaker or panel discussion, and plenty of time for small group interaction. Connect with peers who are also navigating faith, career, and relationships in a modern world.',
    image: '/images/events/youth_seminar.png',
    status: 'upcoming',
    gallery: [
      '/images/events/youth_seminar.png'
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

export function getEventBySlug(slug: string): ChurchEvent | undefined {
  return eventsData.find(event => event.slug === slug);
}

export function getUpcomingEvents(): ChurchEvent[] {
  return eventsData.filter(event => event.status === 'upcoming');
}

export function getPastEvents(): ChurchEvent[] {
  return eventsData.filter(event => event.status === 'past');
}

