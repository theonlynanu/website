"use client";
import { Decal, Text, useTexture } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export default function Eyeball(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    meshRef.current.lookAt(x, y, 10);
  });

  const [bullseye] = useTexture(["/bullseye.png"]);

  return (
    <mesh {...props} ref={meshRef}>
      <meshStandardMaterial color={"white"} />
      <sphereGeometry args={[0.8, 18, 18]} />
      {/* <Text fontSize={2} position-y={-0.3} position-z={0.8} color={"black"}>
        •
      </Text> */}
      <Decal map={bullseye} position={[0, 0, 1]} rotation={[0, 0, 0]} />
    </mesh>
  );
}
