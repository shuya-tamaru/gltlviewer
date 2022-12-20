import { Box, Text } from "@chakra-ui/react";

import Header from "../../components//nextComponents/header";

export default function () {
  return (
    <>
      <Header></Header>
      <Box
        w="100vw"
        h="calc(100vh - 80px)"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        margin="auto"
      >
        <Text sx={style}>入力されたEmail宛にパスワードのリセットフォームを送付しました。</Text>
        <Text sx={style}>メールをご確認ください。</Text>
      </Box>
    </>
  );
}

const style = {
  fontSize: "25px",
  fontWeight: "800",
  color: "#666666",
};
