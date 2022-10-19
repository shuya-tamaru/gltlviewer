import { Flex, Text, Box, Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

import { useRef, useState } from 'react';

import Header from '../../components/header';
import IconUploadForm from '../../components/iconUploadForm';
import { formStyle } from '../../styles/formStyle';
import { NewBuilding } from '../../types/Buildings';


export default function Registration() {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const buildingName = useRef<HTMLInputElement | null>(null);
  const companyId = useRef<HTMLInputElement | null>(null);
  const [file, setFiles] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newBuildings: NewBuilding = {
        name: buildingName.current!.value,
        companyId: companyId.current!.value,
      }

      //buildingIconUpload
      if (file) {
        const imageData = new FormData();
        const fileName = file.name;
        imageData.append("name", fileName);
        imageData.append("file", file);
        const imagePath: string = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/upload`, imageData).then(res => res.data);
        newBuildings.imagePath = imagePath;
      }

      //buildingRegistration
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings`, newBuildings)
      toast({
        position: 'top',
        title: '物件を登録しました',
        status: 'success',
        isClosable: true,
      })
      setLoading(false);
    } catch (error: any) {
      const errorMessage: string = error.response.data.message;
      setLoading(false);
      toast({
        position: 'top',
        title: `${errorMessage}`,
        status: 'warning',
        isClosable: true,
      })
    }

  };

  return (
    <>
      <Header />
      <Flex w='100vw' h='calc(100vh - 80px)' display='flex' justify='center' alignItems='center' margin='auto'>
        <Box w='30%' h="55%" bg='#ffffff' p='10px 10px 20px 10px' boxShadow='0px 0px 15px -5px #777777' borderRadius='5px'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='30px' fontWeight='800' color='#666666' textAlign='center'>
              新規物件登録
            </Text>
            <Input type='text' ref={buildingName} placeholder={'物件名'} required sx={formStyle} />
            <Input
              type='text'
              ref={companyId}
              placeholder={'会社ID'}
              defaultValue={'224bb556-d42c-4908-b531-bf2c86983376'}
              required
              sx={formStyle}
            />
            <IconUploadForm setFiles={setFiles} action={"buildingRegister"} />
            <Button
              isLoading={loading}
              type='submit'
              w='90%'
              h='50'
              py='5'
              ml='5'
              mt='5'
              color='#ffffff'
              colorScheme='red'
              fontWeight='600'
            >
              登録
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}
