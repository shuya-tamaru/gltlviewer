import { Center, useGLTF, Stage } from '@react-three/drei';

function LoadingModel() {
  const buildingModel = useGLTF('/model/higashi_shinjuku.glb');
  buildingModel.scene.children.forEach((mesh) => {
    // const F1 = mesh.name === '1F' && mesh;
    // if (F1) F1.visible = false;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  return (
    <>
      <Stage>
        <Center>
          <primitive object={buildingModel.scene} scale={0.2} />
        </Center>
      </Stage>
    </>
  );
}

export default LoadingModel;
