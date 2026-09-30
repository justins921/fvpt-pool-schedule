import { SERVICES } from "./services";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}` })) },
  { label: "Pool", href: "/pool" },
  {
    label: "Patients",
    href: "/new-patients",
    children: [
      { label: "New Patients", href: "/new-patients" },
      { label: "Insurance & Billing", href: "/insurance" },
      { label: "Pool Access", href: "/pool" },
    ],
  },
  {
    label: "About",
    href: "/team",
    children: [
      { label: "Our Team", href: "/team" },
      { label: "Blog", href: "/blog" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const AREAS = ["Oshkosh, WI", "Neenah, WI", "Menasha, WI", "Appleton, WI", "Omro, WI", "Winneconne, WI", "Fond du Lac, WI", "Ripon, WI"];
