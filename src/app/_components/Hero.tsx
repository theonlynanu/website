"use client";
import { useState, useRef } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { Float } from "@react-three/drei";
import useWindowDimensions from "../_utils/useWindowDimension";
import { TypeAnimation } from "react-type-animation";
import { inter, poiret } from "../../fonts";

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

function Loop(props: MeshProps) {
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

function Cone(props: MeshProps) {
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
          radialSegments < 32 ? setRadialSegments(radialSegments + 1) : null
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
        <Cone
          position={[width ? -width / 200 : -2, height ? height / 175 : 4, -8]}
          scale={width ? Math.max(width / 1250, 0.8) : 1.4}
        />
      </Canvas>
      <span className="block mx-auto my-auto absolute top-0 md:top-32 left-0 right-0 w-1/2 text-center rounded-xl">
        <div
          className={`[text-shadow:_0_0px_2px_var(--tw-shadow-color)] text-6xl w-full m-8 text-center mx-auto text-standard-900 shadow-white ${inter.className} font-medium`}
        >
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
