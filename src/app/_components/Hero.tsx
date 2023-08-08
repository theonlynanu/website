"use client";
import { useState, useRef } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Float } from "@react-three/drei";
import useWindowDimensions from "../_utils/useWindowDimension";
import { TypeAnimation } from "react-type-animation";

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
      <meshStandardMaterial color={hovered ? "#B8B2A7" : "#25D094"} />
    </mesh>
  );
}

function Loop(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);

  return (
    <>
      <mesh {...props}>
        <Float floatingRange={[-0.5, 0.3]} rotationIntensity={6} speed={2}>
          <mesh rotation={[0, 2, 0]}>
            <torusGeometry args={[1.5, 0.6]} />
            <meshStandardMaterial color={"#857F72"} />
          </mesh>
        </Float>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color={"#CC8800"} />
        </mesh>
      </mesh>
    </>
  );
}

export default function Hero() {
  const { width, height } = useWindowDimensions();

  return (
    <div className="h-[80vh] relative -left-5 w-[100vw] bg-standard-100 dark:bg-standard-900">
      <Canvas
        className=" h-96 p-0"
        camera={{ position: [0, 0, 10], zoom: 50 }}
        orthographic
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 2, 6]} />
        <Cube
          position={[
            width ? -(width / 80) : -15,
            height ? -(height / 1500) : -8,
            -5,
          ]}
        />
        <Loop
          position={[width ? width / 200 : 2, height ? height / 5000 : -1, 0]}
          scale={1}
        />
      </Canvas>
      <span className="block mx-auto my-auto absolute top-0 md:top-32 left-0 right-0 w-1/2 text-center rounded-xl">
        <div className="[text-shadow:_0_0px_2px_var(--tw-shadow-color)] text-6xl w-full m-8 text-center mx-auto text-standard-900 shadow-white font-['georgia']">
          Hi, I'm Danyal
        </div>
      </span>
      <div>
        {/* <svg
          className="fill-standard-100 dark:fill-standard-900"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMinYMin meet"
        >
          <path d="M0,10 C100,50 200,0 300,40 C300,40 400,90 500,0 L500,0 L0,0 Z"></path>
        </svg> */}
      </div>
    </div>
  );
}
