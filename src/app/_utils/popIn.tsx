"use client";
import React from "react";
import { motion } from "framer-motion";

interface PopInProps extends React.HTMLAttributes<HTMLDivElement> {
  initialX?: number;
  delaySeconds?: number;
  durationSeconds?: number;
}

const PopIn = ({
  className,
  children,
  initialX,
  delaySeconds,
  durationSeconds,
}: PopInProps) => {
  return (
    <motion.div
      className={className}
      initial={{
        x: initialX ? initialX : -10,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        delay: delaySeconds ? delaySeconds : 0.2,
        duration: durationSeconds ? durationSeconds : 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PopIn;
