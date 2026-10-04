import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getDictionary } from "@/i18n/get-dictionary";
import { company, socials } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: {
      default: dict.meta.defaultTitle,
      template: "%s | Fresco Transit",
    },
    description: dict.meta.defaultDescription,
    applicationName: company.name,
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  email: company.email,
  telephone: company.phoneTel,
  sameAs: socials.map((item) => item.href),
  areaServed: "CI",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Immeuble Balance, boulevard Giscard d’Estaing, 2e étage, porte 4",
    addressLocality: "Abidjan",
    addressRegion: "Treichville",
    postalCode: "03 BPM 396",
    addressCountry: "CI",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary();

  return (
    <html
      lang={dict.locale}
      className={`${poppins.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-white text-ink">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[10px] focus:bg-surface focus:px-4 focus:py-2"
        >
          {dict.chrome.skip}
        </a>
        <Header locale={dict.locale} chrome={dict.chrome} labels={dict.nav} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop label={dict.chrome.backToTop} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
