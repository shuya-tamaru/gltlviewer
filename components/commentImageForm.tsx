import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { useDropzone } from "react-dropzone";

import { Dispatch, SetStateAction } from "react";


type Props = {
  images: File[],
  setImages: Dispatch<SetStateAction<File[]>>,
  existingPath?: string[],
  setExistingPaths?: Dispatch<SetStateAction<string[]>>,
}

export default function ({ images, setImages, existingPath, setExistingPaths }: Props) {

  const onDrop = (acceptedFiles: File[]) => {
    const currentFiles = [...images];
    acceptedFiles.map((image) => {
      currentFiles.push(image);
    })
    setImages(currentFiles);
  }

  const deleteIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const deleteIndex = Number(e.currentTarget.id);
    const newFiles = images.filter((_, index) => index !== deleteIndex)
    setImages(newFiles);
  }
  const deleteExistIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (existingPath && setExistingPaths) {
      const deleteIndex = Number(e.currentTarget.id);
      const deletePath = existingPath?.filter((_, index) => index !== deleteIndex)
      Array.isArray(deletePath) && setExistingPaths(deletePath);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Box
        {...getRootProps()}
        w='100%'
        h='20%'
        border='2px dotted gray'
        alignItems='center'
        textAlign='center'
        margin=' 15px auto'
        color='#666'
        bg='#f5f5f5'
        borderRadius='5px'
      >
        <input {...getInputProps()}
          type='file'
          style={{ width: "100px", visibility: 'hidden' }}
        />
        <Flex justify="space-between">
          {isDragActive ? (
            <Text display='table-cell' verticalAlign='middle' alignItems='center'>
              Drop the files here ...
            </Text>
          ) : (
            <BiImageAdd
              style={{ cursor: 'pointer', display: 'flex', verticalAlign: 'middle', margin: 'auto' }}
              size={100}
            />
          )}
        </Flex>
      </Box>
      <Flex justify="space-between" >
        {
          existingPath
          && existingPath.length > 0
          && existingPath.map((path, index) => {
            return (
              <Box key={index} display='table-cell' verticalAlign='middle' margin='auto' position="relative" ml="5">
                <Image src={`${path}`} objectFit='cover' boxSize='100px' />
                <Box position="absolute" width="30px" height="30px" right="-15px" top="-15px" cursor="pointer" onClick={e => deleteExistIcon(e)} id={index.toString()}>
                  <MdCancel size={30} color={'#111'} />
                </Box>
              </Box>
            )
          })
        }
        {
          images.length > 0
          && images.map((image, index) => {
            const path: string = URL.createObjectURL(image);
            return (
              <Box key={index} display='table-cell' verticalAlign='middle' margin='auto' position="relative" ml="5">
                <Image src={`${path}`} objectFit='cover' boxSize='100px' />
                <Box position="absolute" width="30px" height="30px" right="-15px" top="-15px" cursor="pointer" onClick={e => deleteIcon(e)} id={index.toString()}>
                  <MdCancel size={30} color={'#111'} />
                </Box>
              </Box>
            )
          })
        }
      </Flex>
    </>
  );
}