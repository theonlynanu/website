"use client";
import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type PopInProps = HTMLMotionProps<"div"> & {
  initialX?: number;
  delaySeconds?: number;
  durationSeconds?: number;
  once?: boolean;
}

const PopIn = ({
  className,
  children,
  initialX,
  delaySeconds,
  durationSeconds,
  once=true,
  style,
  ...rest
}: PopInProps) => {
  const reduceMotion = useReducedMotion();

  const x0 = initialX ?? -10;
  const delay = delaySeconds ?? 0.2;
  const duration = durationSeconds ?? 0.5


  return (
    <motion.div
      className={className + " transform-gpu"}
      style={{backfaceVisibility: "hidden", ...(style ?? {})}}
      initial={reduceMotion ? false : {x: x0, opacity: 0}}
      whileInView={ reduceMotion ? undefined : {
        x: 0,
        opacity: 1,
      }}
      transition={reduceMotion ? undefined : {
        type: "tween",
        delay,
        duration
      }}
      viewport={reduceMotion ? undefined : {once, amount: 0.2}}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default PopIn;
