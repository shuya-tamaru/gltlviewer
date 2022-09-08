import { Box } from "@chakra-ui/react";

export default function IframeArea() {
  return (
    <>
      <Box w="100%" h="92%" p="2.5">
        <iframe style={{width: '100%', height: '100%'}} src="https://playcanv.as/p/348f9969/"/>
      </Box>
    </>
  );
}