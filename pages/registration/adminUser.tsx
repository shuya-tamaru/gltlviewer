import { Flex, Text, Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";

import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import Header from "../../components/nextComponents/header";
import { useCurrentUserUpdate } from "../../context/CurrentUserContext";
import { User } from "../../types/Users";
import { formStyle } from "../../styles/formStyle";
import IconUploadForm from "../../components/nextComponents/iconUploadForm";
import { Company } from "../../types/Companys";
import { toastText } from "../../components/utils/toastStatus";
import { UserRoles } from "../../types/UserRoles";
import { RegistrationToken } from "../../types/RegistrationToken";

export default function () {
  const router = useRouter();
  const toast = useToast();
  const setCurrentUser = useCurrentUserUpdate();
  const [loading, setLoading] = useState<boolean>(false);

  const lastName = useRef<HTMLInputElement | null>(null);
  const firstName = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordConfirmation = useRef<HTMLInputElement | null>(null);
  const [file, setFiles] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.current!.value !== passwordConfirmation.current!.value) {
      toast({ ...toastText.error, title: "確認用パスワードが一致しません" });
    } else {
      try {
        setLoading(true);
        const query = router.query;
        const token = query.token as string;
        const queryCompany: Pick<Company, "name" | "address" | "phoneNumber"> = JSON.parse(query.company as string);

        const isValidToken: Omit<RegistrationToken, "role" | "companyId"> = await axios
          .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/registration/checkToken`, { token })
          .then((res) => res.data);
        if (!isValidToken) {
          toast({ ...toastText.error, title: "URLの有効期限が切れています。" });
          return;
        }

        const company: Company = await axios
          .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/companys`, queryCompany)
          .then((res) => res.data);

        const newUser: Omit<User, "id" | "createdAt" | "updatedAt"> = {
          lastName: lastName.current!.value,
          firstName: firstName.current!.value,
          email: email.current!.value,
          password: password.current!.value,
          companyId: company.id,
          userRole: UserRoles.CompanyAdmin,
        };

        //userIconUpload
        if (file) {
          const imageData = new FormData();
          const fileName = file.name;
          imageData.append("name", fileName);
          imageData.append("file", file);
          const imagePath: string = await axios
            .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/upload`, imageData)
            .then((res) => res.data);
          newUser.imagePath = imagePath;
        }

        //signUp
        await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/auth/signup`, newUser);

        //deleteToken
        await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/registration/deleteToken/${isValidToken.id}`);

        // signIn
        await signIn("credentials", {
          email: newUser.email,
          password: newUser.password,
          redirect: false,
        }).then(async () => {
          const session = await getSession();
          const user = session ? (session.userData as User) : null;
          setCurrentUser(user);
          const companyId: string = user!.companyId;
          toast({ ...toastText.success, title: '"ユーザー登録に成功しました' });
          router.push(`/topPage/${companyId}`);
        });
      } catch (error: any) {
        const errorMessage: string = error.response.data.message;
        setLoading(false);
        toast({ ...toastText.error, title: `${errorMessage}` });
      }
    }
  };

  return (
    <>
      <Header />
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" h="100%" bg="#ffffff" p="10px 10px 20px 10px" boxShadow="0px 0px 15px -5px #777777" borderRadius="5px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize="30px" fontWeight="800" color="#666666" textAlign="center">
              新規ユーザー登録
            </Text>
            <Input type="text" ref={lastName} placeholder={"姓"} required sx={formStyle} />
            <Input type="text" ref={firstName} placeholder={"名"} required sx={formStyle} />
            <Input type="email" ref={email} placeholder={"メールアドレス"} required sx={formStyle} />
            <Input type="password" ref={password} placeholder={"パスワード"} required sx={formStyle} />
            <Input type="password" ref={passwordConfirmation} placeholder={"パスワード確認"} required sx={formStyle} />
            <Input type="text" value="管理者ユーザーとして登録" required sx={formStyle} isDisabled />
            <IconUploadForm setFiles={setFiles} action={"userSignin"} />
            <Button isLoading={loading} type="submit" sx={buttonStyle} colorScheme="red">
              新規登録
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
  fontWeight: "600",
};
