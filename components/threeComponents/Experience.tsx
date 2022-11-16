import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { useEffect, useRef, useState } from 'react';

import LoadingModel from './LoadingModel';
import Cursor from './Cursor';
import useRayCastFloor from '../../hooks/threeHooks/useRayCastFloor';

const sightHeight = 1.4;
let walkThrougCameraPos = new THREE.Vector3(0, 0 + sightHeight, 0);

type Props = {
  currentView: boolean;
};

export default function Experience({ currentView }: Props) {
  const cameraRef = useRef<OrbitControlsImpl>(null);
  const isInitialRender = useRef(true);
  const [movingCamera, setMovingCamera] = useState(false);
  const { floorRayPos, isMove, setIsMove } = useRayCastFloor();

  useEffect(() => {
    console.log(currentView);
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    isMove && setMovingCamera(true);
    setMovingCamera(true);
  }, [currentView, isMove]);

  useFrame((state, delta) => {
    // console.log(currentView);
    const perspectiveCameraPos = new THREE.Vector3(0, 3, 40);
    if (floorRayPos) {
      const { x, y, z } = floorRayPos;
      walkThrougCameraPos.set(x, y + sightHeight, z);
    }
    const perspectiveLookAt = new THREE.Vector3(0, 0, 0);

    //keep look at target
    const newlookPos = currentView ? perspectiveLookAt : walkThrougCameraPos;
    // state.camera.lookAt(newlookPos);

    if (cameraRef.current && movingCamera) {
      const currentPos = new THREE.Vector3();
      currentPos.copy(state.camera.position);
      const cameraMoveSpeed = 4 * delta;
      const newPos = currentView
        ? currentPos.lerp(perspectiveCameraPos, cameraMoveSpeed)
        : currentPos.lerp(walkThrougCameraPos, cameraMoveSpeed);

      //setCameraPos
      state.camera.position.copy(newPos);

      //setOrbitTarget
      const { x, y, z } = walkThrougCameraPos;
      cameraRef.current.target = currentView ? perspectiveLookAt : new THREE.Vector3(x + 0.0000001, y, z);

      //check Camera Moving or stop
      const endPoint = currentView ? perspectiveCameraPos : walkThrougCameraPos;
      const distanceToDestination = Math.floor(state.camera.position.distanceTo(endPoint) * 100) / 100;
      distanceToDestination < 0.01 && (setMovingCamera(false), setIsMove(false));
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
