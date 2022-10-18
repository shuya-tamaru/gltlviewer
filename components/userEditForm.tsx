import { Box, Button, Flex, Image, Input, Text, useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from 'react-icons/bi';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { useCurrentUser, useCurrentUserUpdate } from '../context/CurrentUserContext';
import axios from 'axios';
import { formStyle } from '../styles/formStyle';
import UserIconForm from './userIconForm';


export default function () {
  const { status } = useSession();
  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserUpdate();
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [file, setFiles] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updateUser = {
        ...currentUser,
        lastName,
        firstName,
        email,
      };
      //userIconUpload
      if (file && currentUser) {
        if (currentUser.imagePath) {
          const currentImagePath: string = currentUser.imagePath.split('/').slice(-1)[0];;
          await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/delete/${currentImagePath}`)
        }
        const imageData = new FormData();
        const fileName = file.name;
        imageData.append("name", fileName);
        imageData.append("file", file);
        const imagePath: string = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/upload`, imageData).then(res => res.data);
        updateUser.imagePath = imagePath;
      }
      await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${updateUser.id}`, updateUser).then(res => res.data);
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/auth/signout`);

      setLoading(false);
      setCurrentUser(null);
      signOut({ redirect: false });
      toast({
        title: `更新が完了しました、再度ログインしてください`,
        status: 'success',
        isClosable: true,
      })
      router.push('/login');

    } catch (error) {
      setLoading(false);
      toast({
        title: `更新に失敗しましt`,
        status: 'warning',
        isClosable: true,
      })
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

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type='text' placeholder='姓' required sx={formStyle} />
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type='text'
          placeholder='名'
          required
          sx={formStyle}
        />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='email' required sx={formStyle} />
        <UserIconForm setFiles={setFiles} action={"update"} />
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
