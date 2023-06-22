import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { useNProgress } from "@tanem/react-nprogress";
import Debug from "./Debug";
import Experience from "./Experience";
import CanvasSpinner from "./interfaceComponents/CanvasSpinner";
import Interface from "./interfaceComponents/Interface";
import { useProgress, Html } from "@react-three/drei";

export default function WebGLCanvas() {
  const { loaded } = useProgress();
  const progress = loaded / 20;

  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh", background: "#283b4f" }}
        id="viewer"
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 200,
          position: [-6, 4.5, 1.1],
        }}
        shadows
      >
        {/* <Debug /> */}
        <Suspense fallback={<CanvasSpinner progress={progress} />}>
          <Experience />
        </Suspense>
      </Canvas>
      {/* <Interface /> */}
    </>
  );
}
