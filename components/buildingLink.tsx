import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { useCurrentBuildingUpdate } from '../context/CurrentBuildingContext';

import { Building } from '../types/Buildings';

type Props = {
  building: Building;
};

export default function BuildingLink({ building }: Props) {
  const setCurrentBuilding = useCurrentBuildingUpdate();

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
        _hover={{ transform: 'scale(1.005)', opacity: 0.7 }}
      >
        <Link href={`/buildings/${building.id}`}>
          <Image src='/images/building.jpeg' objectFit='cover' boxSize='80px' ml='10px' cursor='pointer' />
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
          <Link href='/buildings/buildingEditForm'>
            <InfoOutlineIcon mr='20px' fontSize='20px' cursor='pointer' />
          </Link>
        </Box>
      </Flex>
    </>
  );
}
