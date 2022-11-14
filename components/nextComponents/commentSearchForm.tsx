import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

export default function CommentSearchForm() {
  return (
    <>
      <Box mt='150px' display='flex' flexDirection='column' alignItems='center'>
        <Text fontSize='20' fontWeight='700' mb='5' color='#666'>
          コメント検索
        </Text>
        <Box w='100%' display='flex' flexDirection='column' alignItems='center' zIndex='9'>
          <Input w='100%' placeholder='キーワード検索' mb='3' />
          <Input w='100%' placeholder='ユーザー名で検索' mb='3' />
          <Flex w='100%' mb='3'>
            <Input w='50%' fontSize='12' type='date' />
            <Text fontSize='30'>&nbsp;~&nbsp;</Text>
            <Input w='50%' fontSize='12' type='date' />
          </Flex>
        </Box>
        <Button w='80%' colorScheme='red'>
          検索
        </Button>
      </Box>
    </>
  );
}
