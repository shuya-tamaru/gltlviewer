import { useGLTF, useProgress } from '@react-three/drei';
import { ObjectMap, useThree } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

import useCurrentFloor from '../../components/threeComponents/stores/useCurrentFloor';
import useViewEvent from '../../components/threeComponents/stores/useViewEvent';
import useBoundingBox from './useBoundingBox';
export type BuildingModel = GLTF & ObjectMap;

function useLoadingModel() {
  const buildingModel: BuildingModel = useGLTF('/model/higashi_shinjuku.glb');
  const { camera } = useThree();
  const setPerspectiveCameraPos = useViewEvent((state) => state.setPerspectiveCameraPos);

  const { active, item } = useProgress();
  const { setFloorList, visibleFloors } = useViewEvent((state) => state);
  const setFloorDefaultPosition = useCurrentFloor((state) => state.setFloorDefaultPosition);

  //visible toggle by floor selector
  buildingModel.scene.children.forEach((mesh) => {
    if (visibleFloors === 'all') {
      mesh.visible = true;
      return;
    } else {
      const isVisible = mesh.name.indexOf(visibleFloors) !== -1;
      !isVisible ? (mesh.visible = false) : (mesh.visible = true);
    }
  });

  // set default position each floor
  const defaultPosMesh = buildingModel.scene.children.filter((mesh) => {
    const defaultpos = mesh.name.indexOf('defaultPosition') !== -1 && mesh;
    return defaultpos;
  });
  defaultPosMesh.map((mesh) => {
    mesh.visible = false;
  });
  const sortedDefaultPosMesh = defaultPosMesh.sort((first, second) => first.position.y - second.position.y);
  const defaultPositionList: THREE.Vector3[] = sortedDefaultPosMesh.map((mesh) => {
    return mesh.position;
  });
  console.log(buildingModel);

  active === false && item.indexOf('model') !== -1 && setFloorDefaultPosition(defaultPositionList);

  // glass transparent
  Object.keys(buildingModel.materials).forEach((key) => {
    const material = buildingModel.materials[key] as THREE.MeshStandardMaterial;
    if (key.indexOf('ガラス') !== -1) {
      material.transparent = true;
    }
    material.roughness = 1.0;
    material.envMapIntensity = 2.0;
  });

  //initialSetUp after model loading

  if (active === false && item.indexOf('model') !== -1) {
    //set floor list
    const floorNames: string[] = [];
    buildingModel.scene.children.map((group) => {
      group.name.indexOf('floor') !== -1 && floorNames.push(group.name);
    });
    setFloorList(floorNames);

    //set perspective camera position
    const { perspectivePosition } = useBoundingBox(buildingModel);
    camera.position.set(perspectivePosition.x, perspectivePosition.y, perspectivePosition.z);
    perspectivePosition.set(perspectivePosition.x, perspectivePosition.y, perspectivePosition.z);
    setPerspectiveCameraPos(perspectivePosition);
  }

  return buildingModel;
}

export default useLoadingModel;
