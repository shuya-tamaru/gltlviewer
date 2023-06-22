import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

import Debug from "./Debug";
import Experience from "./Experience";
import CanvasSpinner from "./interfaceComponents/CanvasSpinner";
import Interface from "./interfaceComponents/Interface";

export default function WebGLCanvas() {
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
        <Suspense fallback={<CanvasSpinner />}>
          <Experience />
        </Suspense>
      </Canvas>
      {/* <Interface /> */}
    </>
  );
}
