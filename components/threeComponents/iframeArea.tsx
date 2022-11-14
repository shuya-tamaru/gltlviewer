import { Box } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import BottomMenu from './BottomMenu';

import Experience from './Experience';

export default function IframeArea() {
  return (
    <>
      <Box w='100%' h='92%' p='5px' position='relative'>
        <Canvas
          style={{ width: 'calc(100% - 5px)', height: 'calc(100% - 5px)', background: '#283b4f' }}
          id='viewer'
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [0, 0, 6],
          }}
        >
          <Perf />
          <Experience />
        </Canvas>
        <BottomMenu />

        {/* <iframe
          style={{ width: 'calc(100% - 5px)', height: 'calc(100% - 5px)', background: '#283b4f' }}
          src='https://playcanv.as/index/9d5d1068'
          id='viewer'
        /> */}
      </Box>
    </>
  );
}
