export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

// Built on the server and passed to the header, so the Services menu always matches the services in the editor.
export function buildNav(services: { slug: string; name: string }[]): NavItem[] {
  return [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })) },
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
}
