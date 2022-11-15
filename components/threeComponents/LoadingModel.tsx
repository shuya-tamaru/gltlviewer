import { Center, useGLTF, Stage } from '@react-three/drei';
import Cursor from './Cursor';

export default function LoadingModel() {
  const buildingModel = useGLTF('/model/higashi_shinjuku.glb');
  buildingModel.scene.children.forEach((mesh) => {
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
  });

  return (
    <>
      <Stage>
        <Cursor model={buildingModel} />
        <Center disableY>
          <primitive object={buildingModel.scene} />
        </Center>
      </Stage>
    </>
  );
}
