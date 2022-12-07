import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

import { useRef } from "react";

import Header from "../../components/nextComponents/header";
import { toastText } from "../../components/utils/toastStatus";

export default function () {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/registration/company`, { email: emailRef.current!.value });
      emailRef.current!.value = "";
      toast({ ...toastText.success, title: "入力されたメールアドレスにフォームを送信しました。" });
    } catch (error) {
      toast({ ...toastText.error, title: "送信に失敗しました。" });
    }
  };

  return (
    <>
      <Header></Header>
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize="25px" fontWeight="800" color="#666666" textAlign="center">
              会社登録フォームを送信するEmail
            </Text>
            <Input type="text" ref={emailRef} placeholder={"Email"} required sx={inputStyle} />
            <Button type="submit" colorScheme="red" sx={buttonStyle}>
              送信
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}

const inputStyle = {
  w: "90%",
  h: "50",
  py: "5",
  ml: "5",
  mt: "5",
  color: "#333333",
  borderColor: "#999999",
  borderWidth: "2px",
};

const buttonStyle = {
  w: "90%",
  h: "50",
  py: "5",
  ml: "5",
  mt: "5",
  color: "#ffffff",
  fontWeight: "800",
};
