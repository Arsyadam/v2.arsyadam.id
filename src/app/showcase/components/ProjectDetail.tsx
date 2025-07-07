"use client";

import Image from "next/image";
import Link from "next/link";
import { Showcase } from "../../types/index";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, Calendar, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

interface ProjectDetailProps {
  project: Showcase;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-10 ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/showcase"
            className="inline-flex items-center text-red-500 hover:text-red-700 transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Projects
          </Link>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-6"
            style={{ transform: `translateY(${scrollPosition * 0.1}px)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
            <Image
              src={project.gif}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{project.date}</span>
            </div>
            {project.technologies && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span>{project.technologies.length} Technologies</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-xl text-slate-700 mb-4">{project.description}</p>

          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <div className="flex gap-4 mb-8">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-4 w-4" /> View Code
              </motion.a>
            )}

            {project.url && (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </motion.a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none prose-headings:text-red-900 prose-a:text-red-600 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          data-color-mode="light"
        >
          <MDEditor.Markdown
            source={project.content}
            style={{
              backgroundColor: "white",
              color: "#333",
              fontFamily: "Poppins, sans-serif",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
