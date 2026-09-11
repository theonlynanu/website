"use client";

import { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

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
      {previewVisible && (
        <iframe
          className="mx-12 h-screen w-5/6 p-8"
          src="/files/Q-Learning.pdf"
          loading="lazy"
        />
      )}
    </>
  );
}
