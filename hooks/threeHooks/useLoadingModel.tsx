import { useGLTF, useProgress } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import useFloorSelector from "./useFloorSelector";
import useDefaultFloorPosition from "./useDefaultFloorPosition";
import useMaterialSetup from "./useMaterialSetup";
import useSetFloorList from "./useSetFloorList";
import usePerspectiveCameraPos from "./usePerspectiveCameraPos";
export type BuildingModel = GLTF & ObjectMap;

function useLoadingModel() {
  const buildingModel: BuildingModel = useGLTF("/model/higashi_shinjuku.glb");

  const { active, item } = useProgress();

  //initialSetUp
  useFloorSelector(buildingModel);
  useDefaultFloorPosition(buildingModel);
  useMaterialSetup(buildingModel);

  //initialSetUp after model loading
  if (active === false && item.indexOf("model") !== -1) {
    useSetFloorList(buildingModel);
    usePerspectiveCameraPos(buildingModel);
  }

  return buildingModel;
}

export default useLoadingModel;
