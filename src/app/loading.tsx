"use client";
import { Transition, motion } from "framer-motion";

export default function Loading() {
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dot = {
    initial: {
      y: "0%",
    },
    show: { y: "100%" },
  };

  const dotTransition: Transition = {
    repeat: Infinity,
    repeatType: "reverse",
  };

  return (
    <div>
      <motion.div
        className="mx-auto my-auto flex h-32 flex-row justify-center gap-2"
        initial="hidden"
        variants={container}
        animate="show"
      >
        <motion.span
          variants={dot}
          className="block h-8 w-8 rounded-full bg-standard-900 dark:bg-standard-100"
          transition={dotTransition}
        />
        <motion.span
          variants={dot}
          className="block h-8 w-8 rounded-full bg-standard-900 dark:bg-standard-100"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.span
          variants={dot}
          className="block h-8 w-8 rounded-full bg-standard-900 dark:bg-standard-100"
          transition={dotTransition}
        />
      </motion.div>
    </div>
  );
}
