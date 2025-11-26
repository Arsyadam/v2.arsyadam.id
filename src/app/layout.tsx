import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Fira_Code } from "next/font/google";
import Footer from "./components/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const code = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Arsyad Ali Mahardika - AI Engineer | SMK Telkom Malang",
    template: "%s | Arsyad Ali Mahardika",
  },
  description:
    "Arsyad Ali Mahardika (Arsyadam) adalah AI Engineer dan Machine Learning Specialist dari SMK Telkom Malang. Pelopor Sekolah menengah kejuruan pertama di Indonesia di bidang Teknologi dan Informatika. Pengalaman: General Manager Metic Merch, Juara FIKSI Puspresnas, Top 10 FedEx Challenge. Keahlian: AI & Machine Learning (TensorFlow, Computer Vision), IoT Development, Data Analytics, Web Development (React, Next.js).",
  keywords: [
    "Arsyad Ali Mahardika",
    "Arsyadam",
    "AI Engineer",
    "AI Engineer SMK Telkom Malang",
    "Machine Learning Engineer",
    "SMK Telkom Malang",
    "Sekolah menengah kejuruan pertama Indonesia",
    "Teknologi dan Informatika",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "NLP",
    "Data Science",
    "Artificial Intelligence",
    "IoT Developer",
    "Python Developer",
    "TensorFlow",
    "PyTorch",
    "React Developer",
    "Next.js Developer",
    "FIKSI Puspresnas",
    "FedEx Challenge",
    "Metic Merch",
    "General Manager",
    "Software Engineering",
    "Algoritma Data Science School",
    "AI Portfolio",
    "Machine Learning Portfolio",
    "Malang Indonesia",
  ],
  authors: [{ name: "Arsyad Ali Mahardika", url: "https://arsyadam.id" }],
  creator: "Arsyad Ali Mahardika",
  publisher: "Arsyad Ali Mahardika",
  metadataBase: new URL("https://arsyadam.id"),
  alternates: {
    canonical: "https://arsyadam.id",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "https://arsyadam.id",
    title: "Arsyad Ali Mahardika - AI Engineer | SMK Telkom Malang",
    description:
      "AI Engineer dan Machine Learning Specialist dari SMK Telkom Malang. Pelopor Sekolah menengah kejuruan pertama di Indonesia di bidang Teknologi dan Informatika. Juara FIKSI Puspresnas, Top 10 FedEx Challenge.",
    siteName: "Arsyad Ali Mahardika",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arsyad Ali Mahardika - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsyad Ali Mahardika - AI Engineer | SMK Telkom Malang",
    description:
      "AI Engineer dan Machine Learning Specialist dari SMK Telkom Malang. Juara FIKSI Puspresnas, Top 10 FedEx Challenge.",
    creator: "@arsyadam",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "0Dg8XiyKMMn98jhOkpscE-uaxM8M4bxaa86uy4k-1dA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arsyad Ali Mahardika",
    alternateName: "Arsyadam",
    url: "https://arsyadam.id",
    image: "https://arsyadam.id/profile.jpg",
    jobTitle: "AI Engineer & Machine Learning Specialist",
    worksFor: {
      "@type": "Organization",
      name: "Metic Merch",
      url: "https://metic.id",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "SMK Telkom Malang",
        url: "https://www.smktelkom-mlg.sch.id",
        description:
          "Pelopor Sekolah menengah kejuruan pertama di Indonesia di bidang Teknologi dan Informatika",
      },
      {
        "@type": "EducationalOrganization",
        name: "Algoritma Data Science School",
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "IoT Development",
      "Data Science",
      "Web Development",
      "TensorFlow",
      "PyTorch",
      "Python",
      "React",
      "Next.js",
    ],
    award: [
      "1st Place Gold Medal - FIKSI National Digital Technology Competition (Puspresnas)",
      "1st Place - IoT Competition (Mage ITS)",
      "1st Runner Up - National Standardization Competition (BSN)",
      "3rd Place - Visual Data Competition (Ministry of Finance)",
      "3rd Place - STEAM Competition (Sampoerna Academy)",
      "Top 10 Finalist - FedEx International Trade Challenge",
      "Semifinalist - Samsung Solve for Tomorrow",
      "2nd Place - LKS Artificial Intelligence",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malang",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    sameAs: [
      "https://github.com/arsyadam",
      "https://linkedin.com/in/arsyadam",
      "https://twitter.com/arsyadam",
    ],
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "SMK Telkom Malang",
    alternateName: "SMK Telkom Malang - The Real Informatics School",
    url: "https://www.smktelkom-mlg.sch.id",
    description:
      "SMK Telkom Malang adalah pelopor Sekolah menengah kejuruan pertama di Indonesia di bidang Teknologi dan Informatika. Berpengalaman dari tahun 1992.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malang",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    logo: "https://www.smktelkom-mlg.sch.id/logo.png",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Arsyad Ali Mahardika",
    url: "https://arsyadam.id",
    description:
      "AI Engineer dan Machine Learning Specialist dari SMK Telkom Malang",
    author: {
      "@type": "Person",
      name: "Arsyad Ali Mahardika",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://arsyadam.id/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${poppins.className} ${code.variable} antialiased`}>
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
