import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import LoadingModel from './LoadingModel';

type CurrentViewProps = {
  currentViewProps: [boolean, Dispatch<SetStateAction<boolean>>];
};

export default function Experience({ currentViewProps }: CurrentViewProps) {
  const [currentView] = currentViewProps;

  const ref = useRef<OrbitControlsImpl>(null);

  const { camera, raycaster } = useThree();
  // useFrame((state) => {
  //   // const perspectiveTarget = new THREE.Vector3(0, 0, 0);
  //   // const walkThrougTarget = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
  //   if (ref.current) {
  //     const target = currentView
  //       ? new THREE.Vector3(0, 3, 40)
  //       : new THREE.Vector3(state.camera.position.x + 0.001, state.camera.position.y, state.camera.position.z);
  //     ref.current.target = target;
  //   }
  // });

  useEffect(() => {
    const walkThrougPosition = new THREE.Vector3(0, 4, 0);
    const perspectiveCameraPosition = new THREE.Vector3(0, 3, 40);
    const toMovePosition = currentView ? perspectiveCameraPosition : walkThrougPosition;
    // camera.position.set(toMovePosition.x, toMovePosition.y, toMovePosition.z);
    if (ref.current) {
      const newPos = ref.current.object.position.set(toMovePosition.x, toMovePosition.y, toMovePosition.z);
      const { x, y, z } = newPos;
      ref.current.target = currentView ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(x + 0.001, y, z);
    }
  }, [currentView]);

  return (
    <>
      <OrbitControls
        ref={ref}
        enableZoom={currentView ? true : false}
        makeDefault
        // target={currentView ? perspectiveTarget : walkThrougTarget}
      />
      <LoadingModel />
    </>
  );
}
