import { useThree } from "@react-three/fiber";

import useViewEvent from "../../components/threeComponents/stores/useViewEvent";
import useBoundingBox from "./useBoundingBox";
import { BuildingModel } from "./useLoadingModel";

function usePerspectiveCameraPos(buildingModel: BuildingModel) {
  const { perspectivePosition } = useBoundingBox(buildingModel);
  const { camera } = useThree();
  const setPerspectiveCameraPos = useViewEvent((state) => state.setPerspectiveCameraPos);

  camera.position.set(perspectivePosition.x, perspectivePosition.y, perspectivePosition.z);
  perspectivePosition.set(perspectivePosition.x, perspectivePosition.y, perspectivePosition.z);
  setPerspectiveCameraPos(perspectivePosition);

  return;
}

export default usePerspectiveCameraPos;
