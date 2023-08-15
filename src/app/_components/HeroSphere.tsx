"use client";
import { OrbitControls, Text } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export default function HeroSphere(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    meshRef.current.lookAt(x, y, 10);
  });

  return (
    <mesh {...props} ref={meshRef}>
      <meshStandardMaterial color={"white"} flatShading />
      <sphereGeometry args={[0.8, 12, 12]} />
      <Text fontSize={2} position-y={-0.3} position-z={0.81} color={"black"}>
        •
      </Text>
      <Text fontSize={3} position-y={-0.4} position-z={0.8} color={"#CC8800"}>
        •
      </Text>
    </mesh>
  );
}
