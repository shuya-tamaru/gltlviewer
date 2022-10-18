import { AlertDialogFooter, Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from 'react-icons/bi';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { useCurrentUser, useCurrentUserUpdate } from '../context/CurrentUserContext';
import axios from 'axios';

const styles = {
  w: '90%',
  h: '50',
  py: '5',
  ml: '5',
  mt: '5',
  color: '#333333',
  borderColor: '#999999',
  borderWidth: '2px',
};

export default function () {
  const { status } = useSession();
  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserUpdate();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [file, setFiles] = useState<any>(null);
  const [paths, setPaths] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const updateUser = {
        ...currentUser,
        lastName,
        firstName,
        email,
      };

      //userIconUpload
      if (file && currentUser && currentUser.imagePath) {
        const currentImagePath: string = currentUser.imagePath.split('/').slice(-1)[0];;
        await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/delete/${currentImagePath}`)

        const imageData = new FormData();
        const fileName = file.name;
        imageData.append("name", fileName);
        imageData.append("file", file);
        const imagePath: string = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/upload`, imageData).then(res => res.data);
        updateUser.imagePath = imagePath;
      }
      await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${updateUser.id}`, updateUser);
      setLoading(true);

      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/auth/signout`);
      setCurrentUser(null);
      signOut({ redirect: false });
      alert('更新が完了しました、再度ログインしてください');
      router.push('/login');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && currentUser) {
      setLastName(currentUser!.lastName);
      setFirstName(currentUser!.firstName);
      setEmail(currentUser!.email);
    }
  }, [currentUser]);

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.map((file: any) => {
      setFiles(file)
    })
    setPaths(acceptedFiles.map((file: any) => {
      return URL.createObjectURL(file)
    }))
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type='text' placeholder='姓' required sx={styles} />
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type='text'
          placeholder='名'
          required
          sx={styles}
        />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='email' required sx={styles} />

        <Box
          {...getRootProps()}
          w='250px'
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
          <input {...getInputProps()}
            type='file'
            onChange={(e) => {
              (e.target.files && e.target.files.length > 0) && setFiles(e.target.files[0])
            }}
            style={{ width: "100px", visibility: 'hidden' }}
          />
          <Flex justify="space-between">
            {isDragActive ? (
              <Text display='table-cell' verticalAlign='middle' alignItems='center'>
                Drop the files here ...
              </Text>
            ) : (
              <BiImageAdd
                style={{ cursor: 'pointer', display: 'table-cell', verticalAlign: 'middle', margin: 'auto' }}
                size={100}
              />
            )}
            {paths.length > 0
              ? <Image src={`${paths[0]}`} display='table-cell' verticalAlign='middle' margin='auto' objectFit='cover' boxSize='100px' borderRadius='50%' />
              : currentUser?.imagePath
                ? <Image src={`${currentUser?.imagePath}`} display='table-cell' verticalAlign='middle' margin='auto' objectFit='cover' boxSize='100px' borderRadius='50%' />
                : <></>
            }
          </Flex>

        </Box>
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
          fontWeight='800'
        >
          更新
        </Button>
      </form>
    </>
  );
}
