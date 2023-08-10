"use client";

import { Float } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

export default function Loop(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  const [tubeSegments, setTubeSegments] = useState(32);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <mesh {...props}>
        <Float floatingRange={[-0.5, 0.3]} rotationIntensity={6} speed={2}>
          <mesh
            ref={meshRef}
            rotation={[0, 2, 0]}
            onClick={() => {
              tubeSegments == 32
                ? setTubeSegments(Math.max(Math.random() * 12, 4))
                : setTubeSegments(32);
            }}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <torusGeometry args={[1.5, 0.6, 12, tubeSegments]} />
            <meshStandardMaterial color={hovered ? "#A39E93" : "#857F72"} />
          </mesh>
        </Float>
        <mesh>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color={"#CC8800"} />
        </mesh>
      </mesh>
    </>
  );
}
