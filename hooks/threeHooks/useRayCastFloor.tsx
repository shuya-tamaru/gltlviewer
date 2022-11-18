import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import useViewEvent from '../../components/threeComponents/stores/useViewEvent';
import { BuildingModel } from './useLoadingModel';

export default function useRayCastFloor(buildingModel: BuildingModel) {
  const { raycaster } = useThree();

  const [floorName, setFloorName] = useState<string>('');
  const [floorRayPos, setFloorRayPos] = useState<THREE.Vector3 | null>(null);
  const isMouseMoveCount = useRef(0);

  useEffect(() => {
    window.addEventListener('mouseup', (e) => {
      if (isMouseMoveCount.current < 3 && e.target instanceof HTMLElement && e.target.tagName === 'CANVAS') {
        const intersectObjects = raycaster.intersectObjects(buildingModel.scene.children);
        const floorIntersectObject = intersectObjects.filter((mesh) => {
          if (mesh.object.parent?.name.indexOf('floor') !== -1 || mesh.object.name.indexOf('floor') !== -1) return mesh;
        });
        if (floorIntersectObject.length > 0 && floorIntersectObject[0].object.parent?.visible) {
          const parentName = floorIntersectObject[0].object.parent.name;
          const meshName = floorIntersectObject[0].object.name;
          const getFloorName =
            parentName.indexOf('floor') !== -1 ? parentName : meshName.indexOf('floor') !== -1 ? meshName : floorName;
          setFloorName(getFloorName);
          setFloorRayPos(floorIntersectObject[0].point);
        } else {
          setFloorRayPos(null);
        }
      }
      isMouseMoveCount.current = 0;
    });
    window.addEventListener('mousemove', () => {
      isMouseMoveCount.current++;
    });
    window.addEventListener('mousedown', () => {
      isMouseMoveCount.current = 0;
    });
  }, []);

  return { floorRayPos, setFloorRayPos, floorName };
}
