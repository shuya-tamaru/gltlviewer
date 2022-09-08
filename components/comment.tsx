import { Box, Flex, Text, Image} from "@chakra-ui/react";

export default function Comment() {
	return (
    <>
      <Flex p="5" boxShadow="dark-lg" mb="10" cursor="pointer">
        <Box w="20%" borderRight="2px">
          <Flex alignItems="center" justify="space-between" >
            <Flex>
              <Image src="/images/pika.jpeg" objectFit="cover" boxSize="60px" borderRadius="50%" />
              <Box ml="5" color="#333">
                <Text fontSize="lg">userName</Text>
                <Text fontSize="xs">投降日:2022-01-01</Text>
                <Text fontSize="xs">更新日:2022-02-01</Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box w="80%" display="flex" flexDirection="column" ml="3">
          <Text borderBottom="2px" borderColor="#666">タイトル: タイトル</Text>
          <Text fontSize="20">
            ntentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContents
            ContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContents
            ContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContentsContents
          </Text>
        </Box>
      </Flex>
    </>
  );
}
