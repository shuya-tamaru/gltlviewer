import { Box, Flex } from '@chakra-ui/react';
import BuildingTopBar from '../../components/buildingTopBar';
import Header from '../../components/header';
import UserName from '../../components/userName';

export default function () {
  return (
    <>
      <Header>
        <UserName />
      </Header>
      <Flex>
        <Box w='100%' h='calc(100vh - 80px)'>
          <BuildingTopBar />
          <Box w='100%' h='92%' bg='blue' p='5px' fontSize='100'>
            建物情報が来る予定
          </Box>
        </Box>
      </Flex>
    </>
  );
}
