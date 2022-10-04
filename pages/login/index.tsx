import { Flex, Text, Box, Button, Input } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';

import Header from '../../components/header';
import { User } from '../../types/Users';
import { useCurrentUserUpdate } from '../../context/CurrentUserContext';

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

export default function Login() {
  const router = useRouter();
  const setCurrentUser = useCurrentUserUpdate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginUser = {
      email: email.current!.value,
      password: password.current!.value,
      redirect: false,
    };

    try {
      await signIn('credentials', loginUser).then(async () => {
        const session = await getSession();
        const user = session ? (session.userData as User) : null;
        setLoading(true);
        setIsError(false);
        setCurrentUser(user);
        const companyId: string = user!.companyId;
        router.push(`/topPage/${companyId}`);
      });
    } catch (error) {
      setIsError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Flex w='100vw' h='calc(100vh - 80px)' display='flex' justify='center' alignItems='center' margin='auto'>
        <Box w='30%' bg='#ffffff' p='10px 10px 20px 10px' boxShadow='0px 0px 15px -5px #777777' borderRadius='5px'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='30px' fontWeight='800' color='#666666' textAlign='center'>
              ログインフォーム
            </Text>
            <Input type='email' ref={email} placeholder={'メールアドレス'} sx={styles} required />
            <Input type='password' ref={password} placeholder={'パスワード'} sx={styles} required />
            {isError && (
              <Text fontWeight='800' color='orange.300' textAlign='center' mt='5'>
                Eメール又はパスワードが間違ってます。
              </Text>
            )}
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
              isLoading={loading}
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
