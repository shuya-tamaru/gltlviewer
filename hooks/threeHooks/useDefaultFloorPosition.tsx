import { useProgress } from "@react-three/drei";

import useCurrentFloor from "../../components/threeComponents/stores/useCurrentFloor";
import { BuildingModel } from "./useLoadingModel";

function useDefaultFloorPosition(buildingModel: BuildingModel) {
  const { active, item } = useProgress();
  const setFloorDefaultPosition = useCurrentFloor((state) => state.setFloorDefaultPosition);

  const defaultPosMesh = buildingModel.scene.children.filter((mesh) => {
    const defaultpos = mesh.name.indexOf("defaultPosition") !== -1 && mesh;
    return defaultpos;
  });
  defaultPosMesh.map((mesh) => {
    mesh.visible = false;
  });
  const sortedDefaultPosMesh = defaultPosMesh.sort((first, second) => first.position.y - second.position.y);
  const defaultPositionList: THREE.Vector3[] = sortedDefaultPosMesh.map((mesh) => {
    return mesh.position;
  });

  active === false && item.indexOf("model") !== -1 && setFloorDefaultPosition(defaultPositionList);

  return;
}

export default useDefaultFloorPosition;
