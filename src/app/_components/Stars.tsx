"use client";

import { Point, Points, useTexture } from "@react-three/drei";
import { PointsProps } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { Suspense, useEffect, useState } from "react";

export default function Stars(props: PointsProps) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const starTexture = useTexture("/sp2.png");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  function getRandomParticlePos(particleCount: number): number[] {
    const arr = new Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20, -100];
    }
    return arr;
  }

  const PARTICLE_COUNT = 100;
  const particlePositionArray: number[] = getRandomParticlePos(PARTICLE_COUNT);

  return (
    <Suspense fallback={null}>
      <Points {...props} limit={PARTICLE_COUNT} range={500}>
        <pointsMaterial vertexColors size={8} map={starTexture} transparent />
        {particlePositionArray.map((value) => {
          return (
            <Point
              position={value}
              color={currentTheme == "light" ? "black" : "white"}
            />
          );
        })}
      </Points>
    </Suspense>
  );
}
