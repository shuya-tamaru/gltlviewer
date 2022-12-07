import { Box, Button, Flex, Input, Link, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/nextComponents/header";
import { toastText } from "../../components/utils/toastStatus";

export default function () {
  const router = useRouter();
  const toast = useToast();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string>("");

  const redirectPath = "/login";

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
      router.push(redirectPath);
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
      <Header></Header>
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize="25px" fontWeight="800" color="#666666" textAlign="center">
              パスワードをリセット
            </Text>
            <Input ref={passwordRef} type="password" placeholder={"パスワード"} required sx={inputStyle} onChange={(e) => {}} />
            <Input ref={confirmRef} type="password" placeholder={"確認パスワード"} required sx={inputStyle} />
            <Button type="submit" w="90%" h="50" py="5" ml="5" mt="5" color="#ffffff" colorScheme="red" fontWeight="800">
              リセット
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
