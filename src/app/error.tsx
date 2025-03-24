"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.error(error);
  }, [error]);

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
          initial={{ scale: 0.8 }}
          animate={{
            scale: [0.8, 1.2, 0.9, 1],
            rotate: [0, -5, 3, 0],
          }}
          transition={{
            duration: 1.5,
            times: [0, 0.3, 0.6, 1],
          }}
          className="text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600"
        >
          Oops!
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
        >
          Something went wrong
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-8 text-lg"
        >
          We&apos;ve encountered an error and our team has been notified.
        </motion.p>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => reset()}
            className="px-6 py-3 mr-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full font-medium inline-block hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="inline-block"
          >
            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-medium inline-block hover:bg-gray-300 transition-all duration-300"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
