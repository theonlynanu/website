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
        className="flex flex-row gap-2 h-32 mx-auto justify-center my-auto"
        initial="hidden"
        variants={container}
        animate="show"
      >
        <motion.span
          variants={dot}
          className="w-8 h-8 block rounded-full bg-standard-900 dark:bg-standard-100"
          transition={dotTransition}
        />
        <motion.span
          variants={dot}
          className="w-8 h-8 block rounded-full bg-standard-900 dark:bg-standard-100"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.span
          variants={dot}
          className="w-8 h-8 block rounded-full bg-standard-900 dark:bg-standard-100"
          transition={dotTransition}
        />
      </motion.div>
    </div>
  );
}
