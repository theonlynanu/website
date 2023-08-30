"use client";
import { motion, useCycle } from "framer-motion";

// TODO - Better handle props typing for additional reactive animation
const HamLine = (props: any) => (
  <motion.path
    fill="transparent"
    stroke="#000"
    strokeWidth="4"
    strokeLinecap="round"
    {...props}
  />
);

export default function NavToggle() {
  const [isOpen, toggleOpen] = useCycle(true, false);

  return (
    <motion.div
      className="top-2 z-10 mx-auto flex h-16 w-16 shrink-0 cursor-pointer items-center rounded-full bg-standard-primary drop-shadow-lg dark:bg-standard-darkprimary md:ml-8"
      whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: [null, 1.05], transition: { duration: 0.2 } }}
      animate={isOpen ? "open" : "closed"}
      variants={{ open: { scale: 0.8 } }}
    >
      <motion.svg
        width="80"
        height="65"
        onClick={() => toggleOpen()}
        viewBox="0 0 80 65"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <HamLine
          variants={{
            closed: {
              opacity: 1,
              d: "M28 22 L52 22",
            },
            open: {
              opacity: 1,
              d: "M33 40 L47 25",
              strokeWidth: 3,
            },
          }}
          transition={{ duration: 0.6 }}
        />
        <HamLine
          variants={{
            closed: {
              opacity: 1,
              d: "M28 32 L52 32",
            },
            open: {
              opacity: 0,
              x: -20,
            },
          }}
          transition={{ duration: 0.5 }}
        />
        <HamLine
          variants={{
            closed: {
              opacity: 1,
              d: "M28 42 L52 42",
            },
            open: {
              opacity: 1,
              d: "M33 25 L47 40",
              strokeWidth: 3,
            },
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.svg>
    </motion.div>
  );
}
