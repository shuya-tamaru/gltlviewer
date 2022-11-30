import { Box } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { Building } from "../../types/Buildings";

import Debug from "./Debug";
import Experience from "./Experience";
import CanvasSpinner from "./interfaceComponents/CanvasSpinner";
import Interface from "./interfaceComponents/Interface";
import useViewEvent from "./stores/useViewEvent";

type Props = {
  building: Building;
};

export default function WebGLCanvas({ building }: Props) {
  const perspectiveCameraPos = useViewEvent((state) => state.perspectiveCameraPos);

  return (
    <>
      <Box w="100%" h="92%" p="5px" position="relative">
        <Canvas
          style={{ width: "calc(100% - 5px)", height: "calc(100% - 5px)", background: "#283b4f" }}
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
            <Experience building={building} />
          </Suspense>
        </Canvas>
        <Interface />
      </Box>
    </>
  );
}
