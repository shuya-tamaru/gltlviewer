import { useGLTF, useProgress } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import useFloorSelector from "./useFloorSelector";
import useDefaultFloorPosition from "./useDefaultFloorPosition";
import useMaterialSetup from "./useMaterialSetup";
import useSetFloorList from "./useSetFloorList";
import usePerspectiveCameraPos from "./usePerspectiveCameraPos";
import useCommentActions, { CommentActions } from "../../components/threeComponents/stores/useCommentActions";
export type BuildingModel = GLTF & ObjectMap;

function useLoadingModel() {
  const buildingModel: BuildingModel = useGLTF("/model/higashi_shinjuku.glb");
  const { active, item } = useProgress();
  const { setCommentAction } = useCommentActions((state) => state);

  useFloorSelector(buildingModel);
  useDefaultFloorPosition(buildingModel);

  //initialSetUp after model loading
  if (active === false && item.indexOf("model") !== -1) {
    useMaterialSetup(buildingModel);
    useSetFloorList(buildingModel);
    usePerspectiveCameraPos(buildingModel);
    setCommentAction(CommentActions.READY);
  }
  return buildingModel;
}

export default useLoadingModel;
