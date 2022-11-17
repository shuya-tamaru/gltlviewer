import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { useRef } from 'react';

import LoadingModel from './LoadingModel';
import Cursor from './Cursor';
import useRayCastFloor from '../../hooks/threeHooks/useRayCastFloor';
import useViewEvent from './stores/useViewEvent';

const sightHeight = 1.4;
let walkThrougCameraPos = new THREE.Vector3(0, 0 + sightHeight, 0);

export default function Experience() {
  const isPerspective = useViewEvent((state) => state.isPerspective);
  const cameraRef = useRef<OrbitControlsImpl>(null);
  const cameraIsMoving = useViewEvent((state) => state.cameraIsMoving);
  const cameraMovingToggle = useViewEvent((state) => state.cameraMovingToggle);
  const floorRayPos = useRayCastFloor();
  const handleVisibleFloors = useViewEvent((state) => state.handleFloorVisible);

  useFrame((state, delta) => {
    const perspectiveCameraPos = new THREE.Vector3(0, 3, 40);
    if (floorRayPos) {
      const { x, y, z } = floorRayPos;
      walkThrougCameraPos.set(x, y + sightHeight, z);
    }
    const perspectiveLookAt = new THREE.Vector3(0, 0, 0);
    if (cameraRef.current && cameraIsMoving) {
      handleVisibleFloors('all');
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
      cameraRef.current.target = isPerspective ? perspectiveLookAt : new THREE.Vector3(x + 0.0000001, y, z);

      //check Camera Moving or stop
      const endPoint = isPerspective ? perspectiveCameraPos : walkThrougCameraPos;
      const distanceToDestination = Math.floor(state.camera.position.distanceTo(endPoint) * 100) / 100;
      distanceToDestination < 0.5 && cameraMovingToggle(false);
    }
  });

  return (
    <>
      <OrbitControls ref={cameraRef} enableZoom={isPerspective ? true : false} makeDefault />
      <Cursor />
      <LoadingModel />
    </>
  );
}
