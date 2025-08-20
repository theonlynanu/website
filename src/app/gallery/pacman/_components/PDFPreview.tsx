"use client";

import { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

import clsx from "clsx";

export default function Preview() {
  const [previewVisible, setPreviewVisible] = useState(false);
  return (
    <>
      <button
        onClick={() => setPreviewVisible(!previewVisible)}
        className="mx-12 mb-4 mt-12 flex flex-row gap-2 text-xl font-bold"
      >
        PDF Preview
        {previewVisible ? (
          <IoIosArrowDropupCircle className="h-6 self-center" />
        ) : (
          <IoIosArrowDropdownCircle className="h-6 self-center" />
        )}
      </button>
      <iframe
        className={clsx(
          "mx-12 h-screen w-5/6 p-8",
          previewVisible ? "visible" : "hidden"
        )}
        src="/files/Q-Learning.pdf"
      />
    </>
  );
}
