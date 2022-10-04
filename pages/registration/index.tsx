import { Flex, Text, Box, Button, Input } from '@chakra-ui/react';
import axios from 'axios';

import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import Header from '../../components/header';
import { useCurrentUserUpdate } from '../../context/CurrentUserContext';
import { User } from '../../types/Users';

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

export default function Registration() {
  const router = useRouter();
  const setCurrentUser = useCurrentUserUpdate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');

  const lastName = useRef<HTMLInputElement | null>(null);
  const firstName = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordConfirmation = useRef<HTMLInputElement | null>(null);
  const companyId = useRef<HTMLInputElement | null>(null);
  const userState = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.current!.value !== passwordConfirmation.current!.value) {
      passwordConfirmation.current!.setCustomValidity('確認用パスワードが一致しません');
    } else {
      try {
        const newUser = {
          lastName: lastName.current!.value,
          firstName: firstName.current!.value,
          email: email.current!.value,
          password: password.current!.value,
          companyId: companyId.current!.value,
          userState: userState.current!.value,
        };
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/auth/signup`, newUser);

        await signIn('credentials', {
          email: newUser.email,
          password: newUser.password,
          redirect: false,
        }).then(async () => {
          const session = await getSession();
          const user = session ? (session.userData as User) : null;
          setLoading(true);
          setIsError('');
          setCurrentUser(user);
          const companyId: string = user!.companyId;
          router.push(`/topPage/${companyId}`);
        });
      } catch (error: any) {
        const errorMessage: string = error.response.data.message;
        setLoading(false);
        setIsError(errorMessage);
      }
    }
  };

  return (
    <>
      <Header />
      <Flex w='100vw' h='calc(100vh - 80px)' display='flex' justify='center' alignItems='center' margin='auto'>
        <Box w='30%' bg='#ffffff' p='10px 10px 20px 10px' boxShadow='0px 0px 15px -5px #777777' borderRadius='5px'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='30px' fontWeight='800' color='#666666' textAlign='center'>
              新規ユーザー登録
            </Text>
            <Input type='text' ref={lastName} placeholder={'姓'} required sx={styles} />
            <Input type='text' ref={firstName} placeholder={'名'} required sx={styles} />
            <Input type='email' ref={email} placeholder={'メールアドレス'} required sx={styles} />
            <Input type='password' ref={password} placeholder={'パスワード'} required sx={styles} />
            <Input type='password' ref={passwordConfirmation} placeholder={'パスワード確認'} required sx={styles} />
            <Input
              type='text'
              ref={companyId}
              placeholder={'会社ID'}
              defaultValue={'224bb556-d42c-4908-b531-bf2c86983376'}
              required
              sx={styles}
            />
            <Input type='text' ref={userState} placeholder={'ユーザー権限'} required defaultValue={'OnlyWatch'} sx={styles} />
            {isError && (
              <Text fontWeight='800' color='orange.300' textAlign='center' mt='5'>
                {isError}
              </Text>
            )}
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
              新規登録
            </Button>
          </form>
          <Link href='/login'>
            <Text color='blue' mt='5' textAlign='center' cursor='pointer'>
              登録済みの方はこちら
            </Text>
          </Link>
        </Box>
      </Flex>
    </>
  );
}
