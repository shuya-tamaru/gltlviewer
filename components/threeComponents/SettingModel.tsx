import { Stage } from '@react-three/drei';
import { BuildingModel } from '../../hooks/threeHooks/useLoadingModel';
import CommentIcon from './CommentIcon';
import Cursor from './Cursor';

type Props = {
  buildingModel: BuildingModel;
};

export default function SettingModel({ buildingModel }: Props) {
  return (
    <>
      {/* <Stage> */}
      <primitive object={buildingModel.scene} />
      {/* </Stage> */}
      <Cursor buildingModel={buildingModel} />
      <CommentIcon buildingModel={buildingModel} />
    </>
  );
}
