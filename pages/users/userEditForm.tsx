import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from 'react-icons/bi';
import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import Header from '../../components/header';
import { useCurrentUser } from '../../context/CurrentUserContext';

export default function () {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const title = 'ユーザー情報を編集';
  const endPoint = `buildings/${currentUser?.id}`;

  const [userLastName, setUserLastName] = useState<string>(currentUser!.lastName);
  const [userFirstName, setUserFirstName] = useState<string>(currentUser!.firstName);
  const [email, setEmail] = useState<string>(currentUser!.email);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/topPage/${currentUser!.companyId}`);
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Header></Header>
      <Flex w='100vw' h='calc(100vh - 80px)' display='flex' justify='center' alignItems='center' margin='auto'>
        <Box w='30%' bg='#ffffff' p='10px 10px 20px 10px' shadow='dark-lg' borderRadius='5px'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='25px' fontWeight='800' color='#666666' textAlign='center'>
              {title}
            </Text>
            <Input
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              type='text'
              placeholder='姓'
              required
              w='90%'
              h='50'
              py='5'
              ml='5'
              mt='5'
              color='#333333'
              borderColor='#999999'
              borderWidth='2px'
            />
            <Input
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
              type='text'
              placeholder='名'
              required
              w='90%'
              h='50'
              py='5'
              ml='5'
              mt='5'
              color='#333333'
              borderColor='#999999'
              borderWidth='2px'
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='email'
              required
              w='90%'
              h='50'
              py='5'
              ml='5'
              mt='5'
              color='#333333'
              borderColor='#999999'
              borderWidth='2px'
            />

            <Box
              {...getRootProps()}
              w='200px'
              h='150px'
              border='2px dotted gray'
              display='table'
              alignItems='center'
              textAlign='center'
              margin=' 15px auto'
              color='#666'
              bg='#f5f5f5'
              borderRadius='5px'
            >
              <input {...getInputProps()} type='file' style={{ display: 'none' }} />
              {isDragActive ? (
                <Text display='table-cell' verticalAlign='middle' alignItems='center'>
                  Drop the files here ...
                </Text>
              ) : (
                <BiImageAdd
                  style={{ cursor: 'pointer', display: 'table-cell', verticalAlign: 'middle', margin: 'auto' }}
                  size={150}
                />
              )}
            </Box>
            <Button
              type='submit'
              w='90%'
              h='50'
              py='5'
              ml='5'
              mt='5'
              color='#ffffff'
              colorScheme='red'
              fontWeight='800'
            >
              更新
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}
