"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="md:mt-20 mt-15 min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-100 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="text-9xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600"
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-8 text-lg"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full font-medium inline-block hover:shadow-lg transition-all duration-300"
            >
              Return Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-gray-600"
          >
            <p>Lost? Try one of these links:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {["About", "Projects", "Contact"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 border border-red-200 rounded-md hover:bg-red-50 cursor-pointer text-red-700"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
