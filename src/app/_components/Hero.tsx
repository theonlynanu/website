"use client";
import { useState, useRef } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Flex, Box, useFlexSize } from "@react-three/flex";
import { Float, OrbitControls } from "@react-three/drei";

function Cube(props: MeshProps) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      rotation={[0.7, 0.3, 0.7]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "#D3CEC4" : "#857F72"} />
    </mesh>
  );
}

function Cone(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  return (
    <Float floatingRange={[-0.5, 1]} rotationIntensity={3} speed={3}>
      <mesh {...props} ref={meshRef} rotation={[0.3, -2, 0.4]}>
        <coneGeometry args={[1.5, 4]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </Float>
  );
}

export default function Hero() {
  return (
    <div className="flex flex-shrink flex-col mx-auto justify-center gap-4 ">
      <div className="w-fit">
        <Canvas className="border ">
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 4, 3]} />
          <Cube scale={3} />
        </Canvas>
      </div>
      <div className="self-end">
        <Canvas className="border ">
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 2, 2]} />
          <Cone />
        </Canvas>
      </div>
    </div>
  );
}
