import { Box, Flex, Image, Text } from '@chakra-ui/react';

import Link from 'next/link';

import { Building } from '../../types/Buildings';
import ModalBuildingUpdate from './modalBuildingUpdate';

type Props = {
  building: Building;
};

export default function BuildingLink({ building }: Props) {
  return (
    <>
      <Flex
        bg='#ffffff'
        w='60%'
        h='100px'
        alignItems='center'
        m='0 auto 10px auto'
        boxShadow='2xl'
        borderRadius='3px'
        justify='space-between'
        transition='all 0.5s ease'
        _hover={{ transform: 'scale(1.001)', opacity: 0.7 }}
      >
        <Link href={`/buildings/${building.id}`}>
          <Image
            src={building.imagePath ? building.imagePath : '/images/building.jpeg'}
            objectFit='cover'
            boxSize='80px'
            ml='10px'
            cursor='pointer'
          />
        </Link>
        <Box h='100%' w='100%'>
          <Link href={`/buildings/${building.id}`}>
            <Text
              fontSize='3xl'
              w='100% - 20px'
              h='70%'
              lineHeight='70px'
              m='auto'
              fontWeight='800'
              color='#555555'
              ml='20px'
              cursor='pointer'
            >
              {building.name}
            </Text>
          </Link>
          <Text fontSize='xl' w='100% - 20px' h='30%' lineHeight='30px' m='auto' fontWeight='800' color='#555555' ml='20px'>
            CreatedAt : {building.createdAt.substring(0, 10)}
          </Text>
        </Box>
        <Box position='relative'>
          <ModalBuildingUpdate building={building} />
        </Box>
      </Flex>
    </>
  );
}
