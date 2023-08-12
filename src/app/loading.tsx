"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div>
      <motion.div>
        <motion.span className="w-8 h-8 block rounded-full bg-standard-900 dark:bg-standard-100" />
      </motion.div>
    </div>
  );
}
