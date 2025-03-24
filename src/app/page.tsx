import Image from "next/image";
import Education from "./components/education";
import Achievement from "./components/achievement";
import Experience from "./components/experience";
import {
  BrainCircuit,
  BarChart3,
  Code2,
  Terminal,
  Network,
  Cpu,
  LayoutTemplate,
} from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="relative text-center justify-center px-0 md:px-6 mt-0 md:mt-4">
        <div className="relative z-10">
          {/* Redesigned About Section */}
          <div className="px-8 md:px-8 py-8 md:py-12 rounded-none md:rounded-4xl max-w-6xl mx-auto border border-red-400 bg-white shadow-sm relative overflow-hidden ">
            {/* Enhanced stronger gradient blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-red-100/80 rounded-full blur-3xl"></div>
            <div className="absolute -top-20 left-1/4 w-56 h-56 bg-red-200/60 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-200/70 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-red-300/50 rounded-full blur-2xl"></div>
            <div className="absolute top-1/4 -right-10 w-52 h-52 bg-red-100/80 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 right-1/3 w-48 h-48 bg-red-200/60 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/5 w-32 h-32 bg-red-300/40 rounded-full blur-xl"></div>

            {/* Content with higher z-index to appear above the gradient */}
            <div className="relative z-10 md:pt-30 pt-15">
              <div className=" justify-center items-center pb-3">
                <div className="">
                  <h1 className="text-3xl sm:text-5xl font-semibold">
                    From lesson i grow,
                  </h1>
                  <h1 className="text-3xl sm:text-5xl pt-4 font-semibold">
                    Through innovation, we glow
                  </h1>
                </div>

                {/* Skills Section */}
                <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
                  <div className="text-sm sm:text-base font-medium mb-3">
                    My Technical Skills
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                    <div className="flex text-start items-center rounded-xl  text-xs sm:text-sm font-medium bg-white p-1 m-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-red-500/30 flex items-center justify-center">
                        <BrainCircuit className="w-5 h-5 text-red-500" />
                      </div>
                      <span className="ml-2 px-3 py-1 text-gray-800">
                        AI & Machine Learning
                      </span>
                    </div>

                    <div className="flex items-center rounded-xl text-start text-xs sm:text-sm font-medium bg-white p-1 m-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-500/30 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="ml-2 px-3 py-1 text-gray-800">
                        IoT Development
                      </span>
                    </div>

                    <div className="flex items-center rounded-xl text-start text-xs sm:text-sm font-medium bg-white p-1 m-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-500/30 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="ml-2 px-3 py-1 text-gray-800">
                        Data Analytics
                      </span>
                    </div>

                    <div className="flex items-center rounded-xl text-start text-xs sm:text-sm font-medium bg-white p-1 m-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-yellow-500/30 flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-yellow-500" />
                      </div>
                      <span className="ml-2 px-3 py-1 text-gray-800">
                        Web Development
                      </span>
                    </div>

                    <div className="flex items-center rounded-xl text-start text-xs sm:text-sm font-medium bg-white p-1 m-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-purple-500/30 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-purple-500" />
                      </div>
                      <span className="ml-2 px-3 py-1 text-gray-800">
                        Python
                      </span>
                    </div>

                    <div className="flex items-center rounded-xl text-start text-xs sm:text-sm font-medium bg-white p-1 m-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-orange-500/30 flex items-center justify-center">
                        <Network className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="ml-2 px-3 py-1 text-gray-800">
                        TensorFlow
                      </span>
                    </div>

                    <div className="flex items-center rounded-xl text-start text-xs sm:text-sm font-medium bg-white p-1 m-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-teal-500/30 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-teal-500" />
                      </div>
                      <span className="ml-2 px-3 py-1 text-gray-800">
                        Arduino
                      </span>
                    </div>

                    <div className="flex items-center rounded-xl text-start text-xs sm:text-sm font-medium bg-white p-1 m-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-indigo-500/30 flex items-center justify-center">
                        <LayoutTemplate className="w-5 h-5 text-indigo-500" />
                      </div>
                      <span className="ml-2 px-3 py-1 text-gray-800">
                        React/Next.js
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="mt-4 text-lg sm:text-xl md:text-2xl font-medium text-[#FF263E]">
                AI & IoT Developer | Sustainability Advocate
              </div>

              {/* Bio */}
              <div className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base text-center">
                Based in Malang, Indonesia, I develop digital solutions that
                merge AI, IoT, and data analytics to tackle real-world
                challenges. A self-taught innovator with a background in
                computer science from SMK Telkom Malang, I&apos;m passionate
                about creating technology that drives meaningful impact and
                social change.
              </div>

              {/* Approach */}
              <div className="mt-6 sm:mt-8 flex flex-col md:flex-row justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 flex-1 border border-red-100 shadow-sm">
                  <div className="text-lg font-medium text-[#FF263E] mb-2">
                    Innovation
                  </div>
                  <p className="text-sm text-gray-600">
                    Leveraging emerging technologies to create novel solutions
                    for complex problems
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 flex-1 border border-red-100 shadow-sm">
                  <div className="text-lg font-medium text-[#FF263E] mb-2">
                    Collaboration
                  </div>
                  <p className="text-sm text-gray-600">
                    Working across disciplines to develop comprehensive and
                    effective approaches
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 flex-1 border border-red-100 shadow-sm">
                  <div className="text-lg font-medium text-[#FF263E] mb-2">
                    Impact
                  </div>
                  <p className="text-sm text-gray-600">
                    Focusing on results that drive positive change in industries
                    and communities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="education"
        className="container mx-auto max-w-6xl mt-12 sm:mt-20 px-4"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center">
              <Education />
              <div className="pl-3">
                <h3 className="font-semibold text-[#FF263E]">Latest</h3>
                <h1 className="text-2xl sm:text-3xl font-bold">Education</h1>
              </div>
            </div>
            <ol className="relative border-l-3 ml-8 border-gray-200 ">
              <li className="mb-10 ml-8 pt-4">
                <div className="absolute w-5 h-5 bg-white rounded-full mt-1.5 -left-2.5 border-3 border-slate-300 "></div>
                <div className="pb-3">
                  <span className="text-gray-400 ">2023 - Present</span>
                  <h3 className="font-medium text-2xl">SMK Telkom Malang</h3>
                  <span className="text-gray-400">Software Engineering</span>
                </div>
                <Link
                  href="https://smktelkom-mlg.sch.id"
                  className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-red-50 text-red-600 hover:bg-red-200 hover:text-red-700 focus:ring-red-500"
                >
                  Learn more
                  <span className="sr-only">, utility-first fundamentals</span>
                  <svg
                    className="overflow-visible ml-3 text-red-300 group-hover:text-red-400"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </Link>
              </li>
              <li className="mb-10 ml-8 pt-6">
                <div className="absolute w-5 h-5 bg-white rounded-full mt-1.5 -left-2.5 border-3 border-slate-300 "></div>
                <div className="pb-3">
                  <span className="text-gray-400 ">2022 - 2023</span>
                  <h3 className="font-medium text-2xl">
                    Algoritma Data Science School
                  </h3>
                  <span className="text-gray-400">
                    Data Visualization, Machine Learning
                  </span>
                </div>
                <Link
                  href="https://algorit.ma"
                  className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-red-50 text-red-600 hover:bg-red-200 hover:text-red-700 focus:ring-red-500"
                >
                  Learn more
                  <span className="sr-only">, utility-first fundamentals</span>
                  <svg
                    className="overflow-visible ml-3 text-red-300 group-hover:text-red-400"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </Link>
              </li>
            </ol>

            <span className="text-slate-400 text-sm sm:text-base">
              Chosen to master AI, machine learning, and analytics, aiming to
              develop innovative tech solutions, drive data-driven
              decision-making, and create real-world impact.
            </span>
          </div>

          <div className="hidden md:block flex-shrink-0 mt-6 lg:mt-0">
            <Image
              src="/img/education.png"
              alt="Education image"
              width={400}
              height={200}
              className="object-contain w-full max-w-[300px] lg:max-w-[600px]"
            />
          </div>
        </div>
      </div>
      <div
        id="experience"
        className="container mx-auto max-w-6xl mt-12 sm:mt-20 px-4"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="w-full lg:w-1/2">
            <Experience />
            <div className="pt-3">
              <h3 className="font-semibold text-[#FF263E]">Learning by</h3>
              <h1 className="text-2xl sm:text-3xl font-bold">Experience</h1>
              <div className="text-slate-400 text-sm sm:text-base max-w-xl">
                Chosen to master AI, machine learning, and analytics, aiming to
                develop innovative tech solutions, drive data-driven
                decision-making, and create real-world impact.
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <div className="flex flex-col md:flex-row gap-3">
              <ol className="order-2 md:order-1 text-left md:text-right md:mr-3 w-full">
                <li className="mb-6 md:mb-10 md:h-24">
                  <div className="w-full md:w-96">
                    <h3 className="font-medium text-xl sm:text-2xl">
                      General Manager of Metic Merch
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm max-w-xl mt-1">
                      overseeing production, sales, and strategy to drive
                      revenue and quality.
                    </p>
                  </div>
                </li>
              </ol>

              <ol className="order-1 md:order-2 relative border-l-3 border-gray-200">
                <li className="mb-6 md:mb-10 ml-8 pt-4 md:h-24">
                  <div className="absolute w-5 h-5 bg-white rounded-full mt-1.5 -left-2.5 border-3 border-slate-300"></div>
                  <div className="pb-3">
                    <div className="text-gray-400 w-full md:w-30">
                      2024 - Present
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div
        id="achievement"
        className="container mx-auto max-w-6xl mt-12 sm:mt-20 px-4 pb-12"
      >
        <div className="flex flex-col items-start">
          <div className="w-full">
            <div className="flex items-center">
              <Achievement />
              <div className="pl-3">
                <h3 className="font-semibold text-[#F4BF50]">Latest</h3>
                <h1 className="text-2xl sm:text-3xl font-bold">Achievement</h1>
              </div>
            </div>
            <div className="text-slate-400 text-sm sm:text-base max-w-3xl pt-3">
              This journey of achievement has building me a strong of critical
              thinking, how to innovate and problem solving, i learn a lot not
              only technical things, but also the aspect of hummanities,
              communication and team work
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  organization: "Puspresnas",
                  title: "1st Gold Medal - FIKSI Teknologi Digital",
                  subtitle:
                    "National innovation competition focused on creating digital technology solutions for real-world problems.",
                  certificateLink:
                    "https://drive.google.com/file/d/1-0JLawWPEafudhWz18h5sNnVAPLSDYjG/view?usp=drive_link",
                },
                {
                  organization: "Mage ITS",
                  title: "1st Place - IoT Competition",
                  subtitle:
                    "Technology and engineering competition by ITS, focusing on developing IoT-based industrial solutions.",
                  certificateLink:
                    "https://drive.google.com/file/d/1-qLxDfabJoLoemI_TE52bMLhmEImWm62/view?usp=drive_link",
                },
                {
                  organization: "BSN",
                  title:
                    "1st Runner Up - Kompetisi Standardisasi Nasional (KSN)",
                  subtitle:
                    "National competition by Indonesia’s Standardization Agency, promoting innovation aligned with industry standards.",
                  certificateLink:
                    "https://drive.google.com/file/d/1phQxQ5REzsWvjTPXxqKn7_4DtSJt28U8/view?usp=drive_link",
                },
                {
                  organization: "Kemenkeu",
                  title: "3rd Place - Visual Data Competition",
                  subtitle:
                    "Data visualization competition by the Indonesian Ministry of Finance, tackling social issues like climate change.",
                  certificateLink:
                    "https://drive.google.com/file/d/1-QjYElyXZDDp7-fdP5A48xFvvdFuBRmq/view?usp=drive_link",
                },
                {
                  organization: "Sampoerna Academy",
                  title: "3rd Place - STEAM Competition",
                  subtitle:
                    "Multidisciplinary competition combining Science, Technology, Engineering, Arts, and Mathematics for innovative solutions.",
                  certificateLink:
                    "https://drive.google.com/file/d/104Gj8-95XiGqGmJyTKsojSqsNpPlYmyu/view?usp=drive_link",
                },
                {
                  organization: "Junior Achievement",
                  title:
                    "Top 10 Finalist - FedEx International Trade Challenge",
                  subtitle:
                    "Global competition promoting innovative international trade strategies among young entrepreneurs.",
                  certificateLink:
                    "https://drive.google.com/file/d/10EbarSaYREOMJQr10LEBPBMI879GvamG/view?usp=drive_link",
                },
                {
                  organization: "Samsung",
                  title: "Semifinalist - Solve for Tomorrow (SFT)",
                  subtitle:
                    "Samsung’s global competition empowering students to solve community challenges using STEM innovation.",
                  certificateLink: "#",
                },
                {
                  organization: "Puspresnas & Dinas Pendidikan Kota Malang",
                  title: "2nd Place - LKS Artificial Intelligence",
                  subtitle:
                    "National vocational school AI competition testing machine learning, computer vision, and problem-solving skills.",
                  certificateLink: "#",
                },
              ].map((achievement, index) => (
                <div key={index} className="flex mt-4 sm:mt-6">
                  <div className="pt-3 sm:pt-6 flex-shrink-0">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0251 19.2151C12.3595 19.2151 13.4938 18.7481 14.4278 17.814C15.3619 16.8799 15.8289 15.7457 15.8289 14.4113C15.8289 13.0769 15.3619 11.9427 14.4278 11.0086C13.4938 10.0746 12.3595 9.60754 11.0251 9.60754C9.69077 9.60754 8.55654 10.0746 7.62248 11.0086C6.68841 11.9427 6.22137 13.0769 6.22137 14.4113C6.22137 15.7457 6.68841 16.8799 7.62248 17.814C8.55654 18.7481 9.69077 19.2151 11.0251 19.2151ZM7.9027 8.21979C8.25853 8.02408 8.63661 7.8684 9.03692 7.75276C9.43723 7.63711 9.842 7.56149 10.2512 7.52591L7.55576 2.13501H4.88699L7.9027 8.21979ZM14.1476 8.21979L17.19 2.13501H14.4945L12.2261 6.67191L12.7332 7.68604C12.9822 7.7572 13.2224 7.83282 13.4537 7.91288C13.685 7.99294 13.9163 8.09525 14.1476 8.21979ZM5.04712 17.9341C4.74466 17.4181 4.50892 16.8621 4.3399 16.2661C4.17088 15.6701 4.08637 15.0518 4.08637 14.4113C4.08637 13.7708 4.17088 13.1526 4.3399 12.5565C4.50892 11.9605 4.74466 11.4045 5.04712 10.8886C4.29987 11.1376 3.68605 11.578 3.20567 12.2096C2.7253 12.8412 2.48511 13.5751 2.48511 14.4113C2.48511 15.2475 2.7253 15.9814 3.20567 16.613C3.68605 17.2447 4.29987 17.685 5.04712 17.9341ZM17.0032 17.9341C17.7504 17.685 18.3642 17.2447 18.8446 16.613C19.325 15.9814 19.5652 15.2475 19.5652 14.4113C19.5652 13.5751 19.325 12.8412 18.8446 12.2096C18.3642 11.578 17.7504 11.1376 17.0032 10.8886C17.3056 11.4045 17.5414 11.9605 17.7104 12.5565C17.8794 13.1526 17.9639 13.7708 17.9639 14.4113C17.9639 15.0518 17.8794 15.6701 17.7104 16.2661C17.5414 16.8621 17.3056 17.4181 17.0032 17.9341ZM11.0251 21.3501C10.3135 21.3501 9.63294 21.2478 8.98355 21.0432C8.33415 20.8386 7.73367 20.5584 7.18213 20.2025C7.022 20.2381 6.86188 20.2604 6.70175 20.2693C6.54163 20.2781 6.3726 20.2826 6.19469 20.2826C4.57564 20.2826 3.19678 19.7133 2.05811 18.5746C0.919434 17.4359 0.350098 16.0571 0.350098 14.438C0.350098 12.8901 0.866058 11.5646 1.89798 10.4615C2.9299 9.35846 4.20201 8.74465 5.71431 8.6201L1.4176 0H8.89014L11.0251 4.27002L13.1602 0H20.6327L16.3627 8.56673C17.875 8.70906 19.1426 9.33177 20.1657 10.4349C21.1887 11.538 21.7002 12.8634 21.7002 14.4113C21.7002 16.0482 21.1309 17.4359 19.9922 18.5746C18.8535 19.7133 17.4658 20.2826 15.8289 20.2826C15.6688 20.2826 15.5042 20.2781 15.3352 20.2693C15.1662 20.2604 15.0016 20.2381 14.8415 20.2025C14.2899 20.5584 13.6939 20.8386 13.0534 21.0432C12.4129 21.2478 11.7368 21.3501 11.0251 21.3501ZM9.05026 17.347L9.79752 14.9184L7.82263 13.5039H10.2512L11.0251 10.9419L11.7991 13.5039H14.2277L12.2528 14.9184L13 17.347L11.0251 15.8524L9.05026 17.347Z"
                        fill="#FACC15"
                      />
                    </svg>
                  </div>
                  <div className="pl-3 w-full max-w-xs sm:max-w-md">
                    <div className="text-xs sm:text-sm text-slate-400">
                      {achievement.organization}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium">
                      {achievement.title}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {achievement.subtitle}
                    </div>
                    <Link
                      href={achievement.certificateLink}
                      className="text-base sm:text-lg hover:text-black text-[#F4BF50] underline pt-2 sm:pt-3 inline-block"
                    >
                      see certificate
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
