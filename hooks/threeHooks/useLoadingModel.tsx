import { useGLTF, useProgress } from '@react-three/drei';
import { ObjectMap } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

import useViewEvent from '../../components/threeComponents/stores/useViewEvent';
export type BuildingModel = GLTF & ObjectMap;

function useLoadingModel() {
  const buildingModel: BuildingModel = useGLTF('/model/higashi_shinjuku.glb');
  const { setFloorList, visibleFloors } = useViewEvent((state) => state);
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

  const { active, item } = useProgress();

  if (active === false && item.indexOf('model') !== -1) {
    const floorNames: string[] = [];
    buildingModel.scene.children.map((group) => {
      group.name.indexOf('floor') !== -1 && floorNames.push(group.name);
    });
    setFloorList(floorNames);
  }

  return buildingModel;
}

export default useLoadingModel;
