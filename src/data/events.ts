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
  isRecurring?: boolean;
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
    id: 'sunday-divine-worship',
    slug: 'sunday-divine-worship',
    title: 'Sunday Divine Worship Service',
    date: 'Every Sunday',
    time: '9:00 AM',
    location: 'Main Sanctuary, Ingraham Methodist Church, Ghaziabad',
    shortDescription: 'A time-honored rhythm of worship, prayer, and word. Join us each Sunday at 9:00 AM as we gather in faith and warm fellowship.',
    longDescription: 'Our Sunday Service is the heart of our community life. It is a time when we gather together to lift our voices in worship, hear the reading and preaching of the Word, and find peace in our sanctuary. Whether you are a lifelong Methodist or exploring faith for the first time, you are welcome here.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1_pjniqL-arApjXUBGHweyH7WHsNExebhQoD7MOS_Nldvop6GkwrgAc_Pu7mubOzoJbCD4cO4WEiTy7GEDCj2MI0QnszfKIFob88S_zDE2qz6h7xj0PfNOoSQET75KGICTCSEBkOMuPI-GsNpnGeRS6WONqR1qD94kvvACbfLwD8hdAzeYJBeT_xa0EVO1JkBjbrtRgzu6s42ACZ25YvrJzTEqHZWVIS8jsnRFSetwM3u-pXssgt3',
    status: 'upcoming',
    isRecurring: true
  },
  {
    id: 'aaghaz-saturday-myf-worship',
    slug: 'aaghaz-saturday-myf-worship',
    title: 'AAGHAZ - MYF Evening Worship & Testimonies',
    date: 'Every Saturday',
    time: '7:00 PM',
    location: 'Fellowship Hall & Sanctuary, Ingraham Methodist Church, Ghaziabad',
    shortDescription: 'Meaning "A New Beginning", AAGHAZ is organized every Saturday evening at 7:00 PM by the MYF team—a heartfelt worship night to praise God, celebrate new life in Christ (2 Cor 5:17), and share inspiring testimonies of His grace.',
    longDescription: 'AAGHAZ (meaning "A New Beginning") is a vibrant weekly worship movement organized every Saturday evening at 7:00 PM by the Methodist Youth Fellowship (MYF) team at Ingraham Methodist Church. Scripture proclaims in 2 Corinthians 5:17, "If anyone is in Christ, the new creation has come: The old has gone, the new is here!" AAGHAZ is a sacred space where young adults, families, and believers gather to embrace a fresh start in God\'s presence, worship the Lord with all their hearts, lift songs of praise, and share powerful personal testimonies of His unmerited grace, transformation, and faithfulness. Whether you seek spiritual renewal, a new beginning in your walk with God, or warm Christian fellowship, AAGHAZ warmly invites you to join us.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV-UE0krJrh54dNNb42Z22zFUo4D2GilN7qkEHwsM-Eba9EMtTtkkdiw5W59rBuT3yd_4mOnE5K5rQA8Q25KYtd9vfbaFtBbUoQvuZRhrhceVXQaXpgCV9vPLvaoPS61XjoeeDud1UyxrjOdK10zlfsDZXlYx-KLI42RBVwfN8HMaWmoDg1eoil3Q-r1_zcD-yXC4Xe0IpeJugrtJiZ0harRojlT8LEFkHf30nYXRkLPY0OXvp6hO8',
    status: 'upcoming',
    isRecurring: true
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

export function getNextSundayDateString(): string {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const daysUntilSunday = (7 - dayOfWeek) % 7;
  
  const targetDate = new Date(now.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  
  return targetDate.toLocaleDateString('en-US', options);
}

export function getNextSaturdayDateString(): string {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
  
  const targetDate = new Date(now.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  
  return targetDate.toLocaleDateString('en-US', options);
}

export function getResolvedEvent(event: ChurchEvent): ChurchEvent {
  if (event.isRecurring && event.slug === 'sunday-divine-worship') {
    return {
      ...event,
      date: getNextSundayDateString(),
    };
  }
  if (event.isRecurring && event.slug === 'aaghaz-saturday-myf-worship') {
    return {
      ...event,
      date: getNextSaturdayDateString(),
    };
  }
  return event;
}

export function getResolvedEventStatus(event: ChurchEvent): EventStatus {
  if (event.isRecurring) {
    return 'upcoming';
  }
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
  const event = eventsData.find(e => e.slug === slug);
  return event ? getResolvedEvent(event) : undefined;
}

export function getUpcomingEvents(): ChurchEvent[] {
  return eventsData
    .filter(event => getResolvedEventStatus(event) === 'upcoming')
    .map(getResolvedEvent);
}

export function getPastEvents(): ChurchEvent[] {
  return eventsData
    .filter(event => getResolvedEventStatus(event) === 'past')
    .map(getResolvedEvent);
}

export function getHomepageEvents(): ChurchEvent[] {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  return [...upcoming, ...past];
}




