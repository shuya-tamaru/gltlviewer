import { useGLTF, useProgress } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import useFloorSelector from "./useFloorSelector";
import useDefaultFloorPosition from "./useDefaultFloorPosition";
import useMaterialSetup from "./useMaterialSetup";
import useSetFloorList from "./useSetFloorList";
import usePerspectiveCameraPos from "./usePerspectiveCameraPos";

export type BuildingModel = GLTF & ObjectMap;

function useLoadingModel(modelPath: string) {
  const buildingModel: BuildingModel = useGLTF(modelPath);

  const { active, item } = useProgress();

  useFloorSelector(buildingModel);
  useDefaultFloorPosition(buildingModel);

  //initialSetUp after model loading
  if (active === false && item.indexOf("model") !== -1) {
    useMaterialSetup(buildingModel);
    useSetFloorList(buildingModel);
    usePerspectiveCameraPos(buildingModel);
  }
  return buildingModel;
}

export default useLoadingModel;
