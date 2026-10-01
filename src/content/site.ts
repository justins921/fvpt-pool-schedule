// Clinic facts used across the site. Edit them in the website editor under "Clinic settings"
// (stored in src/content/data/settings.json), not here.
import settingsJson from "./data/settings.json";

type Settings = {
  phone: string; fax: string; email: string; founded: number;
  address: { street: string; city: string; state: string; zip: string };
  hours: { days: string; time: string; opens?: string; closes?: string; schemaDays?: string[] }[];
  areas?: string[];
  pool: { bookingUrl?: string; monthlyPrice: string; visitsPerWeek: number; lastStart: string; outBy: string };
};
// The editor leaves blank fields out of the file, so fill in safe defaults.
const settings = settingsJson as unknown as Settings;

const a = settings.address;
const q = encodeURIComponent(`${a.street}, ${a.city}, ${a.state} ${a.zip}`);

export const SITE = {
  name: "Fox Valley Physical Therapy & Wellness Clinic",
  shortName: "Fox Valley Physical Therapy",
  url: "https://www.foxvalleyphysicaltherapy.com",
  phone: settings.phone,
  phoneHref: `tel:+1${settings.phone.replace(/\D/g, "").slice(-10)}`,
  fax: settings.fax,
  email: settings.email,
  address: a,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Fox Valley Physical Therapy " + a.street + " " + a.city + " " + a.state + " " + a.zip)}`,
  mapsEmbed: `https://www.google.com/maps?q=${q}&output=embed`,
  founded: settings.founded,
  hours: settings.hours.map((h) => ({ days: h.days, time: h.time ?? "", schema: h.schemaDays ?? [], opens: h.opens ?? "", closes: h.closes ?? "" })),
  intakeForm: "/docs/patient-intake-form.pdf",
};

export const POOL = { bookingUrl: "", ...settings.pool };
export const AREAS = settings.areas ?? [];

export const fullAddress = `${a.street}, ${a.city}, ${a.state} ${a.zip}`;

// Swap {placeholders} in editable text for live clinic settings, so a price or
// phone number only has to be changed in one place.
export function fill(text: string | undefined, extra: Record<string, string> = {}) {
  const values: Record<string, string> = {
    poolPrice: POOL.monthlyPrice,
    visitsPerWeek: String(POOL.visitsPerWeek),
    lastStart: POOL.lastStart,
    outBy: POOL.outBy,
    phone: SITE.phone,
    street: a.street,
    city: a.city,
    ...extra,
  };
  return (text ?? "").replace(/\{(\w+)\}/g, (m, k) => values[k] ?? m);
}
