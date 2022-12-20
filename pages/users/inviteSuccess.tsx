import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import TopBar from "../../components/nextComponents/topBar";

export default function () {
  return (
    <>
      <TopBar />
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px">
          <Text fontSize="20px" fontWeight="800" color="#666666" textAlign="center">
            招待メール送信完了
          </Text>
          <Link href={"/"}>
            <Button type="submit" w="90%" h="50" py="5" ml="5" mt="5" color="#ffffff" colorScheme="red" fontWeight="800">
              Top画面に戻る
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
}
