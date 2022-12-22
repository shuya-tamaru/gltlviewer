import { BuildingModel } from "../../hooks/threeHooks/useLoadingModel";
import Cursor from "./Cursor";

type Props = {
  buildingModel: BuildingModel;
};

export default function SettingModel({ buildingModel }: Props) {
  return (
    <>
      <primitive object={buildingModel.scene} />
      <Cursor buildingModel={buildingModel} />
    </>
  );
}
