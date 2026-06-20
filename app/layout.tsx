import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { site, absoluteUrl } from "@/lib/site";
import { JsonLd, websiteJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: absoluteUrl(),
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>
        <JsonLd data={websiteJsonLd()} />
        <header className="site">
          <div className="container">
            <Link href="/" className="brand">
              <span className="mark">▦</span> {site.name}
            </Link>
            <nav>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site">
          <div className="container">
            <p>
              {site.name} links you to official UK council allotment pages. We
              never invent waiting times — figures are shown only where we have
              checked a real published source, with the date we checked it.
            </p>
            <p className="note">
              A project of The Company. Not affiliated with any council.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
