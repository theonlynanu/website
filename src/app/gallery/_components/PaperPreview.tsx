"use client";

import { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

export default function PaperPreview({
  src,
  label = "PDF Preview",
}: {
  src: string;
  label?: string;
}) {
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setPreviewVisible(!previewVisible)}
        className="mx-12 mt-8 mb-4 flex flex-row gap-2 text-xl font-bold"
      >
        {label}
        {previewVisible ? (
          <IoIosArrowDropupCircle className="h-6 self-center" />
        ) : (
          <IoIosArrowDropdownCircle className="h-6 self-center" />
        )}
      </button>
      {previewVisible && (
        <iframe className="mx-12 h-screen w-5/6 p-8" src={src} loading="lazy" />
      )}
    </>
  );
}
