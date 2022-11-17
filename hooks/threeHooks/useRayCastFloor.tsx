import { useThree } from '@react-three/fiber';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useLoadingModel from './useLoadingModel';

type Props = Dispatch<SetStateAction<boolean>>;

export default function useRayCastFloor(setCurrentView: Props) {
  const { raycaster } = useThree();
  const model = useLoadingModel();
  const [floorRayPos, setFloorRayPos] = useState<THREE.Vector3 | null>(null);
  const [isMove, setIsMove] = useState<boolean>(false);
  const isMouseMove = useRef(0);

  useEffect(() => {
    window.addEventListener('mouseup', (e) => {
      if (isMouseMove.current < 3 && e.target instanceof HTMLElement && e.target.tagName === 'CANVAS') {
        const intersectObjects = raycaster.intersectObjects(model.scene.children);
        const floorIntersectObject = intersectObjects.filter((mesh) => {
          if (mesh.object.parent?.name.indexOf('floor') !== -1 || mesh.object.name.indexOf('floor') !== -1) return mesh;
        });
        // console.log(floorIntersectObject);
        if (floorIntersectObject.length > 0 && floorIntersectObject[0].object.parent?.visible) {
          setFloorRayPos(floorIntersectObject[0].point);
          setIsMove(true);
          setCurrentView(false);
        } else {
          setFloorRayPos(null);
        }
      }
      isMouseMove.current = 0;
    });
    window.addEventListener('mousemove', () => {
      isMouseMove.current++;
    });
    window.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      setIsMove(false);
      isMouseMove.current = 0;
    });
  }, []);

  return { floorRayPos, isMove, setIsMove };
}
