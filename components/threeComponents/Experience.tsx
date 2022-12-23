import { Environment, OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { useRef } from "react";

import useViewEvent from "./stores/useViewEvent";
import useLoadingModel, { BuildingModel } from "../../hooks/threeHooks/useLoadingModel";
import SettingModel from "./SettingModel";
import useCameraAction from "../../hooks/threeHooks/useCameraAction";
import { ModelPath } from "../../types/ModelPath";

function Experience({ modelPath }: ModelPath) {
  const buildingModel: BuildingModel = useLoadingModel(modelPath);
  const cameraRef = useRef<OrbitControlsImpl>(null);
  const isPerspective = useViewEvent((state) => state.isPerspective);

  useCameraAction(buildingModel, cameraRef);

  return (
    <>
      <OrbitControls ref={cameraRef} enableZoom={isPerspective ? true : false} makeDefault />
      <SettingModel buildingModel={buildingModel} />
      <Environment preset="forest" />
    </>
  );
}

export default Experience;
