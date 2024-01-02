"use client";
import { motion } from "framer-motion";

export default function CircularProgressBar({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  const radius = 140; // Radius of the circle
  const strokeWidth = 15; // Width of the stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the stroke dash offset based on the progress
  const offset = progress * circumference;

  // Interpolate the color based on the progress from green to red
  function interpolateColor(progress: number) {
    const red = Math.min(255, 2 * 255 * progress);
    const green = Math.max(0, 2.5 * 255 * (1 - progress));
    return `rgba(${red}, ${green}, 100, 75%)`;
  }

  return (
    <svg width={320} height={320} className={className}>
      <motion.circle
        cx="160"
        cy="160"
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        whileHover={{ scale: 1.02 }}
        stroke={interpolateColor(progress)}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
}
