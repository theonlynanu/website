"use client";

import { Point, Points, useTexture } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type PointsProps = Omit<ThreeElements["points"], "ref">;
type Vec3 = [number, number, number]

export default function Stars(props: PointsProps) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [randomStarPos] = useState(() => Math.random);
  const starTexture = useTexture("/sp2.png");

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  function getRandomParticlePos(particleCount: number): Vec3[] {
    const arr = new Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = [
        (randomStarPos() - 0.5) * 40,
        (randomStarPos() - 0.5) * 20,
        -100,
      ];
    }
    return arr;
  }

  const PARTICLE_COUNT = 100;
  const particlePositionArray: Vec3[] = getRandomParticlePos(PARTICLE_COUNT);

  return (
    <Points {...props} limit={PARTICLE_COUNT} range={500}>
      <pointsMaterial vertexColors size={8} map={starTexture} transparent />
      {particlePositionArray.map((value, index) => {
        return (
          <Point
            position={value}
            key={index}
            color={currentTheme == "light" ? "black" : "white"}
          />
        );
      })}
    </Points>
  );
}
