export interface PattersonParagraph {
  id: string;
  sectionTitle?: string;
  text: string;
  highlights?: string[];
}

export interface PattersonAccount {
  title: string;
  author: string;
  subtitle: string;
  dateNote: string;
  approximatePeriod: string;
  paragraphs: PattersonParagraph[];
}

export const pattersonAccountData: PattersonAccount = {
  title: "History of Ingraham Methodist Church",
  author: "V. Patterson",
  subtitle: "From the memory of a twelve-year-old living on the Ingraham Institute campus",
  dateNote: "Remembered events took place approximately between 1961 and 1966 (exact dates unrecorded in memory).",
  approximatePeriod: "1961–1966",
  paragraphs: [
    {
      id: "p1",
      sectionTitle: "The Early Chapel Wing",
      text: "This is from the memory of a twelve year old, living in the Ingraham institute campus in those days. Mr. Hank Lacy was the Principal and Mr. D M Daniel was the vice Principal. The Building which is now the administrative block, housed a small chapel on the right wing corner of the building. School morning worship and all the other functions used to take place in this hall. For Sunday worship all the staff and Hostel boys used to go to the city church.",
      highlights: ["administrative block", "small chapel on the right wing corner", "Sunday worship at the city church"]
    },
    {
      id: "p2",
      sectionTitle: "A Chapel Campaign: 'By the children for the children'",
      text: "Mr. Lacy felt the need of a chapel and a function hall inside the campus so once when he went to America, he appealed to all the Sunday Schools of Methodist Churches in America to raise funds for the purpose. A campaign named “By the children for the children” was launched in America. Soon enough funds were available for the purpose.",
      highlights: ["By the children for the children", "Methodist Churches in America"]
    },
    {
      id: "p3",
      sectionTitle: "Groundbreaking, Ponies, & The Time Capsule",
      text: "I was there to witness the ground breaking ceremony performed by Bishop Picket. I was also there to witness the corner stone laying ceremony. The construction work started with full swing. The Architect of the Chapel was Mr. King. Apart from the laborers and the masons, campus staff and hostel boys also lent their helping hand voluntarily. Young children like me were given the task of leading the ponies carrying the earth on their back to low designated areas of the campus. We used to empty the earth filled bags at the place and then mount the ponies and lead them back to the Chapel site. All this we did as we were told that a time capsule box will be placed behind the corner stone and a list of all the people who gave a helping hand will be placed in the time capsule box. Time came and small ceremony was held. A box was placed behind the corner stone. The box contained an open Bible, That day’s News Paper and the list mentioned above. It was a very proud moment for all of us.",
      highlights: ["Bishop Picket", "Architect Mr. King", "ponies carrying the earth", "time capsule box", "open Bible, That day’s News Paper and the list"]
    },
    {
      id: "p4",
      sectionTitle: "The Chapel Dedication & Architectural Symbols",
      text: "The time came when the Chapel and the basement was ready. A big function was held for the dedication of the Chapel. Present were our Bishop (Do not remember his name), Architect Mr. King and Mr. Douglas Picket (Son of Bishop Picket and then Principal). Mr. King explained each and every thing he incorporated in the Chapel like the cross on the alter and the light coming out of it in the form of white mosaic work forming another cross. The mosaic work used to be very white in those days. He also explained the two hanging red lamps (nowadays these are white) on both side of the cross depicting the presence of Christ’s blood on the alter. Likewise he explained about the cut out of Roman Cross on the ramp of balcony, cut out of fish on the holy communion stands and many other things which I don’t remember now. At the end of the service, Keys of the Chapel and the basement were handed over by Mr. King to Mr. Picket.",
      highlights: ["Architect Mr. King", "Mr. Douglas Picket", "cross on the alter and white mosaic work", "two hanging red lamps", "cut out of Roman Cross", "cut out of fish"]
    },
    {
      id: "p5",
      sectionTitle: "The Sanctuary Organ",
      text: "A big electronic organ was placed on the left side of the alter. It had two full keyboards and a third, half keyboard as foot pedal. Its two big Speakers were placed under the left and right podiums, behind the cement Grill(Jafri). The volume of the Organ was so high that once by mistake it was switched ON on full volume. Result was a few cracked glasses on the window panes. My father was the music Director. He use to play this organ with ease. He was MA in Music from Princeton University USA.",
      highlights: ["big electronic organ", "MA in Music from Princeton University USA"]
    },
    {
      id: "p6",
      sectionTitle: "Choir, Orchestra & Indian Instruments",
      text: "In those days Ingraham Chapel had one of the best choir. At different occasions they were invited to sing at different prestigious places. They also sang at World council of Churches at Vigyan Bhavan. The Choir consisted of vocals and orchestra. The orchestra was made up of Musical Instruments such as Sitar, Israj, Flute and Tabla. Music Classes were compulsory for every class from 5thth onwards. Children for vocals and orchestra were picked up from these classes based on their performance. The purpose of the Music Classes was to prepare the children so that when they go back to their cities and villages they can contribute to their respective churches in the form of Music.",
      highlights: ["World council of Churches at Vigyan Bhavan", "Sitar, Israj, Flute and Tabla", "contribute to their respective churches in the form of Music"]
    },
    {
      id: "p7",
      sectionTitle: "From Chapel to Full-Fledged Church",
      text: "Fortunately I was also witness when the status of the chapel was changed to a full fledged Church",
      highlights: ["status of the chapel was changed to a full fledged Church"]
    },
    {
      id: "p8",
      sectionTitle: "Concluding Note on Dates",
      text: "History without date is no history but unfortunately that time I was so young that I am not remembering the dates properly. I can only remember that all the above events took place between the year 1961 and 1966.",
      highlights: ["events took place between the year 1961 and 1966"]
    }
  ]
};
