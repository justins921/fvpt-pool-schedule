import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = { title: "Website editor", robots: { index: false, follow: false } };

// On the live site the editor needs Keystatic Cloud (NEXT_PUBLIC_KEYSTATIC_PROJECT). Without it,
// local mode can't save on Vercel, so show a note instead of an editor that fails on save.
const connected = Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT) || process.env.NODE_ENV !== "production";

export default function Layout() {
  if (!connected) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "80px auto", padding: "0 20px", lineHeight: 1.6 }}>
        <h1 style={{ fontSize: 24 }}>Website editor isn&apos;t connected yet</h1>
        <p>The editor goes live once the Keystatic Cloud project is linked to this site. Ask Justin to finish the setup.</p>
      </main>
    );
  }
  return <KeystaticApp />;
}
