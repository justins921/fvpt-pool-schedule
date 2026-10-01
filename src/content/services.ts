export type Service = {
  slug: string;
  name: string;
  seoTitle?: string; // shorter name for the page title when the full name is long
  short: string; // one line for cards
  metaDescription: string;
  image: string;
  intro: string;
  sections: { heading: string; body?: string; list?: string[] }[];
  related?: string[];
  faq?: { q: string; a: string }[];
};

// Everything here comes from the clinic's existing website and staff bios.
// Don't add treatments the clinic hasn't confirmed it offers.
export const SERVICES: Service[] = [
  {
    slug: "physical-therapy",
    name: "Physical Therapy",
    short: "One-on-one care for pain, injuries and recovery after surgery.",
    metaDescription: "One-on-one physical therapy in Oshkosh, WI for back and neck pain, joint injuries, arthritis and post-surgical rehab. No referral needed.",
    image: "/img/therapy-1.jpg",
    intro:
      "Every visit is hands-on and one-on-one with your therapist. We find what's causing the problem, treat it, and teach you how to keep it from coming back. You don't need a referral to see a physical therapist.",
    sections: [
      {
        heading: "What we treat",
        list: [
          "Neck and back pain",
          "Shoulder, knee, hip and ankle injuries",
          "Hand and wrist injuries",
          "Plantar fasciitis",
          "Headaches",
          "Rehab after surgery and joint replacement",
          "SI joint and thoracic spine problems",
          "Scoliosis",
          "Arthritis and fibromyalgia",
          "Balance problems and neurological conditions",
        ],
      },
      {
        heading: "Your evaluation",
        body: "Your first visit starts with a full evaluation. We'll go over your history, test how you move, measure strength and joint function, and then explain what we found and what we recommend, to you and to your doctor.",
      },
      {
        heading: "How we treat",
        list: [
          "Hands-on manual therapy, including myofascial release, soft tissue work, joint mobilization and muscle energy technique",
          "McKenzie Method of Mechanical Diagnosis and Therapy for the spine and extremities",
          "Graston Technique and trigger point therapy",
          "Therapeutic and functional exercise, including work- and sport-specific training",
          "Trunk and back stabilization",
          "Kinesiology taping",
          "Modalities such as electrical stimulation, ultrasound, ice and heat, fluidotherapy, whirlpool, phonophoresis and iontophoresis",
          "A home exercise program so you keep improving between visits",
        ],
      },
      {
        heading: "How long visits take",
        body: "Treatment sessions run from 30 minutes to two hours, depending on what you need.",
      },
    ],
    related: ["aquatic-therapy", "dry-needling", "occupational-hand-therapy"],
  },
  {
    slug: "aquatic-therapy",
    name: "Aquatic Therapy",
    short: "The only therapeutic pool in Oshkosh. Rehab with less stress on your joints.",
    metaDescription: "Aquatic therapy in Oshkosh, WI. Fox Valley Physical Therapy has the only therapeutic pool in Oshkosh, for arthritis, post-surgical rehab, balance and pain.",
    image: "/img/pool.jpg",
    intro:
      "We're the only clinic in Oshkosh with a therapeutic pool. Water takes weight off healing joints, so you can start moving and strengthening sooner and with less pain than you could on land.",
    sections: [
      {
        heading: "Why the water helps",
        list: [
          "Buoyancy takes pressure off your joints while you exercise",
          "Less muscle guarding and spasm",
          "Eases the effects of arthritis",
          "Better circulation",
          "Less joint pain and inflammation",
          "Better balance, walking, coordination and flexibility",
        ],
      },
      {
        heading: "Who it's good for",
        body: "Aquatic therapy works well after joint replacement or a fracture, for arthritis, chronic back pain and fibromyalgia, and for balance and walking problems. Warm water and gentle resistance let you build strength without overloading tissue that's still healing.",
      },
      {
        heading: "Pool time on your own",
        body: "Current and former patients can also book the pool for independent exercise. See the Pool page for how it works.",
      },
    ],
    faq: [
      { q: "Do I need to know how to swim?", a: "No. Aquatic therapy is exercise in the water, not swimming laps, and your therapist is with you the whole time." },
      { q: "Can I keep using the pool after therapy ends?", a: "Yes. Current and former patients can reserve the pool for independent exercise. See the Pool page for details." },
    ],
    related: ["physical-therapy", "vertigo-balance-concussion"],
  },
  {
    slug: "occupational-hand-therapy",
    name: "Occupational & Hand Therapy",
    short: "Shoulder, elbow, wrist and hand rehab, plus custom splints.",
    metaDescription: "Occupational therapy and hand therapy in Oshkosh, WI. Shoulder and upper extremity rehab, custom splinting and brace fitting.",
    image: "/img/therapy-shoulder.jpg",
    intro:
      "Our occupational therapy is focused on the shoulder, arm and hand. Steve Sobojinski, OTR, has spent more than 30 years rehabbing upper extremity injuries, from industrial workers to professional athletes.",
    sections: [
      {
        heading: "What we treat",
        list: [
          "Shoulder injuries, including throwing injuries",
          "Elbow, wrist and hand injuries",
          "Rehab after hand and upper extremity surgery",
          "Wound care for upper extremity injuries",
        ],
      },
      {
        heading: "Splints and braces",
        body: "We make custom splints and fit braces in the clinic.",
      },
    ],
    related: ["physical-therapy", "work-injuries", "sports-medicine"],
  },
  {
    slug: "dry-needling",
    name: "Dry Needling",
    short: "Trigger point treatment for chronic pain, tendinitis and headaches.",
    metaDescription: "Dry needling in Oshkosh, WI with a certified myofascial trigger point therapist. For chronic pain, low back pain, headaches, tendinitis and plantar fasciitis.",
    image: "/img/therapy-knee.jpg",
    intro:
      "Dry needling uses a thin filiform needle to release myofascial trigger points and tight muscles, to reduce pain and help you move normally again. \"Dry\" means no medication is injected.",
    sections: [
      {
        heading: "What it can help",
        list: ["Chronic pain", "Tendinitis", "Low back pain", "Headaches", "Plantar fasciitis", "Joint pain"],
      },
      {
        heading: "Who does it",
        body: "Dr. Stephanie Meyer, DPT, is a Certified Myofascial Trigger Point Therapist, trained through Myopain Seminars. Dry needling is always part of a full treatment plan, not a stand-alone fix.",
      },
    ],
    faq: [
      { q: "What does \"dry\" mean in dry needling?", a: "It means no medication or injection goes in. The needle itself does the work on the trigger point." },
      { q: "Who performs dry needling at Fox Valley PT?", a: "Dr. Stephanie Meyer, DPT, a Certified Myofascial Trigger Point Therapist trained through Myopain Seminars." },
    ],
    related: ["physical-therapy", "tmj"],
  },
  {
    slug: "sports-medicine",
    name: "Sports Medicine & Athletic Training",
    seoTitle: "Sports Medicine",
    short: "Get athletes back on the field, with certified athletic trainers.",
    metaDescription: "Sports medicine and athletic training in Oshkosh, WI. Evaluation and rehab of athletic injuries, sport-specific conditioning, and certified athletic trainers.",
    image: "/img/stock/sports-stretch.jpg",
    intro:
      "Our licensed athletic trainer and therapists treat athletes of every level, from youth sports to pros. We treat the injury and then get you ready for the demands of your sport.",
    sections: [
      {
        heading: "What we do",
        list: [
          "Evaluation and treatment of athletic injuries, especially knee and ankle",
          "Shoulder and throwing injury rehab",
          "Sport-specific conditioning and personal training",
          "Athletic training services and on-call advice for acute injuries at local schools",
        ],
      },
    ],
    related: ["physical-therapy", "occupational-hand-therapy"],
  },
  {
    slug: "vertigo-balance-concussion",
    name: "Vertigo, Balance & Concussion",
    short: "Vestibular rehab for dizziness, vertigo and concussion recovery.",
    metaDescription: "Vertigo and vestibular therapy in Oshkosh, WI. Treatment for BPPV, dizziness, balance problems and concussion recovery.",
    image: "/img/blog-vertigo.webp",
    intro:
      "Dizziness and vertigo usually come from the inner ear, and most cases respond well to therapy. We figure out the cause and use targeted maneuvers and exercises to get you steady again.",
    sections: [
      {
        heading: "What we treat",
        list: ["Positional vertigo (BPPV)", "Dizziness and unsteadiness", "Balance problems and fall risk", "Concussion recovery"],
      },
      {
        heading: "How we treat",
        list: [
          "Canalith repositioning, such as the Epley maneuver, for BPPV",
          "Gaze stabilization exercises",
          "Habituation exercises to reduce dizziness",
          "Balance training and fall prevention",
        ],
      },
    ],
    faq: [
      { q: "What is BPPV?", a: "Benign Paroxysmal Positional Vertigo. Tiny calcium crystals in the inner ear get knocked out of place and cause spinning when you move your head. Repositioning maneuvers like the Epley maneuver move them back." },
    ],
    related: ["physical-therapy", "pediatrics"],
  },
  {
    slug: "pediatrics",
    name: "Pediatric Therapy",
    short: "Therapy for kids, from infants to teen athletes.",
    metaDescription: "Pediatric physical therapy in Oshkosh, WI for torticollis, developmental delay, toe walking, sports injuries and more.",
    image: "/img/kids-workout.jpg",
    intro: "We treat kids of all ages, from infants to teen athletes coming back from sports injuries.",
    sections: [
      {
        heading: "What we treat",
        list: [
          "Torticollis and plagiocephaly",
          "Developmental delay",
          "Sensory integration and sensory processing",
          "Autism",
          "Flat feet and toe walking",
          "Cerebral palsy and Down syndrome",
          "Juvenile rheumatoid arthritis",
          "Strength and endurance during cancer treatment",
          "Sports injuries",
        ],
      },
    ],
    related: ["sports-medicine", "vertigo-balance-concussion"],
  },
  {
    slug: "tmj",
    name: "TMJ Treatment",
    short: "Relief for jaw pain, clicking and limited opening.",
    metaDescription: "TMJ treatment in Oshkosh, WI. Physical therapy for jaw pain, clicking and popping, and limited jaw movement.",
    image: "/img/therapy-tmj.jpg",
    intro:
      "TMJ dysfunction can cause jaw pain, clicking or popping, headaches and trouble chewing. Physical therapy is often very effective, and we work with your dentist on a plan that fits you.",
    sections: [
      {
        heading: "Signs of a TMJ problem",
        list: [
          "Ongoing jaw pain or sore jaw muscles",
          "Clicking, popping or grating when you open or close your mouth",
          "Trouble opening or closing your mouth",
          "A change in how your teeth fit together",
        ],
      },
      {
        heading: "How we treat",
        body: "Manual therapy, trigger point work, exercise and education on habits like clenching. Dr. Stephanie Meyer, DPT, has specific experience treating TMJ dysfunction.",
      },
    ],
    related: ["dry-needling", "physical-therapy"],
  },
  {
    slug: "work-injuries",
    name: "Work Injuries & Worker's Comp",
    short: "Hurt on the job? You choose where you get therapy.",
    metaDescription: "Work injury rehab and worker's compensation physical therapy in Oshkosh, WI. Plus ergonomic training and injury prevention programs for employers.",
    image: "/img/stock/construction-worker.jpg",
    intro:
      "If you're hurt at work, you have a choice in where you get therapy. We provide complete treatment, work-specific retraining and education to get you back to your job.",
    sections: [
      {
        heading: "For injured workers",
        body: "Our office staff coordinates with your case manager so your recovery is as low-stress as possible. We also accept motor vehicle accident cases.",
      },
      {
        heading: "For employers",
        list: [
          "Ergonomic training",
          "Work-specific conditioning",
          "Health education and exercise programs for \"industrial athletes\"",
        ],
      },
    ],
    related: ["physical-therapy", "occupational-hand-therapy"],
  },
  {
    slug: "wellness",
    name: "Wellness & Prevention",
    short: "Programs to keep you moving well, including annual wellness checks.",
    metaDescription: "Wellness and injury prevention programs in Oshkosh, WI, including annual wellness checks, women's health, stretching programs and spine education.",
    image: "/img/stock/wellness-stretch.jpg",
    intro: "The best injury is the one you avoid. These programs help you stay strong and moving well.",
    sections: [
      {
        heading: "Programs",
        list: [
          "Annual wellness checks (\"Check Your Engine\")",
          "Back, neck and spine education to prevent injury",
          "Personalized exercise programs",
          "Women's health: pelvic pain, pelvic floor strengthening, and pre- and postpartum exercise",
          "Professional therapeutic stretching programs",
        ],
      },
    ],
    related: ["physical-therapy", "work-injuries"],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
