import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import Header from "../../components/nextComponents/header";

export default function () {
  return (
    <>
      <Header />
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px">
          <Text fontSize="18px" fontWeight="600" color="#666666" textAlign="center">
            パスワードのリセットが完了しました
          </Text>
          <Link href={"/login"}>
            <Button type="submit" w="90%" h="50" py="5" ml="5" mt="5" color="#ffffff" colorScheme="red" fontWeight="800">
              ログインフォームに移動
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
}
