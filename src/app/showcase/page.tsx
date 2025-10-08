import { getAllProjects } from "./lib/showcase";
import ProjectCard from "./components/ProjectCard";
import MediaModal from "./components/MediaModal";
import { Sparkles, Code } from "lucide-react";

export default async function ShowcasePage() {
  const projects = await getAllProjects();
  const validProjects = Array.isArray(projects) ? projects : [];

  const featuredMedia = [
    {
      type: "youtube" as const,
      id: "MaQYp0FzlTA",
      title: "EMANG BOLEH SE-STRESS ITU - FIKSI Journey Ep.1",
      description: "FIKSI Gold Medal winning project walkthrough",
      thumbnail: "https://img.youtube.com/vi/MaQYp0FzlTA/maxresdefault.jpg",
      duration: "25:45",
    },
    {
      type: "youtube" as const,
      id: "zsUvD1aUIYA",
      title: "Hari Penentuan! Presentasi dan Pitching Besar - FIKSI Journey Ep.2",
      description: "FIKSI Gold Medal winning project walkthrough",
      thumbnail: "https://img.youtube.com/vi/zsUvD1aUIYA/maxresdefault.jpg",
      duration: "25:45",
    },
    {
      type: "youtube" as const,
      id: "S_qlN3FuEBU",
      title: "Goodbye FIKSI - Hari Terakhir dan Awarding - FIKSI Journey Ep.3",
      description: "FIKSI Gold Medal winning project walkthrough",
      thumbnail: "https://img.youtube.com/vi/S_qlN3FuEBU/maxresdefault.jpg",
      duration: "25:45",
    },
    {
      type: "youtube" as const,
      id: "q8Y1MoMjZRw",
      title: "Recap Back To School 2023",
      description: "Event recap and highlights",
      thumbnail: "https://img.youtube.com/vi/q8Y1MoMjZRw/maxresdefault.jpg",
      duration: "15:22",
    },
    {
      type: "youtube" as const,
      id: "2_L7G9CkxbI",
      title: "SSHP 2025 Vlog - Menuju Jepang Episode 1",
      description: "Rangkuman persiapan dan perjalanan menuju Jepang",
      thumbnail: "https://img.youtube.com/vi/2_L7G9CkxbI/maxresdefault.jpg",
      duration: "37:39",
    },
    {
      type: "youtube" as const,
      id: "VZ6cdAKklrI",
      title: "SSHP 2025 Vlog - Hari-H Belajar Episode 2",
      description: "Kegiatan belajar dan adaptasi di Jepang",
      thumbnail: "https://img.youtube.com/vi/VZ6cdAKklrI/maxresdefault.jpg",
      duration: "20:04",
    },
    {
      type: "youtube" as const,
      id: "YAjCQs2_ZhU",
      title: "Review Orem-Orem Comboran",
      thumbnail: "https://img.youtube.com/vi/YAjCQs2_ZhU/maxresdefault.jpg",
      description: "Kuliner khas Malang yang wajib dicoba!",
      duration: "4:40",
    },
    {
      type: "youtube" as const,
      id: "7Fve8rKZg18",
      title: "Bulan-Bahasa-Nawasena",
      thumbnail: "https://img.youtube.com/vi/7Fve8rKZg18/maxresdefault.jpg",
      description: "Event dokumenter Bulan Bahasa",
      duration: "4:40",
    },
    {
      type: "instagram" as const,
      id: "C-2xONcJNO3",
      title: "Behind the scenes of FIKSI competition prep",
      description: "Getting ready for the biggest competition of the year!",
      thumbnail: "https://instagram.com/p/C-2xONcJNO3/media/?size=l",
      url: "https://www.instagram.com/p/C-2xONcJNO3/",
    },
    {
      type: "instagram" as const,
      id: "C-5mKLpJcW2",
      title: "Team collaboration moments",
      description: "Working together to build something amazing",
      thumbnail: "https://instagram.com/p/C-5mKLpJcW2/media/?size=l",
      url: "https://www.instagram.com/p/C-5mKLpJcW2/",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-6xl mx-auto pt-15 md:pt-45 px-4">
      <div className="text-sm my-5 font-bold uppercase text-red-500 flex items-center gap-2">
        <Sparkles className="h-4 w-4" /> SHOWCASE
      </div>
      <div className="w-full mb-16">
        <div className="text-sm font-bold uppercase text-red-500 flex items-center justify-center gap-2 mb-4">
          <Code className="h-4 w-4" /> FEATURED PROJECTS
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Award-Winning Solutions
        </h3>
        <p className="text-slate-700 max-w-2xl mx-auto mb-8">
          Explore my collection of innovative projects that have won national competitions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {validProjects.map((project) => {
            return <ProjectCard key={project.slug} project={project} />;
          })}
        </div>
      </div>
      <MediaModal featuredMedia={featuredMedia} />
    </div>
  );
}
