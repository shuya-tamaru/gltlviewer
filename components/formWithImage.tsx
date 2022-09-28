import { Box, Button, Flex, Text } from '@chakra-ui/react';

import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from 'react-icons/bi';

import { useCallback } from 'react';

import RegisterInputForm from './registerInputForm';

type inputForms = {
  inputForms?: string[];
  title: string;
  buttonText: string;
  redirectPath: string;
  redirectPage: boolean;
};

export default function ({ inputForms, title, buttonText, redirectPath, redirectPage }: inputForms) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Flex w='100vw' h='calc(100vh - 80px)' display='flex' justify='center' alignItems='center' margin='auto'>
        <Box w='30%' bg='#ffffff' p='10px 10px 20px 10px' shadow='dark-lg' borderRadius='5px'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='25px' fontWeight='800' color='#666666' textAlign='center'>
              {title}
            </Text>
            {inputForms && inputForms.map((form: string) => <RegisterInputForm key={form} form={form} />)}
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
            {redirectPage ? (
              <Link href={redirectPath}>
                <Button type='submit' w='90%' h='50' py='5' ml='5' color='#ffffff' colorScheme='red' fontWeight='800'>
                  {buttonText}
                </Button>
              </Link>
            ) : (
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
                {buttonText}
              </Button>
            )}
          </form>
        </Box>
      </Flex>
    </>
  );
}
