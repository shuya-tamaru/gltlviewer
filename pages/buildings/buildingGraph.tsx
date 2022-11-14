import { Box, Flex } from '@chakra-ui/react';
import BuildingTopBar from '../../components/nextComponents/buildingTopBar';
import Header from '../../components/nextComponents/header';
import UserName from '../../components/nextComponents/userName';

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
            長期修繕計画など
          </Box>
        </Box>
      </Flex>
    </>
  );
}
