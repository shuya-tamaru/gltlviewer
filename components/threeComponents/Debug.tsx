import * as THREE from "three";

import { Perf } from "r3f-perf";
import { useThree } from "@react-three/fiber";

export default function Debug() {
  // AxesHelper
  const { scene } = useThree();
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  return (
    <>
      <Perf position={"top-left"} />
    </>
  );
}
