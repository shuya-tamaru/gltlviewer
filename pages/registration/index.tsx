import { Flex, Text, Box, Button } from '@chakra-ui/react';

import Header from '../../components/header';
import RegisterInputForm from '../../components/registerInputForm';

export default function Registration() {
  const inputForms = ['姓', '名', 'メールアドレス', 'パスワード', 'パスワード確認', '会社名'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <Flex w='100vw' h='calc(100vh - 80px)' display='flex' justify='center' alignItems='center' margin='auto'>
        <Box w='30%' bg='#ffffff' p='10px 10px 20px 10px' boxShadow='0px 0px 15px -5px #777777' borderRadius='5px'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize='30px' fontWeight='800' color='#666666' textAlign='center'>
              Create Account
            </Text>
            {inputForms.map((form: string) => (
              <RegisterInputForm key={form} form={form} />
            ))}
            <Button type='submit' w='90%' h='50' py='5' ml='5' mt='5' color='#ffffff' colorScheme='red' fontWeight='600'>
              新規登録
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}
