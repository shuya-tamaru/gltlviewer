import { Box } from '@chakra-ui/react';

export default function IframeArea() {
  return (
    <>
      <Box w='100%' h='92%' p='5px'>
        <iframe
          style={{ width: 'calc(100% - 5px)', height: 'calc(100% - 5px)', background: '#283b4f' }}
          src='https://playcanv.as/index/9d5d1068'
          id='viewer'
        />
      </Box>
    </>
  );
}
