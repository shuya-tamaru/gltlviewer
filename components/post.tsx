import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Post() {
	return (
    <>
      <Box w="100%" mb="5">
        <Flex alignItems="center" justify="space-between" borderBottom="2px" borderColor="#999">
          <Flex>
            <Image src="/images/pika.jpeg" objectFit="cover" boxSize="60px" borderRadius="50%" />
            <Box ml="5" color="#333">
              <Text fontSize="lg">userName</Text>
              <Text fontSize="xs">投降日:2022-01-01</Text>
              <Text fontSize="xs">更新日:2022-02-01</Text>
            </Box>
          </Flex>
          <BsThreeDotsVertical style={{color:"#333", cursor:"pointer"}} size={20}/>
        </Flex>
        <Box alignItems="center">
          <Flex my="2" mx="2" borderBottom="2px" borderColor="#999" borderStyle="dotted">
            Title:<Text>&nbsp;タイトル</Text>
          </Flex>
          <Text my="2" mx="2" >
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Text>
          <Image src="/images/building.jpeg" objectFit="cover" boxSize="100%" />
        </Box>
      </Box>
    </>

  )
}
