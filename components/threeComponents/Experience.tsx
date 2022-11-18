import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { useRef } from 'react';

import useRayCastFloor from '../../hooks/threeHooks/useRayCastFloor';
import useViewEvent from './stores/useViewEvent';
import useCurrentFloor from './stores/useCurrentFloor';
import useLoadingModel, { BuildingModel } from '../../hooks/threeHooks/useLoadingModel';
import SettingModel from './SettingModel';
import useCommentAction, { CommentAction } from './stores/useCommentAction';

const sightHeight = 1.4;
let walkThrougCameraPos = new THREE.Vector3(0, 0 + sightHeight, 0);

export default function Experience() {
  const buildingModel: BuildingModel = useLoadingModel();

  const {
    isPerspective,
    setIsPerspective,
    cameraIsMoving,
    cameraMovingToggle,
    handleFloorVisible,
  } = useViewEvent((state) => state);
  const { destinationFloor, setDestinationFloor, floorDefaultPosition } = useCurrentFloor(
    (state) => state,
  );
  const cameraRef = useRef<OrbitControlsImpl>(null);
  const { floorRayPos, setFloorRayPos } = useRayCastFloor(buildingModel);

  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;

  useFrame((state, delta) => {
    if (commentAction === actions.ACTIVE) {
      setFloorRayPos(null);
      cameraMovingToggle(false);
      return;
    } else {
      const perspectiveCameraPos = new THREE.Vector3(0, 3, 40);
      if (floorRayPos) {
        setIsPerspective(false);
        cameraMovingToggle(true);
        const { x, y, z } = floorRayPos;
        walkThrougCameraPos.set(x, y + sightHeight, z);
      }
      if (typeof destinationFloor === 'number') {
        const { x, y, z } = floorDefaultPosition[destinationFloor];
        walkThrougCameraPos.set(x, y + sightHeight, z);
        cameraMovingToggle(true);
      }
      const perspectiveLookAt = new THREE.Vector3(0, 0, 0);
      if (cameraRef.current && cameraIsMoving) {
        handleFloorVisible('all');
        cameraRef.current.rotateSpeed = 0.3;
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
        cameraRef.current.target = isPerspective
          ? perspectiveLookAt
          : new THREE.Vector3(x + 0.0000001, y, z);

        //check Camera Moving or stop
        const endPoint = isPerspective ? perspectiveCameraPos : walkThrougCameraPos;
        const distanceToDestination =
          Math.floor(state.camera.position.distanceTo(endPoint) * 100) / 100;
        if (distanceToDestination < 0.5) {
          cameraMovingToggle(false);
          setDestinationFloor(null);
          setFloorRayPos(null);
        }
      }
    }
  });

  return (
    <>
      <OrbitControls ref={cameraRef} enableZoom={isPerspective ? true : false} makeDefault />
      <SettingModel buildingModel={buildingModel} />
    </>
  );
}
