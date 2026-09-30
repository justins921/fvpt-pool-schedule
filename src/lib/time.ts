import { CLINIC, HOURS, POOL } from "./config";

const TZ = CLINIC.timeZone;

// Offset (ms) between the clinic's wall clock and UTC at a given instant.
function tzOffsetMs(at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - Math.floor(at.getTime() / 1000) * 1000;
}

// "2026-10-05" + "07:00" in clinic time -> UTC Date
export function clinicTimeToUtc(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let utc = guess - tzOffsetMs(new Date(guess));
  const second = guess - tzOffsetMs(new Date(utc)); // correct across DST changes
  if (second !== utc) utc = second;
  return new Date(utc);
}

export function clinicToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(now);
}

export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

export function weekday(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function isValidDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && addDays(date, 0) === date;
}

export function bookableDates(now = new Date()): string[] {
  const today = clinicToday(now);
  return Array.from({ length: POOL.bookingWindowDays }, (_, i) => addDays(today, i));
}

// All slot start times (UTC) for a clinic-local date, ignoring availability.
export function slotsForDate(date: string): Date[] {
  const out: Date[] = [];
  for (const { open, close } of HOURS[weekday(date)] ?? []) {
    const start = clinicTimeToUtc(date, open).getTime();
    const end = clinicTimeToUtc(date, close).getTime();
    for (let t = start; t + POOL.slotMinutes * 60_000 <= end; t += POOL.slotMinutes * 60_000) {
      out.push(new Date(t));
    }
  }
  return out;
}

// Is this exact instant a real slot someone can still book?
export function isBookableSlot(start: Date, now = new Date()): boolean {
  if (start.getTime() < now.getTime() + POOL.minLeadMinutes * 60_000) return false;
  const date = clinicToday(start);
  if (!bookableDates(now).includes(date)) return false;
  return slotsForDate(date).some((s) => s.getTime() === start.getTime());
}

export function formatSlot(start: Date | string, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    ...opts,
  }).format(new Date(start));
}

export function formatTime(start: Date | string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date(start));
}
