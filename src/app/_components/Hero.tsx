"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import useWindowDimensions from "../_utils/useWindowDimension";
import Cube from "./Cube";
import Loop from "./Loop";
import Cone from "./Cone";
import Stars from "./Stars";
import { TypeAnimation } from "react-type-animation";
import Eyeball from "./Eyeball";
import { montaga } from "../../fonts";

export default function Hero() {
  const { width, height } = useWindowDimensions();

  return (
    <div className="h-[80vh] relative bg-standard-100 dark:bg-standard-900">
      <Suspense fallback={null}>
        <Canvas
          className=" h-96 p-0"
          camera={{ position: [0, 0, 10], zoom: 50 }}
          orthographic
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 2, 6]} />
          <Cube
            position={[
              width ? -(width / 80) : -15,
              height ? -(height / 1500) : -8,
              -5,
            ]}
          />
          <Loop
            position={[width ? width / 200 : 2, height ? height / 5000 : -1, 0]}
            scale={1}
          />
          <Cone
            position={[
              width ? -width / 200 : -2,
              height ? height / 400 : 4,
              -8,
            ]}
            scale={width ? Math.max(width / 1250, 0.8) : 1.4}
          />
          <Stars />
          <Eyeball
            position={[
              width ? -width / 500 : -1.5,
              height ? -height / 200 : -3.7,
              0,
            ]}
          />
        </Canvas>
      </Suspense>
      <span className="block mx-auto my-auto absolute top-0 left-0 right-0 w-1/2 text-center rounded-xl">
        <div
          className={`[text-shadow:_0_0px_2px_var(--tw-shadow-color)] text-6xl w-full m-8 text-center mx-auto text-standard-900 dark:text-standard-100 dark:shadow-standard-900 shadow-standard-100 ${montaga.className} font-serif font-light`}
        >
          Hi, I'm Danyal
        </div>
        {
          // TODO Externalize TypeAnimation Component
        }
        <TypeAnimation
          className="[text-shadow:_0_0px_2px_var(--tw-shadow-color)] text-xl shadow-standard-100 dark:shadow-standard-900 "
          sequence={[
            "A full-stack developer",
            3000,
            "A web designer",
            3000,
            "A React developer",
            3000,
          ]}
          repeat={Infinity}
          speed={60}
        />
      </span>
      {/* // TODO - May want to externalize SVG waves */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform-gpu rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[50px]"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-standard-900 dark:fill-standard-100"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-standard-900 dark:fill-standard-100"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-standard-900 dark:fill-standard-100"
          ></path>
        </svg>
      </div>
    </div>
  );
}
