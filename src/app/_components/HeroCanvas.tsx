"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import useWindowDimensions from "../_utils/useWindowDimension";
import Cube from "./Cube";
import Loop from "./Loop";
import Cone from "./Cone";
import Stars from "./Stars";
import Eyeball from "./Eyeball";

export default function HeroCanvas() {
  const { width, height } = useWindowDimensions();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // The scene is decorative, so stop rendering frames once it scrolls away —
  // otherwise the WebGL loop runs at full rate for the life of the tab.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        className="h-96 p-0"
        camera={{ position: [0, 0, 10], zoom: 50 }}
        orthographic
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 2, 4]} intensity={175} />
        {/* Suspense lives inside the Canvas so a suspending texture doesn't
            tear down the renderer and leak a WebGL context. */}
        <Suspense fallback={null}>
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
        </Suspense>
      </Canvas>
    </div>
  );
}
