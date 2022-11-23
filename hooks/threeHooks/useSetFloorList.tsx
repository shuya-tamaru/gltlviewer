import useViewEvent from "../../components/threeComponents/stores/useViewEvent";
import { BuildingModel } from "./useLoadingModel";

function useSetFloorList(buildingModel: BuildingModel) {
  const setFloorList = useViewEvent((state) => state.setFloorList);

  const floorNames: string[] = [];
  buildingModel.scene.children.map((group) => {
    group.name.indexOf("floor") !== -1 && floorNames.push(group.name);
  });
  setFloorList(floorNames.sort());
  return;
}

export default useSetFloorList;
