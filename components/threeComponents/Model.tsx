import { useGLTF } from "@react-three/drei";
import { BuildingModel } from "../../hooks/threeHooks/useLoadingModel";

const Model = () => {
  const buildingModel: BuildingModel = useGLTF("/model/higashi_shinjuku.glb");
  return <primitive object={buildingModel.scene} />;
};

export default Model;
