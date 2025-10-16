import { Analytics } from "@vercel/analytics/next";
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
    default: "Arsyad Ali Mahardika | AI Engineer & Machine Learning Specialist",
    template: "%s | Arsyad Ali Mahardika",
  },
  description:
    "Arsyad Ali Mahardika (Arsyadam) - AI Engineer and Machine Learning Specialist with expertise in Deep Learning, Computer Vision, and NLP. Explore my portfolio of AI projects, research, and professional experience.",
  keywords: [
    "Arsyad Ali Mahardika",
    "Arsyadam",
    "AI Engineer",
    "Machine Learning Engineer",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "NLP",
    "Data Science",
    "Artificial Intelligence",
    "Python Developer",
    "TensorFlow",
    "PyTorch",
    "AI Portfolio",
  ],
  authors: [{ name: "Arsyad Ali Mahardika", url: "https://arsyadam.id" }],
  creator: "Arsyad Ali Mahardika",
  publisher: "Arsyad Ali Mahardika",
  metadataBase: new URL("https://arsyadam.id"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arsyadam.id",
    title: "Arsyad Ali Mahardika | AI Engineer & Machine Learning Specialist",
    description:
      "AI Engineer and Machine Learning Specialist with expertise in Deep Learning, Computer Vision, and NLP. Explore my portfolio of AI projects and research.",
    siteName: "Arsyad Ali Mahardika Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsyad Ali Mahardika | AI Engineer & Machine Learning Specialist",
    description:
      "AI Engineer and Machine Learning Specialist with expertise in Deep Learning, Computer Vision, and NLP.",
    creator: "@arsyadam",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${code.variable} antialiased`}>
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
