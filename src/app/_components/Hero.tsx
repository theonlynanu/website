"use client";
import { useState, useRef } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { BoxGeometry, Mesh } from "three";
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
    meshRef.current.rotation.y += 0.5 * delta;
    meshRef.current.position.x += delta;
    meshRef.current.position.y += 0.4 * delta;
  });
  // Return view, these are regular three.js elements expressed in JSX
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
    <div className="border border-red-700 h-96">
      <Canvas
        className="border border-black"
        camera={{ position: [0, 0, 10], zoom: 30 }}
        orthographic
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 1, 6]} />
        <Cube />
      </Canvas>
    </div>
  );
}
