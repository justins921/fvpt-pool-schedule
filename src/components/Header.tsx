"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { NAV, SITE } from "@/content/site";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="hide-sm">
            <Icon name="pin" /> {SITE.address.street}, {SITE.address.city}
          </span>
          <span>
            <Icon name="phone" /> <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="brand" aria-label={`${SITE.shortName} home`}>
            <Image src="/img/logo.png" alt="" width={46} height={46} priority />
            <span>
              <strong>Fox Valley Physical Therapy</strong>
              <small>& Wellness Clinic · Oshkosh</small>
            </span>
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={current(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a href={SITE.phoneHref} className="btn btn-primary call-desktop">
            <Icon name="phone" /> Call to schedule
          </a>
          <button className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} className="icon" />
          </button>
        </div>
        <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>
              {n.label}
            </Link>
          ))}
          <a href={SITE.phoneHref} className="btn btn-primary">
            <Icon name="phone" /> Call {SITE.phone}
          </a>
        </nav>
      </header>
    </>
  );
}
