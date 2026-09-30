import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old Webflow URLs -> new pages, so existing Google rankings and bookmarks keep working.
  async redirects() {
    return [
      { source: "/our-team", destination: "/team", permanent: true },
      { source: "/patient-coverage-and-billing", destination: "/insurance", permanent: true },
      { source: "/reviews", destination: "/", permanent: true },
      { source: "/services/tmj-treatment", destination: "/services/tmj", permanent: true },
      { source: "/service-categories/rehabilitation", destination: "/services/physical-therapy", permanent: true },
      { source: "/service-categories/sports-medicine", destination: "/services/sports-medicine", permanent: true },
      { source: "/forms", destination: "/new-patients", permanent: true },
    ];
  },
};

export default nextConfig;
