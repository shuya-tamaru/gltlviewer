import { useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import setUpMaterial from "../../hooks/threeHooks/setUpMaterial";

export type BuildingModel = GLTF & ObjectMap;

const useLoadingModel = () => {
  const buildingModel = useGLTF("/model/myhome.glb") as unknown as BuildingModel;
  setUpMaterial(buildingModel);
  return buildingModel;
};

export default useLoadingModel;
