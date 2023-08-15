"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import useWindowDimensions from "../_utils/useWindowDimension";
import Cube from "./Cube";
import Loop from "./Loop";
import Cone from "./Cone";
import Stars from "./Stars";
import { TypeAnimation } from "react-type-animation";
import HeroSphere from "./HeroSphere";

export default function Hero() {
  const { width, height } = useWindowDimensions();

  return (
    <div className="h-[80vh] relative -left-5 w-[100vw] bg-standard-100 dark:bg-standard-900">
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
          <HeroSphere
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
          className={`[text-shadow:_0_0px_2px_var(--tw-shadow-color)] text-6xl w-full m-8 text-center mx-auto text-standard-900 dark:text-standard-100 dark:shadow-standard-900 shadow-standard-100 font-serif font-medium`}
        >
          Hi, I'm Danyal
        </div>
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
        />
      </span>
    </div>
  );
}
