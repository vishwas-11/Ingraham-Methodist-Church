export type SourceType = "oral-history" | "archival" | "church-record" | "to-be-verified";

export interface HistoricalEvent {
  id: string;
  period: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  sourceType: SourceType;
  source: string;
  people: string[];
  illustration: string;
  quote?: string;
  verified: boolean;
  isInteractiveTimeCapsule?: boolean;
}

export const churchHistoryEvents: HistoricalEvent[] = [
  {
    id: "event-1-early-chapel",
    period: "Early Years (Pre-1961)",
    title: "The Early Chapel Wing",
    shortDescription: "Before the sanctuary was built, campus morning worship took place in a small right-wing hall of the administrative block.",
    detailedDescription: "As remembered by V. Patterson, the administrative block building housed a small chapel on its right wing corner for school morning worship and campus functions. For Sunday worship, staff and hostel boys traveled into Ghaziabad city to attend the city church.",
    sourceType: "oral-history",
    source: "Memories of V. Patterson",
    people: ["Mr. Hank Lacy (Principal)", "Mr. D. M. Daniel (Vice Principal)"],
    illustration: "/images/about/early_chapel_sketch.png",
    quote: "The Building which is now the administrative block, housed a small chapel on the right wing corner...",
    verified: false
  },
  {
    id: "event-2-chapel-campaign",
    period: "Approx. 1961",
    title: "A Campaign for the Campus: 'By the Children for the Children'",
    shortDescription: "Principal Hank Lacy appealed to Methodist Sunday Schools across America to fund a dedicated campus chapel.",
    detailedDescription: "Recognizing the vital need for a dedicated chapel and function hall on campus, Principal Hank Lacy traveled to America and launched a fundraising appeal titled 'By the children for the children' across Methodist Sunday Schools. Generous contributions from children quickly raised the funds needed for construction.",
    sourceType: "oral-history",
    source: "Memories of V. Patterson",
    people: ["Mr. Hank Lacy", "American Sunday School Children"],
    illustration: "/images/about/children_fundraising_sketch.png",
    quote: "A campaign named 'By the children for the children' was launched in America. Soon enough funds were available...",
    verified: false
  },
  {
    id: "event-3-groundbreaking-construction",
    period: "Approx. 1961–1963",
    title: "Groundbreaking & Community Construction",
    shortDescription: "Bishop Picket performed the groundbreaking, and campus staff, hostel boys, and young children helped build the sanctuary.",
    detailedDescription: "The groundbreaking and cornerstone laying ceremonies were performed by Bishop Picket, with Architect Mr. King directing construction. In an extraordinary effort of community service, campus staff, hostel boys, masons, and young children actively participated—young children leading small ponies carrying earth bags to low areas of the campus.",
    sourceType: "oral-history",
    source: "Memories of V. Patterson",
    people: ["Bishop Picket", "Architect Mr. King", "Campus Staff & Hostel Boys", "Patterson (as a 12-year-old child)"],
    illustration: "/images/about/groundbreaking_ponies_sketch.png",
    quote: "Young children like me were given the task of leading the ponies carrying the earth on their back...",
    verified: false
  },
  {
    id: "event-4-time-capsule",
    period: "Approx. 1962–1963",
    title: "The Cornerstone Time Capsule",
    shortDescription: "A metal time capsule was sealed behind the cornerstone containing an open Bible, a newspaper of the day, and a contributor roll.",
    detailedDescription: "Behind the chapel cornerstone, a sealed time capsule box was placed during a solemn ceremony. It contained an open Holy Bible, that day's newspaper, and a complete hand-written list of all volunteers and children who helped build the chapel.",
    sourceType: "oral-history",
    source: "Memories of V. Patterson",
    people: ["Bishop Picket", "Architect Mr. King", "Volunteer Contributors"],
    illustration: "/images/about/time_capsule_cornerstone_sketch.png",
    quote: "The box contained an open Bible, That day’s News Paper and the list mentioned above. It was a very proud moment for all of us.",
    verified: false,
    isInteractiveTimeCapsule: true
  },
  {
    id: "event-5-chapel-dedication",
    period: "Approx. 1963–1965",
    title: "Chapel Dedication & Sacred Symbols",
    shortDescription: "The sanctuary and basement were dedicated in a solemn service, handing over the keys and explaining the sacred architecture.",
    detailedDescription: "At the dedication of the Chapel and basement, Architect Mr. King presented the keys to Principal Douglas Picket (son of Bishop Picket). Architect King explained each design detail: the altar cross illuminated by white mosaic work forming a second cross, hanging red lamps symbolizing Christ's blood, and sacred cut-outs along the balcony and communion stands.",
    sourceType: "oral-history",
    source: "Memories of V. Patterson",
    people: ["Bishop", "Architect Mr. King", "Mr. Douglas Picket (Principal)"],
    illustration: "/images/about/chapel_dedication_sketch.png",
    quote: "At the end of the service, Keys of the Chapel and the basement were handed over by Mr. King to Mr. Picket.",
    verified: false
  },
  {
    id: "event-6-music-choir",
    period: "Approx. 1963–1966",
    title: "A Tradition of Sacred Music & Choir",
    shortDescription: "With a grand electronic organ and traditional Indian instruments, the choir performed at prestigious venues including Vigyan Bhavan.",
    detailedDescription: "Music Director Patterson (MA in Music, Princeton University) led a renowned choir and orchestra combining a grand organ with traditional Indian instruments: Sitar, Israj, Flute, and Tabla. Compulsory music classes from 5th grade onward prepared young students to contribute musically to churches in their home cities and villages.",
    sourceType: "oral-history",
    source: "Memories of V. Patterson",
    people: ["Patterson's Father (Music Director, Princeton MA)", "Ingraham Choir & Orchestra"],
    illustration: "/images/about/organ_choir_sketch.png",
    quote: "The purpose of the Music Classes was to prepare the children so that when they go back to their cities and villages they can contribute to their respective churches...",
    verified: false
  },
  {
    id: "event-7-chapel-to-church",
    period: "Approx. 1961–1966",
    title: "From Chapel to Church",
    shortDescription: "The campus chapel officially transitioned into a full-fledged parish church for the local Christian community.",
    detailedDescription: "In a pivotal milestone for the community, the status of the campus chapel was officially changed to a full-fledged Methodist Church, anchoring generations of faith, worship, and service in Ghaziabad.",
    sourceType: "oral-history",
    source: "Memories of V. Patterson",
    people: ["Congregation of Ingraham Methodist Church"],
    illustration: "/images/about/hero_archival_sketch.png",
    quote: "the status of the chapel was changed to a full fledged Church",
    verified: true
  }
];
