"use client";
import { Decal, useTexture } from "@react-three/drei";
import { type ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

type MeshProps = ThreeElements["mesh"];

export default function Cube(props: MeshProps) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate and translate the mesh every frame,
  // and allow user to reverse the movement by click/touch
  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const direction = active ? -1 : 1;

    mesh.rotation.y += direction * 0.5 * delta;
    mesh.position.x += direction * delta;
    mesh.position.y += direction * 0.2 * delta;

    // Wrap at the frame edge rather than translating forever. Previously the
    // cube left the viewport after ~30s and never came back, while still
    // costing a draw call every frame.
    const xLimit = state.viewport.width / 2 + 5;
    const yLimit = state.viewport.height / 2 + 5;
    if (mesh.position.x > xLimit) mesh.position.x = -xLimit;
    else if (mesh.position.x < -xLimit) mesh.position.x = xLimit;
    if (mesh.position.y > yLimit) mesh.position.y = -yLimit;
    else if (mesh.position.y < -yLimit) mesh.position.y = yLimit;
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
