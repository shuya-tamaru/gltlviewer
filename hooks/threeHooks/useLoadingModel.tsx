import { useGLTF } from '@react-three/drei';

function useLoadingModel() {
  const buildingModel = useGLTF('/model/higashi_shinjuku.glb');
  buildingModel.scene.children.forEach((mesh) => {
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
  });

  return buildingModel;
}

export default useLoadingModel;
