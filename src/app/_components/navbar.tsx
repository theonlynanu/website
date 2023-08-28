"use client";
import { motion } from "framer-motion";
import { ReactNode } from "@mdx-js/react/lib";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsGithub } from "react-icons/bs";
import DarkModeBtn from "./DarkModeBtn";
import NavToggle from "./NavToggle";

function Logo() {
  const router = useRouter();
  const isBrowser = () => typeof window !== "undefined";
  return (
    <motion.img
      src="/profile.png"
      className="gap flex h-8 w-8 shrink-0 grow-0 cursor-pointer items-center justify-center rounded-full outline outline-2 outline-standard-500 ring-2 ring-standard-400 ring-offset-1 hover:outline-offset-4 hover:ring-offset-2"
      onClick={() => {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        router.push("/", { scroll: false });
      }}
      whileHover={{ scale: 1.1 }}
    />
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="text-md rounded-full px-3 py-2 hover:bg-standard-200 dark:hover:bg-standard-800 lg:text-xl"
      href={href}
    >
      {children}
    </Link>
  );
}

function FramerNav() {
  const [isOpen, setIsOpen] = useState(true);
  const isBrowser = () => typeof window !== "undefined";

  // TODO - Implement null keyframing to reduce lag if the menu toggle is rapidly triggered-
  // TODO - for some reason, using keyframes in variants is throwing a type error and not properly
  // TODO - keying out the animation. Not sure if bug or misunderstanding on my part.
  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    closed: {
      x: -1500,
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.6,
      },
    },
  };

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  // TODO - once other pages are present, add an animated background to indicate current page in Navbar.
  return (
    <motion.nav className="fixed inset-x-0 top-8 mx-2 flex flex-row flex-wrap-reverse justify-start gap-1 px-0 z-50">
      <NavToggle toggleHandler={handleToggle} />
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        initial={{ x: -1500 }}
        variants={variants}
        className="inset-x-0 mx-auto flex w-[95vw] max-w-[650px] flex-row items-center justify-between justify-self-center rounded-full bg-standard-300 px-6 py-2 drop-shadow-xl last:justify-self-end dark:bg-standard-700 min-[736px]:ml-0"
      >
        <Logo />
        <Link
          className="text-md rounded-full px-3 py-2 hover:bg-standard-200 dark:hover:bg-standard-800 lg:text-xl"
          href="/"
          scroll={false}
          onClick={() => {
            if (!isBrowser()) return;
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Home
        </Link>
        <NavLink href="#about">About</NavLink>
        <a
          className="text-md rounded-full px-3 py-2 hover:bg-standard-200 dark:hover:bg-standard-800 lg:text-xl"
          href="https://github.com/theonlynanu/personal-site"
          target="_blank"
        >
          <BsGithub size={"1.5rem"} />
        </a>
        <DarkModeBtn />
      </motion.nav>
    </motion.nav>
  );
}

export default function NavBar() {
  return <FramerNav />;
}
