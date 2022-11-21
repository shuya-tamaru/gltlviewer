import { Center, Stage } from '@react-three/drei';
import { BuildingModel } from '../../hooks/threeHooks/useLoadingModel';
import CommentIcon from './CommentIcon';
import Cursor from './Cursor';
import useCommentAction, { CommentAction } from './stores/useCommentAction';

type Props = {
  buildingModel: BuildingModel;
};

export default function SettingModel({ buildingModel }: Props) {
  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;

  return (
    <>
      <Stage>
        <Center disableY>
          <primitive object={buildingModel.scene} />
        </Center>
      </Stage>
      <Cursor buildingModel={buildingModel} />
      <CommentIcon buildingModel={buildingModel} />
    </>
  );
}
