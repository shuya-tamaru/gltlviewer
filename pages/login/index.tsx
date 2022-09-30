import { Flex, Text, Box, Button, Input } from '@chakra-ui/react';
import axios from 'axios';

import { useRouter } from 'next/router';
import { useRef } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import Header from '../../components/header';
import { User } from '../../types/Users';
import { useCurrentUserUpdate } from '../../context/CurrentUserContext';

export default function Login() {
  const router = useRouter();
  const setCurrentUser = useCurrentUserUpdate();

  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginUser = {
      email: email.current!.value,
      password: password.current!.value,
      redirect: false,
    };
    const authResponse = await signIn('credentials', loginUser);
    try {
      if (authResponse!.status >= 200 && authResponse!.status < 300) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/auth/signin`, loginUser);
        const user: User = response.data;
        setCurrentUser(user);
        localStorage.setItem('loginState', 'login');

        const companyId: string = user.companyId;
        router.push(`/topPage/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Flex w='100vw' h='calc(100vh - 80px)' display='flex' justify='center' alignItems='center' margin='auto'>
        <Box w='30%' bg='#ffffff' p='10px 10px 20px 10px' boxShadow='0px 0px 15px -5px #777777' borderRadius='5px'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='30px' fontWeight='800' color='#666666' textAlign='center'>
              Login Form
            </Text>
            <Input
              type='email'
              ref={email}
              placeholder={'メールアドレス'}
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
              type='password'
              ref={password}
              placeholder={'パスワード'}
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
              ログイン
            </Button>
            <Link href='/login/forgetPassword'>
              <Text color='blue' mt='5' textAlign='center' cursor='pointer'>
                パスワードを忘れた方はこちら
              </Text>
            </Link>
          </form>
        </Box>
      </Flex>
    </>
  );
}
