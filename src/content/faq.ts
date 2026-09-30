import { POOL, SITE } from "./site";

// Every answer here comes from the clinic's own website or from the clinic manager.
export const FAQ: { q: string; a: string }[] = [
  {
    q: "Do I need a referral to see a physical therapist?",
    a: "No. In Wisconsin you have direct access to a physical therapist, so you can call and schedule without a referral. Some insurance plans do require a diagnosis from your doctor for coverage, and our office staff can help you check.",
  },
  {
    q: "What insurance do you accept?",
    a: "We're a provider for most insurance plans, including Medicare, Aetna, Blue Cross Blue Shield, Cigna, Humana, UnitedHealthcare, Network Health, Tricare and more. We also accept worker's comp and motor vehicle accident claims, and physical therapy is a qualified HSA and FSA expense.",
  },
  {
    q: "What should I expect at my first visit?",
    a: "Your therapist will go over your history, examine how you move, measure strength and joint function, and explain what they found. Then you'll build a treatment plan together. Wear comfortable clothes you can move in, and bring your intake form if you filled it out at home.",
  },
  {
    q: "How long is a physical therapy appointment?",
    a: "Treatment sessions run from 30 minutes to two hours, depending on what you need. Every session is one-on-one with your therapist.",
  },
  {
    q: "Do you offer aquatic therapy?",
    a: "Yes. We have the only therapeutic pool in Oshkosh. Aquatic therapy is a great fit for arthritis, rehab after surgery or joint replacement, balance problems and chronic pain.",
  },
  {
    q: "Can I use the pool on my own?",
    a: `Current and former patients can reserve the pool for independent exercise. It's one person per hour, and most people come twice a week for ${POOL.monthlyPrice} a month. Call the front desk to book.`,
  },
  {
    q: "I was hurt at work. Can I come to you?",
    a: "Yes. You have a choice in where you get therapy after a work injury. Our office staff will coordinate with your case manager so the process is as easy as possible.",
  },
  {
    q: "Do you treat kids?",
    a: "Yes. Several of our therapists specialize in pediatrics, from infants with torticollis to teen athletes coming back from sports injuries.",
  },
  {
    q: "Where are you located?",
    a: `We're at ${SITE.address.street} in ${SITE.address.city}, with free parking right in front of the clinic.`,
  },
];
