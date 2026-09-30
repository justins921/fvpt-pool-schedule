// Everything the clinic will want to tweak lives here.
// Hours, capacity and prices are PLACEHOLDERS — confirm with the front desk before launch.

export const CLINIC = {
  name: "Fox Valley Physical Therapy & Wellness Clinic",
  phone: "(920) 235-8966",
  email: "admin@foxvalleyphysicaltherapy.com",
  address: "909 S Washburn St, Oshkosh, WI 54904",
  timeZone: "America/Chicago",
};

export const POOL = {
  slotMinutes: 60,
  // Swimmers allowed in the pool at the same time.
  capacityPerSlot: 4,
  // How far ahead people can book, and the minimum notice.
  bookingWindowDays: 14,
  minLeadMinutes: 60,
  // How long an unpaid booking holds a spot while someone is in Stripe Checkout.
  // Stripe requires checkout sessions to live at least 30 minutes.
  paymentHoldMinutes: 31,
};

// Open-pool hours by weekday (0 = Sunday). Times are local clinic time, 24h "HH:MM".
// A day with no entry is closed.
export const HOURS: Record<number, { open: string; close: string }[]> = {
  1: [{ open: "07:00", close: "18:00" }],
  2: [{ open: "07:00", close: "18:00" }],
  3: [{ open: "07:00", close: "18:00" }],
  4: [{ open: "07:00", close: "18:00" }],
  5: [{ open: "07:00", close: "16:00" }],
  6: [{ open: "08:00", close: "12:00" }],
};

export type BookingType = {
  id: string;
  label: string;
  description: string;
  priceCents: number; // 0 = no online payment
};

export const BOOKING_TYPES: BookingType[] = [
  {
    id: "patient",
    label: "Current FVPT patient",
    description: "Independent pool time as part of your plan of care. No charge.",
    priceCents: 0,
  },
  {
    id: "community",
    label: "Community member",
    description: "Open pool access for anyone. Pay online when you book.",
    priceCents: 1500,
  },
];

export function bookingType(id: string) {
  return BOOKING_TYPES.find((t) => t.id === id);
}

export function formatPrice(cents: number) {
  return cents === 0 ? "Free" : `$${(cents / 100).toFixed(cents % 100 ? 2 : 0)}`;
}
