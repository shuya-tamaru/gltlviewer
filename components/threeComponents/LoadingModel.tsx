import { Center, Stage } from '@react-three/drei';
import useLoadingModel from '../../hooks/threeHooks/useLoadingModel';

export default function LoadingModel() {
  const buildingModel = useLoadingModel();

  return (
    <>
      <Stage>
        <Center disableY>
          <primitive object={buildingModel.scene} />
        </Center>
      </Stage>
    </>
  );
}
