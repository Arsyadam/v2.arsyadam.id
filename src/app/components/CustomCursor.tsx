"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    const cursorDot = document.createElement("div");

    cursor.className = "custom-cursor";
    cursorDot.className = "custom-cursor-dot";

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      cursor.classList.add("hover");
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("hover");
    };

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    document.addEventListener("mousemove", handleMouseMove);

    // Smooth cursor animation
    const animate = () => {
      // Smooth follow for main cursor
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Faster follow for dot
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      cursor.remove();
      cursorDot.remove();
    };
  }, []);

  return null;
}
