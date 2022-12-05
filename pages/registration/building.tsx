import { Flex, Text, Box, Button, Input, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { BsBuilding } from "react-icons/bs";
import { FaCube } from "react-icons/fa";

import React, { useRef, useState } from "react";

import Header from "../../components/nextComponents/header";
import { toastText } from "../../components/utils/toastStatus";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { formStyle } from "../../styles/formStyle";
import { NewBuilding } from "../../types/Buildings";

export default function Registration() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser = useCurrentUser();

  const buildingName = useRef<HTMLInputElement>(null);
  const companyId = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const [file, setFiles] = useState<File | null>(null);
  const [model, setModel] = useState<File | null>(null);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.id === "modelInputButton" && modelInputRef.current?.click();
    e.currentTarget.id === "iconInputButton" && iconInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBuildings: NewBuilding = {
      name: buildingName.current!.value,
      companyId: companyId.current!.value,
      modelPath: "",
    };
    try {
      setLoading(true);

      // buildingModelUpload
      if (model) {
        const modelData = new FormData();
        const modelName = model.name;
        modelData.append("name", modelName);
        modelData.append("file", model);
        const modelPath: string = await axios
          .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/upload/model`, modelData)
          .then((res) => res.data);
        newBuildings.modelPath = modelPath;
      } else {
        toast({ ...toastText.error, title: "modelデータをuploadしてください。" });
        return;
      }

      // buildingIconUpload
      if (file) {
        const imageData = new FormData();
        const fileName = file.name;
        imageData.append("name", fileName);
        imageData.append("file", file);
        const imagePath: string = await axios
          .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/upload`, imageData)
          .then((res) => res.data);
        newBuildings.imagePath = imagePath;
      }

      // buildingRegistration
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings`, newBuildings);
      toast({
        position: "top",
        title: "物件を登録しました",
        status: "success",
        isClosable: true,
      });
      setLoading(false);
      router.push(`/topPage/${currentUser!.companyId}`);
    } catch (error: any) {
      const errorMessage: string = error.response.data.message;
      setLoading(false);
      toast({
        position: "top",
        title: `${errorMessage}`,
        status: "warning",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" h="55%" bg="#ffffff" p="10px 10px 20px 10px" boxShadow="0px 0px 15px -5px #777777" borderRadius="5px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <VStack>
              <Text fontSize="30px" fontWeight="800" color="#666666">
                新規物件登録
              </Text>
              <Input type="text" ref={buildingName} placeholder={"物件名"} required sx={formStyle} />
              <Input
                ref={modelInputRef}
                type="file"
                accept=".glb"
                placeholder={""}
                required
                hidden
                onChange={(e) => {
                  e.target.files && setModel(e.target.files[0]);
                }}
                border="none"
              />
              <Flex w="90%" h="50px">
                <Button
                  w={model ? "50%" : "100%"}
                  h="50px"
                  id="modelInputButton"
                  colorScheme={"teal"}
                  onClick={onButtonClick}
                  leftIcon={<FaCube size={25} />}
                >
                  モデルを選択 (.glb形式)
                </Button>
                {model && (
                  <Text w="50%" fontSize="12px" textAlign={"center"} h="50px" lineHeight={"50px"}>
                    {`選択されたファイル : ${model.name}`}
                  </Text>
                )}
              </Flex>
              <Input
                ref={iconInputRef}
                type="file"
                accept=".png, .jpg, .jpeg"
                placeholder={""}
                required
                hidden
                onChange={(e) => {
                  e.target.files && setFiles(e.target.files[0]);
                }}
                border="none"
              />
              <Flex w="90%" h="50px">
                <Button
                  w={file ? "50%" : "100%"}
                  h="50px"
                  id="iconInputButton"
                  colorScheme={"teal"}
                  onClick={onButtonClick}
                  leftIcon={<BsBuilding size={25} />}
                >
                  物件アイコン選択
                </Button>
                {file && (
                  <Text w="50%" fontSize="12px" textAlign={"center"} h="50px" lineHeight={"50px"}>
                    {`選択されたファイル : ${file.name}`}
                  </Text>
                )}
              </Flex>
              <Input
                type="text"
                ref={companyId}
                placeholder={"会社ID"}
                defaultValue={"224bb556-d42c-4908-b531-bf2c86983376"}
                required
                hidden
                sx={formStyle}
              />
              <Button isLoading={loading} type="submit" sx={buttonStyle} colorScheme="red">
                登録
              </Button>
            </VStack>
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
