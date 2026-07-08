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
    slug: 'easter-sunrise-service-2025',
    title: 'Easter Sunrise Service 2025',
    date: 'April 20, 2025',
    time: '6:00 AM',
    location: 'Church Grounds / Garden',
    shortDescription: 'A beautiful morning celebrating the resurrection with our community as the sun rose over the church grounds.',
    longDescription: 'This past Easter, we gathered in the early hours of the morning to celebrate the resurrection of Christ. The sunrise service was a deeply moving experience, beginning in the quiet dark and culminating in joyous worship as the sun illuminated the grounds. We shared a wonderful breakfast together afterward, marking a memorable start to a season of hope and renewal.',
    image: '/images/events/easter_sunrise.png',
    status: 'past',
    gallery: [
      '/images/events/easter_sunrise.png'
    ]
  },
  {
    id: '4',
    slug: 'community-food-drive',
    title: 'Annual Community Food Drive',
    date: 'November 15, 2024',
    time: '9:00 AM - 2:00 PM',
    location: 'City Square Center',
    shortDescription: 'Our congregation partnered with local shelters to provide over 500 meals to families in need during the holiday season.',
    longDescription: 'In November, Ingraham Methodist Church organized its largest food drive to date. Dozens of volunteers from our congregation spent the weekend sorting, packing, and delivering essential food items to partner shelters across the city. The generosity of our community allowed us to provide meals for over 500 families, putting our faith into action and serving as the hands and feet of Christ in our neighborhood.',
    image: '/images/events/community_food_drive.png',
    status: 'past',
    gallery: [
      '/images/events/community_food_drive.png'
    ]
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
