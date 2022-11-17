import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import LoadingModel from './LoadingModel';
import Cursor from './Cursor';
import useRayCastFloor from '../../hooks/threeHooks/useRayCastFloor';
import useViewEvent from './stores/useViewEvent';

const sightHeight = 1.4;
let walkThrougCameraPos = new THREE.Vector3(0, 0 + sightHeight, 0);

type Props = {
  currentView: boolean;
  setCurrentView: Dispatch<SetStateAction<boolean>>;
};

export default function Experience({ currentView, setCurrentView }: Props) {
  const cameraRef = useRef<OrbitControlsImpl>(null);
  const isInitialRender = useRef(true);
  const [movingCamera, setMovingCamera] = useState(false);
  const { floorRayPos, setIsMove } = useRayCastFloor(setCurrentView);
  const handleVisibleFloors = useViewEvent((state) => state.handleFloorVisible);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    setMovingCamera(true);
  }, [currentView]);

  useFrame((state, delta) => {
    const perspectiveCameraPos = new THREE.Vector3(0, 3, 40);
    if (floorRayPos) {
      setMovingCamera(true);
      const { x, y, z } = floorRayPos;
      walkThrougCameraPos.set(x, y + sightHeight, z);
    }
    const perspectiveLookAt = new THREE.Vector3(0, 0, 0);

    //keep look at target
    const newlookPos = currentView ? perspectiveLookAt : walkThrougCameraPos;
    // state.camera.lookAt(newlookPos);

    if (cameraRef.current && movingCamera) {
      handleVisibleFloors('all');
      cameraRef.current.rotateSpeed = 0.3;
      const currentPos = new THREE.Vector3();
      currentPos.copy(state.camera.position);
      const cameraMoveSpeed = 2 * delta;
      const newPos = currentView
        ? currentPos.lerp(perspectiveCameraPos, cameraMoveSpeed)
        : currentPos.lerp(walkThrougCameraPos, cameraMoveSpeed);

      //setCameraPos
      state.camera.position.copy(newPos);

      //setOrbitTarget
      const nextTarget = new THREE.Vector3();
      const { x, y, z } = walkThrougCameraPos;
      cameraRef.current.target = currentView ? perspectiveLookAt : new THREE.Vector3(x + 0.0000001, y, z);

      //check Camera Moving or stop
      const endPoint = currentView ? perspectiveCameraPos : walkThrougCameraPos;
      const distanceToDestination = Math.floor(state.camera.position.distanceTo(endPoint) * 100) / 100;
      distanceToDestination < 3.0 && (setMovingCamera(false), setIsMove(false));
    }
  });

  return (
    <>
      <OrbitControls
        ref={cameraRef}
        enableZoom={currentView ? true : false}
        makeDefault
        // target={currentView ? perspectiveTarget : walkThrougTarget}
      />
      <Cursor />

      <LoadingModel />
    </>
  );
}
