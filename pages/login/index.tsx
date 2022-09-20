import { Flex, Text, Box, Button } from "@chakra-ui/react";

import Link from "next/link";

import Header from "../../components/header";
import RegisterInputForm from "../../components/registerInputForm";


export default function Login() {

  const inputForms = ["メールアドレス", "パスワード"]

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

	return (
    <>
      <Header/>
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" boxShadow= "0px 0px 15px -5px #777777" borderRadius="5px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize="30px" fontWeight="800" color="#666666" textAlign="center" >Login Form</Text>
            {inputForms.map((form:string) => (
              <RegisterInputForm key={form} form={form}/>
            ))}
            <Button type="submit" w="90%" h="50" py="5" ml="5" mt="5" color="#ffffff" colorScheme="red" fontWeight="800" >ログイン</Button>
            <Link href="/login/forgetPassword">
              <Text color="blue" mt="5" textAlign="center" cursor="pointer">パスワードを忘れた方はこちら</Text>
            </Link>
          </form>
        </Box>
      </Flex>
    </>
  );
}