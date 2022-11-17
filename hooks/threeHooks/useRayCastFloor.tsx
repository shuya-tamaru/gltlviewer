import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import useViewEvent from '../../components/threeComponents/stores/useViewEvent';
import useLoadingModel from './useLoadingModel';

export default function useRayCastFloor() {
  const { raycaster } = useThree();
  const model = useLoadingModel();
  const setIsPerspective = useViewEvent((state) => state.setIsPerspective);
  const cameraMovingToggle = useViewEvent((state) => state.cameraMovingToggle);
  const [floorRayPos, setFloorRayPos] = useState<THREE.Vector3 | null>(null);
  const isMouseMoveCount = useRef(0);

  useEffect(() => {
    window.addEventListener('mouseup', (e) => {
      if (isMouseMoveCount.current < 3 && e.target instanceof HTMLElement && e.target.tagName === 'CANVAS') {
        const intersectObjects = raycaster.intersectObjects(model.scene.children);
        const floorIntersectObject = intersectObjects.filter((mesh) => {
          if (mesh.object.parent?.name.indexOf('floor') !== -1 || mesh.object.name.indexOf('floor') !== -1) return mesh;
        });
        if (floorIntersectObject.length > 0 && floorIntersectObject[0].object.parent?.visible) {
          setFloorRayPos(floorIntersectObject[0].point);
          cameraMovingToggle(true);
          // setIsMove(true);
          setIsPerspective(false);
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
      // setIsMove(false);
      isMouseMoveCount.current = 0;
    });
  }, []);

  return floorRayPos;
}
