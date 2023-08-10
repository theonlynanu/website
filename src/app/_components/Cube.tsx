"use client";
import { Decal, useTexture } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

export default function Cube(props: MeshProps) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate and translate the mesh every frame,
  // and allow user to reverse the movement by click/touch
  useFrame((state, delta) => {
    if (!active) {
      meshRef.current.rotation.y += 0.5 * delta;
      meshRef.current.position.x += delta;
      meshRef.current.position.y += 0.2 * delta;
    } else {
      meshRef.current.rotation.y -= 0.5 * delta;
      meshRef.current.position.x -= delta;
      meshRef.current.position.y -= 0.2 * delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      rotation={[0.7, 0.3, 1.2]}
      scale={5}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "#B8B2A7" : "#25D094"} />
    </mesh>
  );
}
