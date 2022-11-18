import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { RootState, useFrame } from '@react-three/fiber';

import { RefObject } from 'react';

import useRayCastFloor from '../../hooks/threeHooks/useRayCastFloor';
import useViewEvent from '../../components/threeComponents/stores/useViewEvent';
import useCurrentFloor from '../../components/threeComponents/stores/useCurrentFloor';
import useCommentAction, { CommentAction } from '../../components/threeComponents/stores/useCommentAction';
import { BuildingModel } from './useLoadingModel';

const sightHeight = 1.4;
const perspectiveCameraPos = new THREE.Vector3(0, 3, 40);
const perspectiveLookAt = new THREE.Vector3(0, 0, 0);
let walkThrougCameraPos = new THREE.Vector3(0, 0 + sightHeight, 0);

function useCameraAction(buildingModel: BuildingModel, cameraRef: RefObject<OrbitControlsImpl>) {
  const { isPerspective, setIsPerspective, cameraIsMoving, cameraMovingToggle, handleFloorVisible } = useViewEvent(
    (state) => state,
  );
  const { destinationFloor, setDestinationFloor, floorDefaultPosition } = useCurrentFloor((state) => state);
  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;
  const { floorRayPos, setFloorRayPos } = useRayCastFloor(buildingModel);

  const setRayCastPosition = (floorRayPos: THREE.Vector3) => {
    setIsPerspective(false);
    cameraMovingToggle(true);
    const { x, y, z } = floorRayPos;
    walkThrougCameraPos.set(x, y + sightHeight, z);
  };

  const resetState = () => {
    setFloorRayPos(null);
    cameraMovingToggle(false);
  };

  const setSelectedFloorPoition = (destinationFloor: number) => {
    const { x, y, z } = floorDefaultPosition[destinationFloor];
    walkThrougCameraPos.set(x, y + sightHeight, z);
    cameraMovingToggle(true);
  };

  const setCameraPosition = (cameraRef: RefObject<OrbitControlsImpl>, state: RootState, delta: number) => {
    handleFloorVisible('all');
    cameraRef.current!.rotateSpeed = 0.3;
    const currentPos = new THREE.Vector3();
    currentPos.copy(state.camera.position);
    const cameraMoveSpeed = 2 * delta;
    const newPos = isPerspective
      ? currentPos.lerp(perspectiveCameraPos, cameraMoveSpeed)
      : currentPos.lerp(walkThrougCameraPos, cameraMoveSpeed);

    //setCameraPos
    state.camera.position.copy(newPos);

    //setOrbitTarget
    const { x, y, z } = walkThrougCameraPos;
    cameraRef.current!.target = isPerspective ? perspectiveLookAt : new THREE.Vector3(x + 0.0000001, y, z);
  };

  const cameraStop = (state: RootState) => {
    const targetPoint = isPerspective ? perspectiveCameraPos : walkThrougCameraPos;
    const distanceToDestination = Math.floor(state.camera.position.distanceTo(targetPoint) * 100) / 100;
    if (distanceToDestination < 0.5) {
      cameraMovingToggle(false);
      setDestinationFloor(null);
      setFloorRayPos(null);
    }
  };

  useFrame((state, delta) => {
    if (typeof destinationFloor === 'number') {
      setSelectedFloorPoition(destinationFloor);
    } else {
      commentAction !== actions.ACTIVE ? floorRayPos && setRayCastPosition(floorRayPos) : resetState();
    }

    if (cameraRef.current && cameraIsMoving) {
      setCameraPosition(cameraRef, state, delta);
      cameraStop(state);
    }
  });

  return;
}

export default useCameraAction;
