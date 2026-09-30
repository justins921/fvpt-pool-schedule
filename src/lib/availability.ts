import { POOL } from "./config";
import { getStore, isActive } from "./store";
import { addDays, clinicTimeToUtc, isBookableSlot, slotsForDate } from "./time";

export type SlotAvailability = { start: string; remaining: number; bookable: boolean };

export async function availabilityFor(date: string): Promise<SlotAvailability[]> {
  const slots = slotsForDate(date);
  if (!slots.length) return [];
  const from = clinicTimeToUtc(date, "00:00").toISOString();
  const to = clinicTimeToUtc(addDays(date, 1), "00:00").toISOString();
  const bookings = (await getStore().list(from, to)).filter((b) => isActive(b));
  const now = new Date();
  return slots.map((s) => {
    const taken = bookings.filter((b) => Date.parse(b.slot_start) === s.getTime()).length;
    const remaining = Math.max(0, POOL.capacityPerSlot - taken);
    return { start: s.toISOString(), remaining, bookable: remaining > 0 && isBookableSlot(s, now) };
  });
}
