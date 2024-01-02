"use client";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import useWindowDimensions from "@/app/_utils/useWindowDimension";
import { useEffect, useState } from "react";

export default function GalleryCard({
  name,
  href,
  image,
  darkImage,
  altText,
}: {
  name: string;
  href: LinkProps["href"];
  image: ImageProps["src"];
  darkImage?: ImageProps["src"];
  altText?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const currentTheme = theme === "system" ? systemTheme : theme;
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const cardVariant = {
    hovered: {
      boxShadow: "4px 4px 8px #121212",
      scale: 1.05,
    },
    noHover: {
      scale: 1,
    },
    clicked: {
      scale: 0.95,
      boxShadow: "",
    },
  };

  const iconVariant = {
    hovered: {
      scale: 1.1,
    },
    noHover: {
      scale: 1,
    },
    clicked: {
      scale: 0.9,
    },
  };

  return (
    <motion.div
      className="mx-8 my-8 h-56 w-48 min-w-36 max-w-60 rounded-lg border-2 border-standard-800 bg-standard-300 p-4 sm:h-72 sm:w-52 dark:border-standard-300 dark:bg-standard-700"
      variants={cardVariant}
      whileHover="hovered"
      whileTap="clicked"
    >
      <Link href={href}>
        <h1 className="mt-6 text-center text-2xl font-bold sm:text-3xl">
          {name}
        </h1>
        <motion.div
          variants={iconVariant}
          className="mx-auto w-fit rounded-2xl"
        >
          <Image
            className="mx-auto h-28 w-28  p-6 align-middle md:h-36 md:w-36"
            src={
              currentTheme === "light" ? image : darkImage ? darkImage : image
            }
            alt={altText ? altText : `Link to ${name}`}
            // style={{ width: "100%", height: "auto" }}
            width={width ? width / 3 : 150}
            height={width ? width / 3 : 150}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
