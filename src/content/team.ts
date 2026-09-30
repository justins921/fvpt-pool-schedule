export type TeamMember = {
  slug: string;
  name: string;
  credentials: string;
  role: string;
  photo: string;
  about: string;
  education?: string[];
  interests?: string;
  certifications?: string[];
};

// Roster matches the old website's Our Team page. TODO: confirm with the clinic who's current.
export const TEAM: TeamMember[] = [
  {
    slug: "steve-sobojinski",
    name: "Steve Sobojinski",
    credentials: "OTR, CSCS",
    role: "Occupational Therapist, Co-Founder",
    photo: "/img/team/steve.png",
    about:
      "Steve has been a registered occupational therapist since 1988. \"I treat their injuries as if they were my injuries.\" Staying active in every season is key to good health for him and his family: downhill and cross-country skiing in the winter, biking, baseball and boating in the summer, and hunting and fishing in between. He and his wife Regina started Fox Valley Physical Therapy in 1990.",
    education: [
      "Bachelor of Science in Occupational Therapy, LSU Medical Center, Shreveport, LA, 1988",
      "Thousands of hours of continuing education in shoulder, upper extremity and hand injuries",
    ],
    interests:
      "Shoulder and upper extremity injuries, shaped by his Division I and semi-pro baseball career. For more than 30 years he's shared thousands of patients with hundreds of top physicians, getting everyone from industrial workers to professional athletes back to work and back on the field.",
    certifications: ["Certified Strength & Conditioning Specialist"],
  },
  {
    slug: "regina-sobojinski",
    name: "Regina Sobojinski",
    credentials: "PT",
    role: "Physical Therapist, Co-Founder",
    photo: "/img/team/regina.webp",
    about:
      "Regina has practiced physical therapy since 1987, all in private practice. She and her husband Steve started Fox Valley Physical Therapy in 1990.",
    education: [
      "Bachelor of Science in Physical Therapy, LSU Medical Center, Shreveport, LA, 1987",
      "Extensive continuing education in manual therapy, therapeutic exercise and neuromuscular reeducation, plus McKenzie Institute training",
    ],
    interests:
      "Patients of all ages with personal, athletic or work injuries. Regina doesn't believe people should \"live with pain,\" and combines movement with manual therapy: myofascial release, muscle energy technique, neural mobilization and the McKenzie approach for the spine and extremities.",
  },
  {
    slug: "stephanie-meyer",
    name: "Dr. Stephanie Meyer",
    credentials: "DPT, CMTPT",
    role: "Physical Therapist",
    photo: "/img/team/stephanie.png",
    about:
      "Stephanie has been a physical therapist at FVPT since 2020. She's from Hortonville and is happy to care for her local community. She loves biking, hiking and ice skating with family and friends.",
    education: [
      "Doctor of Physical Therapy, Carroll University, Waukesha, WI, 2020",
      "Bachelor of Science in Exercise Science, Carroll University, 2018",
    ],
    interests: "TMJ dysfunction, myofascial pain, chronic pain, athletic injuries, and orthopedic conditions of the spine and extremities.",
    certifications: ["Certified Myofascial Trigger Point Therapist (dry needling), Myopain Seminars"],
  },
  {
    slug: "courtney-disterhaft",
    name: "Dr. Courtney Disterhaft",
    credentials: "DPT",
    role: "Physical Therapist",
    photo: "/img/team/courtney.png",
    about:
      "Courtney is from Ripon and excited to practice in a nearby community. She and her husband Clint enjoy hiking, walking their dogs and traveling. She also volunteers with her therapy dog, Cami, at hospitals, nursing homes and schools.",
    education: [
      "Doctor of Physical Therapy, Carroll University, Waukesha, WI, 2020",
      "Bachelor of Science in Exercise Science, Carroll University, 2018",
    ],
    interests:
      "Pediatrics, vestibular rehab, concussion recovery, neurology and orthopedics. Her pediatric work includes torticollis, plagiocephaly, developmental delay, sensory processing, autism, toe walking, cerebral palsy, Down syndrome and juvenile rheumatoid arthritis.",
  },
  {
    slug: "jensen-pearson",
    name: "Dr. Jensen Pearson",
    credentials: "DPT",
    role: "Physical Therapist",
    photo: "/img/team/jensen.jpeg",
    about:
      "Jensen is from Kaukauna and happy to be treating her community close to family and friends. She enjoys traveling, camping, line dancing and reading.",
    education: [
      "Doctor of Physical Therapy, Carroll University, Waukesha, WI, 2023",
      "Bachelor of Arts in Spanish, Carroll University, 2020",
    ],
    interests:
      "People of all ages. Her youngest patient was one month old! Sports medicine, orthopedics, pediatrics and vestibular rehab. She went through years of PT growing up, so she's passionate about helping athletes and young adults get back to what they love.",
  },
  {
    slug: "darrick-lang",
    name: "Darrick Lang",
    credentials: "PTA",
    role: "Physical Therapist Assistant",
    photo: "/img/team/darrick.png",
    about:
      "Darrick has been a physical therapist assistant at FVPT since 2005. He and his wife Cara have five children. He loves shifter kart racing, motorsports and woodworking, and hunts pheasants and ducks in the fall with his dog Meg.",
    education: ["Associate Degree in Applied Science, Physical Therapist Assistant, Northeast Wisconsin Technical College, 2004"],
    interests: "Wound care and upper extremity injuries. Custom splint making and brace fitting.",
  },
  {
    slug: "darren-hanusa",
    name: "Darren Hanusa",
    credentials: "LAT, CSCS",
    role: "Licensed Athletic Trainer",
    photo: "/img/team/darren.png",
    about:
      "Darren has been the athletic trainer at FVPT since 1998. He has a daughter, Addison, and enjoys watching and playing sports, especially basketball.",
    education: ["Bachelor of Science in Physical Education / Athletic Training, University of Wisconsin Oshkosh, 1997"],
    interests: "Evaluating and treating athletic injuries, especially knees and ankles. Sport-specific conditioning and personal training.",
    certifications: ["Certified Athletic Trainer", "Certified Strength & Conditioning Specialist"],
  },
  {
    slug: "deborah-tomasi",
    name: "Deborah Tomasi",
    credentials: "PTA",
    role: "Physical Therapist Assistant",
    photo: "/img/team/deborah.png",
    about:
      "Debbie grew up on Lake Superior's north shore and now calls the Fox Cities home with her husband and three daughters. She loves exploring new cities, theater, mission trips, roller coasters and new food, and teaches group exercise classes. Do what moves you!",
    education: [
      "Bachelor's degree, University of Wisconsin Oshkosh, 1999",
      "Associate Degree in Applied Science, Physical Therapist Assistant, Northeast Wisconsin Technical College, 2022",
    ],
    interests:
      "Functional fitness for healthy aging, meeting people where they are in their recovery. After years in the health insurance industry, she loves being on the treatment side. Movement is medicine!",
    certifications: ["Essentrics™ Level 1 Certified Instructor", "Certified Personal Trainer"],
  },
  {
    slug: "josie-arneson",
    name: "Josie Arneson",
    credentials: "PTA",
    role: "Physical Therapist Assistant",
    photo: "/img/team/josie.png",
    about:
      "Josie has been a physical therapist assistant at FVPT since 2016. She and her husband Kevin live locally. She went through a lot of PT as a child and went into the field to give back to her community.",
    education: ["Associate Degree in Applied Science, Northeast Wisconsin Technical College, 2016"],
    interests: "Aquatic physical therapy, orthopedics and pediatrics.",
  },
  {
    slug: "lucie-nezbed",
    name: "Lucie Nezbed",
    credentials: "PTA",
    role: "Physical Therapist Assistant",
    photo: "/img/team/lucie.png",
    about:
      "Lucie lives in De Pere with her fiancé Hayden and their cat, Boo. She loves Door County, hiking and being on the water, has run eight half marathons, and sings around the Fox Valley.",
    education: ["Associate Degree in Applied Science, Northeast Wisconsin Technical College, 2020"],
    interests: "Orthopedics and pediatrics.",
  },
  {
    slug: "paula-clark",
    name: "Paula Clark",
    credentials: "",
    role: "Clinic Manager",
    photo: "/img/team/paula.png",
    about:
      "Paula has been FVPT's medical billing and insurance specialist since 1993. She and her husband Scott have two daughters, and she enjoys biking, hiking and boating.",
  },
];
