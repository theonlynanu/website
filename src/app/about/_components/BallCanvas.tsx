"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, OrbitControls, useTexture } from "@react-three/drei";

function Ball({ imgUrl }: { imgUrl: string }) {
  const [decal] = useTexture([imgUrl]);
  return (
    <>
      <ambientLight intensity={0.25} />?
      <directionalLight position={[0, 0.5, 0.5]} />
      <mesh castShadow receiveShadow scale={2.5}>
        <sphereGeometry />
        <meshStandardMaterial
          color="#E8E6E1"
          polygonOffset
          polygonOffsetFactor={0}
        />
        <Decal
          position={[0, 0, 1]}
          map={decal}
          rotation={[2 * Math.PI, 0, 0]}
        />
      </mesh>
    </>
  );
}

const BallCanvas = ({ icon }: { icon: string }) => {
  return (
    <Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
      <Suspense>
        <OrbitControls enableZoom={false} rotateSpeed={0.25} />
        <Ball imgUrl={icon} />
      </Suspense>
    </Canvas>
  );
};

export default BallCanvas;
