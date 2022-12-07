import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/nextComponents/header";

export default function () {
  const name = useRef<HTMLInputElement | null>(null);
  const address = useRef<HTMLInputElement | null>(null);
  const phoneNumber = useRef<HTMLInputElement | null>(null);
  const [token, setToken] = useState<string>("");

  const router = useRouter();
  const redirectPath = "/registration/adminUser";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const companyData = {
      name: name.current!.value,
      address: address.current!.value,
      phoneNumber: phoneNumber.current!.value,
    };
    const companyDataJSON = JSON.stringify(companyData);
    router.push({
      pathname: redirectPath,
      query: { company: companyDataJSON, token },
    });
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
              会社登録
            </Text>
            <Input type="text" ref={name} placeholder={"会社名"} required sx={inputStyle} />
            <Input type="text" ref={address} placeholder={"会社住所"} required sx={inputStyle} />
            <Input type="text" ref={phoneNumber} placeholder={"電話番号"} required sx={inputStyle} />
            <Button type="submit" sx={buttonStyle} colorScheme="red">
              登録
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
