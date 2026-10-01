"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { NAV } from "@/content/nav";
import { SITE } from "@/content/site";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null); // which desktop dropdown is open
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="logo" aria-label={`${SITE.shortName} home`}>
          <Image src="/img/logo.png" alt="" width={44} height={44} priority />
          <span>
            <strong>Fox Valley Physical Therapy</strong>
            <small>& Wellness Clinic</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) =>
            n.children ? (
              <div
                className={`drop${menu === n.label ? " open" : ""}`}
                key={n.label}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setMenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={menu === n.label}
                  aria-controls={`menu-${n.label}`}
                  onClick={() => setMenu(menu === n.label ? null : n.label)}
                >
                  {n.label} <Icon name="chevron" className="icon-sm" />
                </button>
                <div className="drop-menu" id={`menu-${n.label}`}>
                  {n.children.map((c) => (
                    <Link key={c.href} href={c.href}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <a href={SITE.phoneHref} className="btn">
          <Icon name="phone" className="icon-sm" /> {SITE.phone}
        </a>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <Icon name={open ? "close" : "menu"} className="icon-lg" />
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Mobile">
        {NAV.map((n) => (
          <div key={n.label}>
            <Link href={n.href}>{n.label}</Link>
            {n.children && n.label !== "Services" && (
              <div className="sublinks">
                {n.children.filter((c) => c.href !== n.href).map((c) => (
                  <Link key={c.href} href={c.href}>{c.label}</Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <a href={SITE.phoneHref} className="btn">Call Us {SITE.phone}</a>
      </nav>
    </header>
  );
}
