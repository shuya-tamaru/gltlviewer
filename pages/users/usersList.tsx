import { Box, Flex, Image, Radio, Text, VStack, RadioGroup } from '@chakra-ui/react';

import TopBar from '../../components/topBar';

export default function () {
  const users = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10'];
  const searchText = 'Search User';
  const radioForm = ['admin', '権限1', '権限2', '権限3', '権限4'];

  return (
    <>
      <TopBar searchText={searchText} />
      <Box w='100%' h='calc(100vh - 80px)' bg='#f5f5f5' display='flex' flexDirection='column'>
        <Flex h='100%'>
          <Box w='50%' h='100%' overflowY='scroll' shadow='2xl'>
            <Flex w='100%' display='flex' flexDirection='column' alignItems='center'>
              {users.map((user) => {
                return (
                  <Box
                    key={user}
                    w='80%'
                    h='100px'
                    bg='#fff'
                    borderRadius='5px'
                    mt='10px'
                    shadow='2xl'
                    p='5px'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    cursor='pointer'
                    transition='all 0.5s ease'
                    _hover={{ transform: 'scale(1.01)' }}
                  >
                    <Box w='80%' display='flex' justifyContent='start' alignItems='center'>
                      <Image src='/images/pika.jpeg' objectFit='cover' boxSize='60px' borderRadius='50%' />
                      <Text ml='30px' fontSize='25px' fontWeight='550'>
                        Shuya Tamaru
                      </Text>
                    </Box>
                    <Text mx='30px' fontSize='25px' fontWeight='550'>
                      Admin
                    </Text>
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box w='50%' h='100%' display='flex' justifyContent='center' alignItems='center'>
            <Box w='80%' h='70%' bg='#fff' borderRadius='5px' shadow='2xl'>
              <VStack w='100%' h='100%' p='20px' display='flex' alignItems='center'>
                <Image src='/images/pika.jpeg' objectFit='cover' boxSize='150px' borderRadius='50%' shadow='2xl' />
                <Text fontSize='50px' fontWeight='700'>
                  Shuya Tamaru
                </Text>
                <Text fontSize='25px' fontWeight='550'>
                  email : aaa@aaa
                </Text>
                <RadioGroup name='radio' display='flex' justifyContent='center'>
                  <Box py='5'>
                    <VStack align='stretch'>
                      {radioForm.map((form, index) => {
                        return (
                          <Radio key={index} size='lg' value={index.toString()}>
                            {form}
                          </Radio>
                        );
                      })}
                    </VStack>
                  </Box>
                </RadioGroup>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
