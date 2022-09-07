import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

type Building = {
  building: number
}

export default function BuildingLink({building}:Building) {
  return (
    <>
      <Flex bg="#ffffff" w="60%" h="100px" alignItems="center" m="0 auto 10px auto" boxShadow="0px 0px 15px -5px #777777" borderRadius="3px" justify="space-between">
        <Image src="/images/building.jpeg" objectFit="cover" boxSize="80px" ml="10px"/>
        <Box h="100%" w="100%">
          <Text fontSize="30px" w="100% - 20px" h="70%" lineHeight="70px" m="auto" fontWeight="800" color="#555555" ml="20px" cursor="pointer">BuildingName{building}</Text>
          <Text fontSize="15px" w="100% - 20px" h="30%" lineHeight="30px" m="auto" fontWeight="800" color="#555555" ml="20px" cursor="pointer">CreatedAt : 2022-09-11</Text>
        </Box>
        <InfoOutlineIcon mr="20px" fontSize="20px" cursor="pointer"/>
      </Flex>
    </>
  );
}