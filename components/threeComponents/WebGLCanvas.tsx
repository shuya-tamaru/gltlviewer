import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { ModelPath } from "../../types/ModelPath";

import Debug from "./Debug";
import Experience from "./Experience";
import CanvasSpinner from "./interfaceComponents/CanvasSpinner";
import Interface from "./interfaceComponents/Interface";
import useViewEvent from "./stores/useViewEvent";

export default function WebGLCanvas({ modelPath }: ModelPath) {
  const perspectiveCameraPos = useViewEvent((state) => state.perspectiveCameraPos);

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
          position: perspectiveCameraPos,
        }}
      >
        {/* <Debug /> */}
        <Suspense fallback={<CanvasSpinner />}>
          <Experience modelPath={modelPath} />
        </Suspense>
      </Canvas>
      <Interface />
    </>
  );
}
