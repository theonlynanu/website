"use client";

import { Point, Points, useTexture } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useMemo } from "react";

type PointsProps = Omit<ThreeElements["points"], "ref">;
type Vec3 = [number, number, number];

const PARTICLE_COUNT = 100;

function getRandomParticlePos(particleCount: number): Vec3[] {
  const arr = new Array<Vec3>(particleCount);
  for (let i = 0; i < particleCount; i++) {
    arr[i] = [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20, -100];
  }
  return arr;
}

export default function Stars(props: PointsProps) {
  const { resolvedTheme } = useTheme();
  const starTexture = useTexture("/sp2.png");

  // Positions are fixed for the life of the scene. Generating them during
  // render re-rolled all 100 stars — and remounted all 100 <Point> children —
  // on every parent re-render, including every resize event.
  const particlePositionArray = useMemo(
    () => getRandomParticlePos(PARTICLE_COUNT),
    []
  );

  return (
    <Points {...props} limit={PARTICLE_COUNT} range={500}>
      <pointsMaterial vertexColors size={8} map={starTexture} transparent />
      {particlePositionArray.map((value, index) => {
        return (
          <Point
            position={value}
            key={index}
            color={resolvedTheme === "light" ? "black" : "white"}
          />
        );
      })}
    </Points>
  );
}
