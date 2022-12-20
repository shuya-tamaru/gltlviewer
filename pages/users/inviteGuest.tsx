import { Button, Flex, Input, Select, Text, VStack } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";

import TopBar from "../../components/nextComponents/topBar";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { UserRoles } from "../../types/UserRoles";
import { useRef } from "react";
import { formStyle } from "../../styles/formStyle";

export default function () {
  const inputForms = ["email"];
  const radioForms = ["権限1", "権限2"];
  const title = "ゲストユーザーを招待";
  const buttonText = "ゲストユーザー登録フォーム送信";
  const redirectPath = "/users/inviteGuestSuccess";
  const redirectPage = true;

  const router = useRouter();
  const roleList = Object.keys(UserRoles);
  const roleRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const currentUser = useCurrentUser();
  if (currentUser) {
    currentUser.userRole > UserRoles.Editor && router.push(`/topPage/${currentUser.companyId}`);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (roleRef.current && emailRef.current) {
    //   const tokenData = {
    //     email: emailRef.current.value,
    //     role: Number(roleRef.current.value),
    //     companyId,
    //   };
    //   await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/registration/user`, tokenData);
    //   router.push("/users/inviteSuccess");
    // }
  };

  return (
    currentUser &&
    currentUser.userRole <= UserRoles.Editor && (
      <>
        <TopBar />
        <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
          <VStack w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px" textAlign="center">
            <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
              <Text fontSize="25px" fontWeight="800" color="#666666">
                ゲストユーザーを招待
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
                    index <= 1 && (
                      <option key={index} value={index}>
                        {role}
                      </option>
                    )
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
    )
  );
}
