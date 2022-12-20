import { Button, Flex, Input, Select, Text, VStack } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";

import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";

import TopBar from "../../../components/nextComponents/topBar";
import { Company } from "../../../types/Companys";
import { UserRoles } from "../../../types/UserRoles";
import { formStyle } from "../../../styles/formStyle";

type Props = {
  companyId: string;
};

export default function ({ companyId }: Props) {
  const router = useRouter();
  const roleList = Object.keys(UserRoles);
  const roleRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roleRef.current && emailRef.current) {
      const tokenData = {
        email: emailRef.current.value,
        role: Number(roleRef.current.value),
        companyId,
      };
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/registration/user`, tokenData);
      router.push("/users/inviteSuccess");
    }
  };

  return (
    <>
      <TopBar />
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <VStack w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px" textAlign="center">
          <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
            <Text fontSize="25px" fontWeight="800" color="#666666">
              新規ユーザーを招待
            </Text>
            <Input type="email" ref={emailRef} placeholder="email" required sx={{ ...formStyle, ml: "0" }} />
            <Select
              ref={roleRef}
              w="90%"
              h="50"
              mt="5"
              color="#666666"
              display="inline-block"
              cursor="pointer"
              variant="outline"
              required
              icon={<MdArrowDropDown />}
              placeholder="権限を選択"
            >
              {roleList.map((role, index) => {
                return (
                  <option key={index} value={index}>
                    {role}
                  </option>
                );
              })}
            </Select>
            <Button type="submit" w="90%" h="50" py="5" mt="10" color="#ffffff" colorScheme="red" fontWeight="800">
              送信
            </Button>
          </form>
        </VStack>
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/companys`).then((res) => res.data);
  if (!result) return;
  const paths: [{ params: { id: string } }] = result.map((company: Company) => ({
    params: { id: `${company.id}` },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  return { props: { companyId: params!.id } };
}
