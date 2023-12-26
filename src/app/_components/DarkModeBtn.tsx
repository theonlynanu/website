"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { FiMoon } from "react-icons/fi";
import { CgSun } from "react-icons/cg";

const DarkModeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isThemeLight = currentTheme == "light";
  const toggleSwitch = () => {
    isThemeLight ? setTheme("dark") : setTheme("light");
  };

  const switchVariants: any = {
    rest: {
      scale: 1,
      x: 1,
    },
    hover: {
      scale: [null, 1.1],
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.8,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className={clsx(
        "flex h-7 w-12 cursor-pointer items-center rounded-full p-1 md:h-10 md:w-16 md:p-2",
        !isThemeLight
          ? "justify-end bg-standard-400"
          : "justify-start bg-standard-200"
      )}
      onClick={toggleSwitch}
      whileHover="hover"
      whileTap="tap"
      animate="rest"
    >
      <motion.div
        className={clsx(
          "h-4 w-4 rounded-full md:h-6 md:w-6",
          isThemeLight ? "bg-standard-900" : "bg-standard-100"
        )}
        layout
        transition={spring}
        variants={switchVariants}
      >
        {isThemeLight ? (
          <FiMoon className="z-10 mx-auto mt-1 h-2 w-2 text-standard-500 md:h-4 md:w-4" />
        ) : (
          <CgSun className="z-10 mx-auto mt-1 h-2 w-2 text-standard-500 md:h-4 md:w-4" />
        )}
      </motion.div>
    </motion.div>
  );
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default DarkModeBtn;
