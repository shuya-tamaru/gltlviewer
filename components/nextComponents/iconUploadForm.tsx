import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Building } from "../../types/Buildings";

type Props = {
  setFiles: Dispatch<SetStateAction<File | null>>;
  action: string;
  building?: Building;
};

export default function ({ setFiles, action, building }: Props) {
  const [paths, setPaths] = useState<string[]>([]);
  const currentUser = useCurrentUser();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.map((file: File) => {
        setFiles(file);
      });
      setPaths(
        acceptedFiles.map((file) => {
          return URL.createObjectURL(file) as string;
        })
      );
    },
    [setPaths]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Box
        {...getRootProps()}
        w="250px"
        h="150px"
        border="2px dotted gray"
        alignItems="center"
        textAlign="center"
        margin=" 15px auto"
        color="#666"
        bg="#f5f5f5"
        borderRadius="5px"
      >
        <input
          {...getInputProps()}
          type="file"
          onChange={(e) => {
            e.target.files && e.target.files.length > 0 && setFiles(e.target.files[0]);
          }}
          style={{ width: "100px", visibility: "hidden" }}
        />
        <Flex justify="space-between">
          {isDragActive ? (
            <Text display="table-cell" verticalAlign="middle" alignItems="center">
              Drop the files here ...
            </Text>
          ) : (
            <BiImageAdd
              style={{ cursor: "pointer", display: "table-cell", verticalAlign: "middle", margin: "auto" }}
              size={100}
            />
          )}
          {(action === "userSignin" || action === "userUpdate") && paths.length > 0 ? (
            <Image src={`${paths[0]}`} sx={iconPreviewStyle} />
          ) : action === "userUpdate" && currentUser?.imagePath ? (
            <Image src={`${currentUser?.imagePath}`} sx={iconPreviewStyle} />
          ) : (
            <></>
          )}
          {(action === "buildingRegister" || action === "buildingUpdate") && paths.length > 0 ? (
            <Image src={`${paths[0]}`} sx={{ ...iconPreviewStyle, borderRadius: "0%" }} />
          ) : action === "buildingUpdate" && building?.imagePath ? (
            <Image src={`${building?.imagePath}`} sx={{ ...iconPreviewStyle, borderRadius: "0%" }} />
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </>
  );
}

const iconPreviewStyle = {
  display: "table-cell",
  verticalAlign: "middle",
  margin: "auto",
  objectFit: "cover",
  boxSize: "100px",
  borderRadius: "50%",
};
