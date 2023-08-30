import { BallCanvas, FallbackCanvas } from "./BallCanvas";
import { Suspense } from "react";
import { technologies } from "../constants/technologies";
import PopIn from "@/app/_utils/popIn";
import Loading from "@/app/loading";

export default function TechBalls() {
  return (
    <div className="flex flex-row flex-wrap flex-shrink justify-center gap-4 mx-auto max-w-[90vw] z-0">
      {technologies.map((technology) => (
        <PopIn className="w-20 h-20 xl:w-28 xl:h-28 mb-4" key={technology.name}>
          <Suspense fallback={null}>
            <BallCanvas icon={technology.icon} />
          </Suspense>
        </PopIn>
      ))}
    </div>
  );
}
