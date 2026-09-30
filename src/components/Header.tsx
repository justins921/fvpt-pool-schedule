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
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="logo" aria-label={`${SITE.shortName} home`}>
          <Image src="/img/logo.png" alt="" width={48} height={48} priority />
          <span>
            <strong>Fox Valley Physical Therapy</strong>
            <small>& Wellness Clinic</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) =>
            n.children ? (
              <div className="drop" key={n.label}>
                <button type="button" aria-haspopup="true">
                  {n.label} <Icon name="chevron" className="icon-sm" />
                </button>
                <div className="drop-menu">
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
          Call Us {SITE.phone.replace(/[()]/g, "").replace(" ", "-")}
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
