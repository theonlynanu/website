import { Metadata } from "next";
import GalleryCard from "./_components/GalleryCard";
import { LinkProps } from "next/link";
import { ImageProps } from "next/image";
import PopIn from "../_utils/popIn";
import { montaga } from "../../fonts";

export const metadata: Metadata = {
  title: "Gallery",
};

interface galleryItem {
  name: string;
  href: LinkProps["href"];
  image: ImageProps["src"];
  darkImage?: ImageProps["src"];
  altText?: string;
  category: "research" | "tool";
}

const galleryItems: galleryItem[] = [
  {
    name: "Galaxy Morphology",
    href: "/gallery/galaxy-research",
    image: "galaxy.svg",
    darkImage: "galaxy-dark.svg",
    altText: "Link to my galaxy morphology research",
    category: "research",
  },
  {
    name: "AI Tic-Tac-Toe",
    href: "/gallery/tictactoe",
    image: "tictactoe.svg",
    darkImage: "tictactoe-dark.svg",
    altText: "Link to my AI Tic Tac Toe game!",
    category: "tool",
  },
  {
    name: "Pomodoro Timer",
    href: "/gallery/pomodoro",
    image: "/tomato.svg",
    altText: "Link to my Pomodoro Timer",
    category: "tool",
  },
  {
    name: "Q-Learning Pac-Man",
    href: "/gallery/pacman",
    image: "/pacman.svg",
    altText: "Link to my Pac-Man project using q-learning!",
    category: "research",
  },
];

export default function Index() {
  const researchItems = galleryItems.filter((i) => i.category === "research");
  const toolItems = galleryItems.filter((i) => i.category === "tool");

  return (
    <div className="">
      <h1 className={`mx-8 my-4 text-3xl ${montaga.className}`}>Gallery</h1>
      <p className="mx-8 text-sm md:text-base">
        A collection of research, tools, and small projects. If you have any
        ideas, suggestions, or bugs to report, feel free to shoot me a message
        via my contact page!
      </p>

      <h2 className={`mx-16 mt-10 mb-2 text-2xl ${montaga.className}`}>
        Research
      </h2>

      <div className="flex flex-row flex-wrap justify-center">
        {researchItems.map((item, index) => {
          return (
            <PopIn key={`pop-in-${index}`}>
              <GalleryCard
                key={`gallery-card-${index}`}
                name={item.name}
                href={item.href}
                image={item.image}
                darkImage={item.darkImage}
                altText={item.altText}
              />
            </PopIn>
          );
        })}
      </div>

      <h2 className={`mx-16 mt-6 mb-2 text-2xl ${montaga.className}`}>
        Tools &amp; Projects
      </h2>
      <div className="flex flex-row flex-wrap justify-center">
        {toolItems.map((item, index) => {
          return (
            <PopIn key={`pop-in-${index}`}>
              <GalleryCard
                key={`gallery-card-${index}`}
                name={item.name}
                href={item.href}
                image={item.image}
                darkImage={item.darkImage}
                altText={item.altText}
              />
            </PopIn>
          );
        })}
      </div>
    </div>
  );
}
