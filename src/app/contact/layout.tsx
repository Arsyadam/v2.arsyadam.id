import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Hubungi Arsyad Ali Mahardika",
  description:
    "Hubungi Arsyad Ali Mahardika untuk kolaborasi proyek AI, Machine Learning, IoT, atau konsultasi teknologi. Email, LinkedIn, dan media sosial tersedia.",
  openGraph: {
    title: "Contact - Arsyad Ali Mahardika",
    description:
      "Hubungi untuk kolaborasi proyek AI, Machine Learning, IoT, atau konsultasi teknologi.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
