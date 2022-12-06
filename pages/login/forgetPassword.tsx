import { Box, Flex, Text, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";

import { useRouter } from "next/router";
import { useState } from "react";

import Header from "../../components/nextComponents/header";
import { toastText } from "../../components/utils/toastStatus";

export default function () {
  const inputForms = "Email";
  const title = "登録しているEmailを入力";
  const buttonText = "パスワードリセットフォームを送信";
  const redirectPath = "/login/checkEmail";

  const toast = useToast();
  const router = useRouter();
  const [inputEmail, setInputEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/password/forgot`, { email: inputEmail });
      router.push(redirectPath);
    } catch (error) {
      toast({ ...toastText.error, title: "入力されたメールアドレスは登録されておりません。" });
    }
  };

  return (
    <>
      <Header></Header>
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize="25px" fontWeight="800" color="#666666" textAlign="center">
              {title}
            </Text>
            <Input
              type="text"
              placeholder={inputForms}
              required
              sx={inputStyle}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <Button type="submit" sx={buttonStyle} colorScheme="red">
              {buttonText}
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
