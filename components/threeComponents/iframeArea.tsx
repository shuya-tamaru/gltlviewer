import { Box } from '@chakra-ui/react';
import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import useCurrentView from '../../hooks/threeHooks/useCurrentView';

import BottomMenu from './BottomMenu';
import Debug from './Debug';
import Experience from './Experience';

export default function IframeArea() {
  const { currentView, setCurrentView } = useCurrentView();

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
            // position: [2.5, 4, 6],
          }}
        >
          <Debug />
          <Experience currentView={currentView} setCurrentView={setCurrentView} />
        </Canvas>
        <BottomMenu currentView={currentView} setCurrentView={setCurrentView} />
      </Box>
    </>
  );
}

/* <iframe
  style={{ width: 'calc(100% - 5px)', height: 'calc(100% - 5px)', background: '#283b4f' }}
  src='https://playcanv.as/index/9d5d1068'
  id='viewer'
/> */
