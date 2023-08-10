"use client";

import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

export default function Cone(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  const [radialSegments, setRadialSegments] = useState(8);
  const [hovered, setHovered] = useState(false);

  const axis = new Vector3(0, 1, 0);
  useFrame((state, delta) => {
    meshRef.current.rotateOnAxis(axis, delta);
  });

  return (
    <>
      <mesh
        {...props}
        rotation={[0.8, 0.4, -0.3]}
        ref={meshRef}
        onClick={() =>
          radialSegments < 32 ? setRadialSegments(radialSegments + 2) : null
        }
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <coneGeometry args={[1, 3, radialSegments]} />
        <meshStandardMaterial color={hovered ? "#FFC247" : "#CC8800"} />
      </mesh>
    </>
  );
}
