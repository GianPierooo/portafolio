import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CommandMenu from "@/components/ui/CommandMenu";
import { identity } from "@/lib/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(identity.domain),
  title: {
    default: `${identity.name} | ${identity.role}`,
    template: `%s | ${identity.name}`,
  },
  description: identity.tagline,
  keywords: [
    "Cloud Engineer",
    "AI Solutions Architect",
    "Oracle Cloud",
    "RAG",
    "LLM",
    "Arquitectura Cloud",
    "Inteligencia Artificial",
    "Automatización",
    "Gian Piero Cano",
  ],
  authors: [{ name: identity.name, url: identity.domain }],
  creator: identity.name,
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: identity.domain,
    siteName: identity.name,
    title: `${identity.name} | ${identity.role}`,
    description: identity.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} | ${identity.role}`,
    description: identity.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD Person — SEO estructurado (§5.5).
 * Rol Cloud/AI + sameAs a GitHub/LinkedIn.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: identity.role,
  description: identity.tagline,
  url: identity.domain,
  email: `mailto:${identity.email}`,
  sameAs: [identity.github, identity.linkedin],
  knowsAbout: [
    "Cloud Architecture",
    "Artificial Intelligence",
    "LLM Integration",
    "RAG",
    "Oracle Cloud",
    "Automation",
    "PostgreSQL",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        <CommandMenu />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              marginBottom: "2rem",
              background: "rgb(15 23 42)",
              border: "1px solid rgb(51 65 85)",
              color: "#f8fafc",
            },
            className: "sonner-toast-visible",
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
