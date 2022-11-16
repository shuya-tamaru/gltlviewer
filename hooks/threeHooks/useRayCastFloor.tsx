import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import useLoadingModel from './useLoadingModel';

export default function useRayCastFloor() {
  const { raycaster } = useThree();
  const model = useLoadingModel();
  const [floorRayPos, setFloorRayPos] = useState<THREE.Vector3 | null>(null);
  const [isMove, setIsMove] = useState<boolean>(false);
  const isMouseMove = useRef(0);

  useEffect(() => {
    window.addEventListener('mouseup', () => {
      if (isMouseMove.current < 3) {
        const intersectObjects = raycaster.intersectObjects(model.scene.children);
        const firstintersectObject = intersectObjects[0];
        if (firstintersectObject) {
          const raycastPlace = firstintersectObject.object.parent!.name;
          const isFloor = raycastPlace.indexOf('floor') !== -1 ? true : false;
          isFloor ? setFloorRayPos(firstintersectObject.point) : setFloorRayPos(null);
          setIsMove(true);
        }
      }
      isMouseMove.current = 0;
    });
    window.addEventListener('mousemove', () => {
      isMouseMove.current++;
    });
    window.addEventListener('mousedown', () => {
      setIsMove(false);
      isMouseMove.current = 0;
    });
  }, []);

  return { floorRayPos, isMove, setIsMove };
}
