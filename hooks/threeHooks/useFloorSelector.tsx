import useViewEvent from "../../components/threeComponents/stores/useViewEvent";
import { BuildingModel } from "./useLoadingModel";

function useFloorSelector(buildingModel: BuildingModel) {
  const { visibleFloors } = useViewEvent((state) => state);

  buildingModel.scene.children.forEach((mesh) => {
    if (visibleFloors === "all") {
      mesh.visible = true;
      return;
    } else {
      const isVisible = mesh.name.indexOf(visibleFloors) !== -1;
      !isVisible ? (mesh.visible = false) : (mesh.visible = true);
    }
  });
  return;
}

export default useFloorSelector;
