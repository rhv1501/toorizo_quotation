export interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
}

export interface LocationItinerary {
  name: string;
  days: DayItinerary[];
}

export const locationItineraries: Record<string, LocationItinerary> = {
  Ooty: {
    name: "Ooty",
    days: [
      {
        day: 1,
        title: "Forest Trails & Lakeside Leisure",
        activities: [
          "Begin at the tranquil Pine Forest for a refreshing walk",
          "Visit the serene Kamarajar Dam",
          "Stop at the famed shooting spots of 6th Mile and 9th Mile",
          "Go horseback riding through the meadows",
          "Enjoy a peaceful boat ride at Pykara Lake",
          "Admire Pykara Waterfalls",
          "Experience a thrilling jungle safari at Mudumalai Wildlife Sanctuary",
          "End the day at the Chocolate Museum & Factory",
        ],
      },
      {
        day: 2,
        title: "Coonoor's Green Wonders",
        activities: [
          "Start at Ketti Valley View for panoramic sights",
          "Drive past the outer view of MRC",
          "Explore Lamb's Rock and Dolphin's Nose",
          "After lunch, visit the Tea Gardens and Sims Park",
          "Cap the day with a ride on the iconic Nilgiri Mountain Toy Train",
        ],
      },
      {
        day: 3,
        title: "Peaks, Gardens & Local Life",
        activities: [
          "Visit Doddabetta Peak for panoramic Nilgiris views",
          "Learn tea craft at the Tea Factory & Museum",
          "Enjoy a boat ride on Ooty Lake",
          "Visit the Botanical Garden, Rose Garden, and Thread Garden",
          "Explore the Karnataka Garden and shop at the Tibet Market",
        ],
      },
      {
        day: 4,
        title: "Cultural Corners & Offbeat Spots",
        activities: [
          "Walk the serene Cairn Hill Forest trails",
          "Visit the Tribal Museum to explore native heritage",
          "Scenic stops at Emerald Dam (outer view) and Avalanche Echo Point",
          "Wrap up at Ithalar Viewpoint and enjoy last-minute shopping",
        ],
      },
    ],
  },
  Coorg: {
    name: "Coorg",
    days: [
      {
        day: 1,
        title: "River Islands & Monastic Peace",
        activities: [
          "Start with a visit to the lush Nisargadhama Reserve on the Kaveri River",
          "Head to Dubare Elephant Camp to interact with elephants",
          "Enjoy a peaceful stop at Chiklihole Dam",
          "Explore a coffee plantation and learn the process behind Coorg's famous brew",
          "End the day at the Golden Temple in Bylakuppe, witnessing evening prayers",
        ],
      },
      {
        day: 2,
        title: "Royal Views & Waterfalls",
        activities: [
          "Catch the sunrise at Raja's Seat and experience the glass bridge",
          "Explore the historic Madikeri Fort and its museum",
          "Visit the photogenic Abbey Falls surrounded by coffee estates",
          "Wind down at Raja's Tomb (Gaddige), enjoying the sunset and serene vibes",
        ],
      },
      {
        day: 3,
        title: "Peaks & Sacred Origins",
        activities: [
          "Take an early jeep ride to Mandalpatti Peak for sunrise",
          "Visit Talacauvery, the origin of the Kaveri River",
          "Explore the temple and nearby waterfalls",
          "Head to Bhagamandala and explore the Bhagandeshwara Temple at the Triveni Sangam",
        ],
      },
      {
        day: 4,
        title: "Forest Treks & Safari",
        activities: [
          "Start with a scenic trek in the forest to Iruppu Falls",
          "Explore the trails in Brahmagiri Hills",
          "Go on a wildlife safari at Nagarahole Tiger Reserve",
          "Wrap up in Madikeri or head home with unforgettable memories",
        ],
      },
    ],
  },
  Chikmagalur: {
    name: "Chikmagalur",
    days: [
      {
        day: 1,
        title: "Mountain Peaks & Waterfall Trails",
        activities: [
          "Begin your Chikmagalur adventure with a trek to Mullayanagiri Peak, Karnataka's highest point",
          "Descend to the serene Jhari Waterfalls nestled in the forest",
          "Visit Baba Budangiri, a range rich in spiritual and historical significance",
          "Discover the refreshing mist at Manikya Dhara Falls",
          "End your day watching the sunset from Z Point, a spectacular viewpoint",
        ],
      },
      {
        day: 2,
        title: "Forest Cascades & Panoramic Views",
        activities: [
          "Start with a peaceful visit to Kallathigiri Falls",
          "Journey deep into the forest to Hebbe Falls",
          "Drive to Kemmanagundi Viewpoint for sweeping valley views",
          "Unwind at The Estate Cafe",
          "Conclude with a calming evening walk at Mahatma Gandhi Park",
        ],
      },
      {
        day: 3,
        title: "Lakeside Calm & Wildlife Encounters",
        activities: [
          "Spend your morning at Hirekolale Lake, a serene spot perfect for reflection",
          "Embark on a safari through the Muthodi Zone of Bhadra Wildlife Sanctuary",
          "Explore the ancient carvings of Haleebeedu Temple",
          "Finish the day with thrilling water sports at Yagachi Water Adventure",
        ],
      },
    ],
  },
  Kodaikanal: {
    name: "Kodaikanal",
    days: [
      {
        day: 1,
        title: "Scenic Views and Nature",
        activities: [
          "Start your day at Silent Valley View",
          "Head to the Fire Tower for panoramic vistas",
          "Continue to Berijam Lake View Point",
          "Visit Caps Fly Valley",
          "Wander through the mysterious Mathikettan Forest View",
          "Enjoy a boat ride on Kodai Lake",
        ],
      },
      {
        day: 2,
        title: "Historical and Natural Wonders",
        activities: [
          "Begin your day at La Saleth Church",
          "Visit the ancient 500-year-old Tree",
          "Relax at the scenic Vattakanal Falls",
          "Explore Lion Cave",
          "Trek to Dolphin's Nose",
          "Enjoy the sights at Mountain Beauty",
          "Wrap up at Echo Point",
        ],
      },
      {
        day: 3,
        title: "Iconic Landmarks and Leisure",
        activities: [
          "Take a walk along Coaker's Walk",
          "Stop at the tranquil Pine Forest",
          "Visit Moir Point",
          "Be awed by the towering Pillar Rocks",
          "Admire the greens of the Golf Course",
          "Explore Green Valley View",
          "End the day with Upper Lake View and local market shopping",
        ],
      },
      {
        day: 4,
        title: "Cultural and Natural Heritage",
        activities: [
          "Start at the pine-filled Observatory Forest",
          "Explore the vibrant Rose Garden",
          "Admire the distant view of Palani Temple",
          "Seek blessings at Mahalakshmi Temple",
          "Visit Poombarai village",
          "Conclude at Mannavanur Lake with coracle boat ride",
        ],
      },
    ],
  },
  Mysore: {
    name: "Mysore",
    days: [
      {
        day: 1,
        title: "Royal Heritage and Scenic Beauty",
        activities: [
          "Visit the grand Mysore Palace",
          "Head to Brindavan Gardens",
          "Stop by St. Philomena's Church",
          "Visit Sri Chamundeshwari Temple at Chamundi Hills",
          "Conclude at Mysore Zoo",
        ],
      },
      {
        day: 2,
        title: "Tranquil Waters and Artistic Treasures",
        activities: [
          "Visit KRS Dam",
          "Head to Sri Ranganathaswamy Temple",
          "Enjoy boat ride at Karanji Lake",
          "End at Jaganmohan Palace Art Gallery",
        ],
      },
    ],
  },
  Wayanad: {
    name: "Wayanad",
    days: [
      {
        day: 1,
        title: "Lakeside Calm & Waterfall Treks",
        activities: [
          "Begin at Karlad Lake with boating and ziplining",
          "Visit Banasura Sagar Dam",
          "Head to Pookode Lake",
          "Enjoy panoramic views at Lakkidi View Point",
          "Trek to Meenmutty Waterfalls",
        ],
      },
      {
        day: 2,
        title: "Adrenaline & Altitude",
        activities: [
          "Start at Soochipara Waterfalls",
          "Explore 900 Kandi Eco Park",
          "Visit Kanthanpara Waterfalls",
          "Trek up to Chembra Peak",
        ],
      },
      {
        day: 3,
        title: "Heritage & History",
        activities: [
          "Visit the ancient Jain Temple in Sulthan Bathery",
          "Hike to Edakkal Caves",
          "Head to En Ooru Tribal Heritage Village",
          "Explore Phantom Rock",
          "Wrap up at the Wayanad Heritage Museum",
        ],
      },
      {
        day: 4,
        title: "Water Trails & Island Life",
        activities: [
          "Visit Thusharagiri Waterfalls",
          "Continue to Kuruvadweep Island",
          "Enjoy bamboo rafting and forest walks",
          "Have a picnic lunch",
        ],
      },
    ],
  },
};
