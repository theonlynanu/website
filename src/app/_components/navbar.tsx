"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsGithub } from "react-icons/bs";
import DarkModeBtn from "./DarkModeBtn";

function Logo() {
  const router = useRouter();
  const isBrowser = () => typeof window !== "undefined";
  return (
    <motion.img
      src="/profile.png"
      className="gap mr-2 flex h-6 w-6 shrink-0 grow-0 cursor-pointer items-center justify-center rounded-full outline outline-2 outline-standard-500 ring-2 ring-standard-400 ring-offset-1 hover:outline-offset-4 hover:ring-offset-2 md:h-8 md:w-8"
      onClick={() => {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        router.push("/", { scroll: false });
      }}
      whileHover={{ scale: 1.1 }}
    />
  );
}

function NavLink({
  href,
  scroll,
  children,
}: {
  href: string;
  children: ReactNode;
  scroll?: boolean;
}) {
  return (
    <Link
      className="rounded-full px-2 py-1 text-sm hover:bg-standard-200 lg:px-3 lg:py-2 lg:text-xl dark:hover:bg-standard-800"
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

  // TODO - once other pages are present, add an animated background to indicate current page in Navbar.
  return (
    <div className="flex justify-center">
      <motion.nav className="fixed top-8 z-50 mx-auto flex flex-row flex-wrap-reverse justify-start gap-1 px-0">
        <motion.nav
          animate={isOpen ? "open" : "closed"}
          initial={{ x: -1500 }}
          variants={variants}
          className="inset-x-0 flex w-[95vw] max-w-[650px] flex-row items-center justify-between justify-self-center overflow-hidden rounded-full bg-standard-300 px-6 py-2 drop-shadow-xl last:justify-self-end min-[736px]:ml-0 dark:bg-standard-700"
        >
          <Logo />
          <NavLink href="/">Home</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <a
            className="text-md rounded-full px-3 py-2 hover:bg-standard-200 lg:text-xl dark:hover:bg-standard-800"
            href="https://github.com/theonlynanu/personal-site"
            target="_blank"
          >
            <BsGithub size={"1.5rem"} />
          </a>
          <DarkModeBtn />
        </motion.nav>
      </motion.nav>
    </div>
  );
}

export default function NavBar() {
  return <FramerNav />;
}
