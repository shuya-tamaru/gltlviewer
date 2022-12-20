import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import Header from "../../components/nextComponents/header";
import { toastText } from "../../components/utils/toastStatus";
import { formStyle } from "../../styles/formStyle";

export default function () {
  const router = useRouter();
  const toast = useToast();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordRef.current && confirmRef.current && passwordRef.current.value !== confirmRef.current.value) {
      toast({ ...toastText.error, title: "パスワードと確認用パスワードが一致しません" });
      return;
    }

    try {
      const resetPassword = {
        token: token,
        password: passwordRef.current!.value,
        password_confirm: confirmRef.current!.value,
      };
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/password/reset`, resetPassword);
      toast({ ...toastText.success, title: "パスワードのリセットが完了しました。ログインフォームからログインしてください" });
      router.push("/login");
    } catch (error) {
      toast({ ...toastText.error, title: "error" });
    }
  };

  useEffect(() => {
    const getToken: string = router.query.token as string;
    setToken(getToken);
  }, [router.query]);

  return (
    <>
      <Header />
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize="25px" fontWeight="800" color="#666666" textAlign="center">
              パスワードをリセット
            </Text>
            <Input ref={passwordRef} type="password" placeholder={"新しいパスワード"} required sx={formStyle} />
            <Input ref={confirmRef} type="password" placeholder={"新しいパスワードの確認 再入力"} required sx={formStyle} />
            <Button type="submit" sx={buttonStyle} colorScheme="red">
              リセット
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}

const buttonStyle = {
  w: "90%",
  h: "50",
  py: "5",
  ml: "5",
  mt: "5",
  color: "#ffffff",
  fontWeight: "800",
};
