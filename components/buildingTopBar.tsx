import { Box, Button, Text } from "@chakra-ui/react";
import { AiOutlineComment } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { HiInformationCircle } from "react-icons/hi";

export default function BuildingTopBar() {
	return (
    <>
    <Box w="100%" h="8%" px="20px" position="relative" borderBottom="2px" borderColor="#999">
      <Text fontSize="30px" fontWeight="750" color="#666666" position="absolute" bottom="0" left="20px" cursor="pointer">BuildingName</Text>
      <Box position="absolute" bottom="0" right="20px" >
        <Button w="160px" colorScheme="red" ml="5px" borderRadius="4px" leftIcon={<HiInformationCircle size={25}/>}>建物情報</Button>
        <Button w="160px" colorScheme="red" ml="5px" borderRadius="4px" leftIcon={<BsGraphUp size={25}/>}>グラフ</Button>
        <Button w="160px" colorScheme="red" ml="5px" borderRadius="4px" leftIcon={<BiUserPlus size={25}/>}>ゲストを招待</Button>
        <Button w="160px" colorScheme="red" ml="5px" borderRadius="4px" leftIcon={<AiOutlineComment size={25}/>}>コメント検索</Button>
      </Box>
    </Box>
    </>
  )
}
