import { useState } from "react";
import { montaga } from "../../../fonts";
import { Metadata } from "next";
import PDFPreview from "./_components/PDFPreview";

export const metadata: Metadata = {
  title: "pacman",
};

export default function Index() {
  return (
    <div className="">
      <h1 className={`mx-8 my-4 text-3xl ${montaga.className}`}>
        Q-Learning with Pac-Man
      </h1>
      <h3 className="text-md mx-8 my-4">
        An exploration of rudimentary AI techniques
      </h3>

      <div className="text text-l my-8 flex flex-col items-center self-center text-2xl underline">
        UNDER CONSTRUCTION
      </div>
      <div className="mx-24 text-lg">
        This project explored early AI techiques and the constraints associated
        with tabular methods — q-learning in particular. I am currently working
        on implementing an in-browser demo for the q-learning project. In the
        meantime, feel free to download my writeup {""}
        <a
          className="visited:text- my-12 self-baseline text-standard-primary underline visited:text-standard-confirm dark:text-standard-darkprimary dark:visited:text-standard-darkconfirm"
          download={true}
          href="/files/Q-Learning.pdf"
        >
          here
        </a>
        {""} or read it below. You can check out {""}
        <a
          className="visited:text- my-12 self-baseline text-standard-primary underline visited:text-standard-confirm dark:text-standard-darkprimary dark:visited:text-standard-darkconfirm"
          href="https://github.com/theonlynanu/adversarial-pacman"
          target="_blank"
        >
          the repo on Github
        </a>
        {""} if you're interested in running it yourself!
      </div>
      <PDFPreview />
    </div>
  );
}
