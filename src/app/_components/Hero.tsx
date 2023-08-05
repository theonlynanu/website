"use client";
import { useState, useRef } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Float } from "@react-three/drei";
import useWindowDimensions from "../_utils/useWindowDimension";

function Cube(props: MeshProps) {
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
      meshRef.current.position.y += 0.4 * delta;
    } else {
      meshRef.current.rotation.y -= 0.5 * delta;
      meshRef.current.position.x -= delta;
      meshRef.current.position.y -= 0.4 * delta;
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
      <meshStandardMaterial
        color={
          active
            ? hovered
              ? "#B8B2A7"
              : "#504A40"
            : hovered
            ? "#B8B2A7"
            : "#857F72"
        }
      />
    </mesh>
  );
}

function Loop(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);

  return (
    <>
      <Float floatingRange={[-0.5, 0.3]} rotationIntensity={3} speed={3}>
        <mesh {...props} rotation={[-1, 2, 0]}>
          <torusGeometry args={[1.5, 0.6]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </Float>
      <mesh {...props} ref={meshRef}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color={"purple"} />
      </mesh>
    </>
  );
}

export default function Hero() {
  const { width, height } = useWindowDimensions();

  return (
    <div className="border border-red-700 h-[80vh]">
      <Canvas
        className="border border-black h-96 p-2"
        camera={{ position: [0, 0, 10], zoom: 50 }}
        orthographic
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 1, 6]} />
        <Cube
          position={[
            width ? -(width / 100) : -15,
            height ? -(height / 200) : -8,
            0,
          ]}
        />
        <Loop />
      </Canvas>
    </div>
  );
}
