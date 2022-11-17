import { useGLTF, useProgress } from '@react-three/drei';
import useViewEvent from '../../components/threeComponents/stores/useViewEvent';

function useLoadingModel() {
  const buildingModel = useGLTF('/model/higashi_shinjuku.glb');
  const floor = useViewEvent((state) => state.fetchFloor);
  const visibleFloors = useViewEvent((state) => state.visibleFloors);
  const handleFloorVisible = useViewEvent((state) => state.handleFloorVisible);
  buildingModel.scene.children.forEach((mesh) => {
    if (visibleFloors === 'all') {
      mesh.visible = true;
      return;
    } else {
      const isVisible = mesh.name.indexOf(visibleFloors) !== -1;
      !isVisible ? (mesh.visible = false) : (mesh.visible = true);
    }
  });

  Object.keys(buildingModel.materials).forEach((key) => {
    if (key.indexOf('ガラス') !== -1) {
      const material = buildingModel.materials[key];
      material.transparent = true;
    }
  });
  const { active, progress, errors, item, loaded, total } = useProgress();

  if (active === false && item.indexOf('model') !== -1) {
    const floorNames: string[] = [];
    buildingModel.scene.children.map((group) => {
      group.name.indexOf('floor') !== -1 && floorNames.push(group.name);
    });
    floor(floorNames);
  }

  return buildingModel;
}

export default useLoadingModel;
