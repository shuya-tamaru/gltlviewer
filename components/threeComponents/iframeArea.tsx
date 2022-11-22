import { Box } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';

import BottomMenu from './BottomMenu';
import Debug from './Debug';
import DisplayCurrentFloor from './DisplayCurrentFloor';
import Experience from './Experience';
import LoadingDisplay from './LoadingDisplay';
import PopupText from './PopupText';
import useViewEvent from './stores/useViewEvent';

export default function IframeArea() {
  const perspectiveCameraPos = useViewEvent((state) => state.perspectiveCameraPos);

  return (
    <>
      <Box w='100%' h='92%' p='5px' position='relative'>
        <Canvas
          style={{ width: 'calc(100% - 5px)', height: 'calc(100% - 5px)', background: '#283b4f' }}
          id='viewer'
          shadows
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          camera={{
            fov: 75,
            near: 0.1,
            far: 200,
            position: perspectiveCameraPos,
          }}
        >
          <Debug />
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
        <LoadingDisplay />
        <BottomMenu />
        <DisplayCurrentFloor />
        <PopupText />
      </Box>
    </>
  );
}

/* <iframe
  style={{ width: 'calc(100% - 5px)', height: 'calc(100% - 5px)', background: '#283b4f' }}
  src='https://playcanv.as/index/9d5d1068'
  id='viewer'
/> */
