export type FeaturedMediaItem = {
  id: string;
  type: "youtube" | "instagram";
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
  url?: string;
};

export const featuredMedia: FeaturedMediaItem[] = [
  {
    type: "youtube",
    id: "MaQYp0FzlTA",
    title: "EMANG BOLEH SE-STRESS ITU - FIKSI Journey Ep.1",
    description: "FIKSI Gold Medal winning project walkthrough",
    thumbnail: "https://img.youtube.com/vi/MaQYp0FzlTA/maxresdefault.jpg",
    duration: "25:45",
  },
  {
    type: "youtube",
    id: "zsUvD1aUIYA",
    title: "Hari Penentuan! Presentasi dan Pitching Besar - FIKSI Journey Ep.2",
    description: "FIKSI Gold Medal winning project walkthrough",
    thumbnail: "https://img.youtube.com/vi/zsUvD1aUIYA/maxresdefault.jpg",
    duration: "25:45",
  },
  {
    type: "youtube",
    id: "S_qlN3FuEBU",
    title: "Goodbye FIKSI - Hari Terakhir dan Awarding - FIKSI Journey Ep.3",
    description: "FIKSI Gold Medal winning project walkthrough",
    thumbnail: "https://img.youtube.com/vi/S_qlN3FuEBU/maxresdefault.jpg",
    duration: "25:45",
  },
  {
    type: "youtube",
    id: "2_L7G9CkxbI",
    title: "SSHP 2025 Vlog - Menuju Jepang Episode 1",
    description: "Rangkuman persiapan dan perjalanan menuju Jepang",
    thumbnail: "https://img.youtube.com/vi/2_L7G9CkxbI/maxresdefault.jpg",
    duration: "37:39",
  },
  {
    type: "youtube",
    id: "VZ6cdAKklrI",
    title: "SSHP 2025 Vlog - Hari-H Belajar Episode 2",
    description: "Kegiatan belajar dan adaptasi di Jepang",
    thumbnail: "https://img.youtube.com/vi/VZ6cdAKklrI/maxresdefault.jpg",
    duration: "20:04",
  },
  {
    type: "youtube",
    id: "q8Y1MoMjZRw",
    title: "Recap Back To School 2023",
    description: "Event recap and highlights",
    thumbnail: "https://img.youtube.com/vi/q8Y1MoMjZRw/maxresdefault.jpg",
    duration: "15:22",
  },
];

export const perspectiveVideos = featuredMedia.slice(0, 4);
