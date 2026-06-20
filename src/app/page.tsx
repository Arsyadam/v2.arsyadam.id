import Image from "next/image";
import TimelineList from "./components/home/TimelineList";
import { Metadata } from "next";
import HeroSection from "./components/home/HeroSection";
import SectionHeader from "./components/home/SectionHeader";
import CtaSection from "./components/home/CtaSection";
import TransitMapBackground from "./components/home/transit/TransitMapBackground";
import HomeShowcaseSection from "./components/home/HomeShowcaseSection";
import HomePerspectivesSection from "./components/home/HomePerspectivesSection";
import AchievementCard, {
  driveCertificateThumbnail,
  type AchievementItem,
} from "./components/home/AchievementCard";
import { getBlogPosts } from "./blog/utils";
import { getAllProjects } from "./showcase/lib/showcase";
import { pickFeaturedProjects } from "./showcase/lib/project-order";
import { linkLabel } from "./lib/link-label";

export const metadata: Metadata = {
  title:
    "Arsyad Ali Mahardika - AI Engineer & Machine Learning Specialist | SMK Telkom Malang",
  description:
    "Portfolio Arsyad Ali Mahardika (Arsyadam), AI Engineer dari SMK Telkom Malang. Juara FIKSI Puspresnas, General Manager Metic Merch. Keahlian: AI, Machine Learning, Computer Vision, Data Science, Web Development.",
  openGraph: {
    title: "Arsyad Ali Mahardika - AI Engineer | SMK Telkom Malang",
    description:
      "Portfolio AI Engineer & Machine Learning Specialist. Juara FIKSI Puspresnas, General Manager Metic Merch.",
    url: "https://arsyadam.id",
    type: "profile",
  },
};

export const revalidate = 3600;

const educationItems = [
  {
    title: "SMK Telkom Malang",
    subtitle: "Software Engineering",
    href: "https://smktelkom-mlg.sch.id",
    label: linkLabel("https://smktelkom-mlg.sch.id"),
  },
  {
    title: "Sakura Science High School Program",
    subtitle: "Exchange program by JST",
    href: "https://drive.google.com/file/d/1sAqaZnOM4-I0aILb1NC9Q3SCcZXihtJ_/view?usp=drive_link",
    label: linkLabel(
      "https://drive.google.com/file/d/1sAqaZnOM4-I0aILb1NC9Q3SCcZXihtJ_/view?usp=drive_link"
    ),
  },
  {
    title: "Algoritma Data Science School",
    subtitle: "Data Visualization, Machine Learning",
    href: "https://algorit.ma",
    label: linkLabel("https://algorit.ma"),
  },
];

const experienceItems = [
  {
    period: "May 2026 - Present",
    title: "AI Engineer Intern at Transjakarta",
    subtitle:
      "Developing AI and machine learning solutions for smart mobility, translating operational needs into data-driven tools that support Jakarta's public transportation ecosystem.",
    href: "https://transjakarta.co.id",
    label: linkLabel("https://transjakarta.co.id"),
    logo: "/img/showcase/transjakarta.png",
    logoAlt: "Transjakarta Logo",
  },
  {
    period: "Nov 2025 - Apr 2026",
    title: "AI Engineer Intern at dot.co.id",
    subtitle:
      "Developed and implemented AI solutions to enhance business processes and customer experiences.",
    href: "https://dot.co.id",
    label: linkLabel("https://dot.co.id"),
    logo: "https://assets.cdn.dicoding.com/original/jobs/dos:lowongan_dicoding_pt_digdaya_olah_teknologi_indonesia_260322191647.png",
    logoAlt: "dot.co.id Logo",
  },
  {
    period: "Sep 2024 - Dec 2025",
    title: "Lead, METIC",
    subtitle:
      "Lead at Moklet Education Technology and Informatic Club (METIC), driving student-led tech programs, workshops, and innovation initiatives across software engineering, AI, and digital literacy.",
    href: "https://metic.moklet.org",
    label: linkLabel("https://metic.moklet.org"),
    logo: "https://res.cloudinary.com/mokletorg/image/upload/v1721611310/app_media/file_u6zi7e.png",
    logoAlt: "METIC Logo",
  },
];

