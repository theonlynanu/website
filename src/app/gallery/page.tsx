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
}

const galleryItems: galleryItem[] = [
  {
    name: "AI Tic-Tac-Toe",
    href: "/gallery/tictactoe",
    image: "tictactoe.svg",
    darkImage: "tictactoe-dark.svg",
    altText: "Link to my AI Tic Tac Toe game!",
  },
  {
    name: "Pomodoro Timer",
    href: "/gallery/pomodoro",
    image: "/tomato.svg",
    altText: "Link to my Pomodoro Timer",
  },
];

export default function Index() {
  return (
    <div className="">
      <h1 className={`mx-g8 my-4 text-3xl ${montaga.className}`}>Gallery</h1>
      <p className="mx-8 text-sm md:text-base">
        A collection of small tools or projects. If you have any ideas,
        suggestions, or bugs to report, feel free to shoot me a message via my
        contact page!
      </p>
      <div className="flex flex-row flex-wrap justify-center">
        {galleryItems.map((item, index) => {
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