const achievements: AchievementItem[] = [
  {
    organization: "Puspresnas",
    title: "1st Gold Medal - FIKSI Teknologi Digital",
    subtitle:
      "National innovation competition focused on creating digital technology solutions for real-world problems.",
    certificateLink:
      "https://drive.google.com/file/d/1-0JLawWPEafudhWz18h5sNnVAPLSDYjG/view?usp=drive_link",
    certificateImage: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1-0JLawWPEafudhWz18h5sNnVAPLSDYjG/view?usp=drive_link"
    ),
    gradient: "from-red-50/50 to-transparent",
  },
  {
    organization: "SMK Telkom Malang",
    title: "Best Academic & Non-Academic Student",
    subtitle:
      "Recognized as the best student in both academic and non-academic categories at SMK Telkom Malang, combining academic excellence with leadership and extracurricular impact.",
    certificateLink: "#",
    certificateImage: null,
    gradient: "from-rose-50/50 to-transparent",
  },
  {
    organization: "Puspresnas & Dinas Pendidikan Jatim",
    title: "1st Place - LKS Artificial Intelligence",
    subtitle:
      "National vocational school AI competition testing machine learning, computer vision, and problem-solving skills.",
    certificateLink:
      "https://drive.google.com/file/d/1NKivuheEOHrlkUGcxfmcKQruVNgqMxV3/view?usp=drive_link",
    certificateImage: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1NKivuheEOHrlkUGcxfmcKQruVNgqMxV3/view?usp=drive_link"
    ),
    gradient: "from-purple-50/50 to-transparent",
  },
  {
    organization: "Mage ITS",
    title: "1st Place - IoT Competition",
    subtitle:
      "Technology and engineering competition by ITS, focusing on developing IoT-based industrial solutions.",
    certificateLink:
      "https://drive.google.com/file/d/1-qLxDfabJoLoemI_TE52bMLhmEImWm62/view?usp=drive_link",
    certificateImage: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1-qLxDfabJoLoemI_TE52bMLhmEImWm62/view?usp=drive_link"
    ),
    gradient: "from-blue-50/50 to-transparent",
  },
  {
    organization: "BSN",
    title: "1st Runner Up - Kompetisi Standardisasi Nasional (KSN)",
    subtitle:
      "National competition by Indonesia's Standardization Agency, promoting innovation aligned with industry standards.",
    certificateLink:
      "https://drive.google.com/file/d/1phQxQ5REzsWvjTPXxqKn7_4DtSJt28U8/view?usp=drive_link",
    certificateImage: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1phQxQ5REzsWvjTPXxqKn7_4DtSJt28U8/view?usp=drive_link"
    ),
    gradient: "from-amber-50/50 to-transparent",
  },
  {
    organization: "Kemenkeu",
    title: "3rd Place - Visual Data Competition",
    subtitle:
      "Data visualization competition by the Indonesian Ministry of Finance, tackling social issues like climate change.",
    certificateLink:
      "https://drive.google.com/file/d/1-QjYElyXZDDp7-fdP5A48xFvvdFuBRmq/view?usp=drive_link",
    certificateImage: driveCertificateThumbnail(
      "https://drive.google.com/file/d/1-QjYElyXZDDp7-fdP5A48xFvvdFuBRmq/view?usp=drive_link"
    ),
    gradient: "from-green-50/50 to-transparent",
  },
  {
    organization: "Sampoerna Academy",
    title: "3rd Place - STEAM Competition",
    subtitle:
      "Multidisciplinary competition combining Science, Technology, Engineering, Arts, and Mathematics for innovative solutions.",
    certificateLink:
      "https://drive.google.com/file/d/104Gj8-95XiGqGmJyTKsojSqsNpPlYmyu/view?usp=drive_link",
    certificateImage: driveCertificateThumbnail(
      "https://drive.google.com/file/d/104Gj8-95XiGqGmJyTKsojSqsNpPlYmyu/view?usp=drive_link"
    ),
    gradient: "from-teal-50/50 to-transparent",
  },
  {
    organization: "Junior Achievement",
    title: "Top 10 Finalist - FedEx International Trade Challenge",
    subtitle:
      "Global competition promoting innovative international trade strategies among young entrepreneurs.",
    certificateLink:
      "https://drive.google.com/file/d/10EbarSaYREOMJQr10LEBPBMI879GvamG/view?usp=drive_link",
    certificateImage: driveCertificateThumbnail(
      "https://drive.google.com/file/d/10EbarSaYREOMJQr10LEBPBMI879GvamG/view?usp=drive_link"
    ),
    gradient: "from-indigo-50/50 to-transparent",
  },
  {
    organization: "Samsung",
    title: "Semifinalist - Solve for Tomorrow (SFT)",
    subtitle:
      "Samsung's global competition empowering students to solve community challenges using STEM innovation.",
    certificateLink: "#",
    certificateImage: null,
    gradient: "from-neutral-50/40 to-transparent",
  },
];

export default async function Home() {
  const [allPosts, allProjects] = await Promise.all([
    getBlogPosts(),
    getAllProjects(),
  ]);
  const latestPosts = allPosts.slice(0, 5);
  const featuredProjects = pickFeaturedProjects(
    Array.isArray(allProjects) ? allProjects : []
  );

  return (
    <div id="landing-page" className="relative isolate w-full flex-1 bg-neutral-50">
      <TransitMapBackground rootId="landing-page" />
      <main
        id="webpage"
        className="relative z-10 flex w-full flex-1 flex-col items-center bg-transparent"
      >
        <HeroSection />

        {/* Experience */}
        <section
          id="experience"
          className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]"
        >
        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
          <SectionHeader
            badge="Experience"
            title="Learning by Doing"
            description="From leading student tech communities to building AI solutions at scale, turning knowledge into real impact."
          />

          <div className="w-full max-w-4xl">
            <TimelineList
              items={experienceItems}
              showPeriod
              spineId="experience"
            />
          </div>
        </div>
      </section>

      <HomeShowcaseSection projects={featuredProjects} />

      {/* Education */}
        <section
          id="education"
          className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]"
        >
        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
          <SectionHeader
            badge="Education"
            title="Building a Strong Foundation"
            description="Chosen to master AI, machine learning, and analytics, aiming to develop innovative tech solutions and create real-world impact."
          />

          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <TimelineList items={educationItems} spineId="education" />

            <div className="hidden justify-center lg:flex">
              <Image
                src="/img/education.png"
                alt="Education illustration"
                width={400}
                height={200}
                className="max-w-[400px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievement */}
        <section
          id="achievement"
          className="relative flex w-full items-center justify-center overflow-hidden bg-transparent px-5 py-10 md:px-10 md:py-[60px] lg:py-[80px]"
        >
        <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-10">
          <SectionHeader
            badge="Achievement"
            title="Recognition & Milestones"
            badgeClassName="text-amber-600"
            transitCrossing
            description="A journey of competitions and challenges that sharpened my critical thinking, innovation, and teamwork, both technical and human."
          />

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.title} achievement={achievement} />
            ))}
          </div>
        </div>
      </section>

      <HomePerspectivesSection posts={latestPosts} />

      <CtaSection />
      </main>
    </div>
  );
}
