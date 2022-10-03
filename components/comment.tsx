import { Box, Flex, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Comments } from '../types/Comments';
import { User } from '../types/Users';

type Props = {
  comment: Comments;
  setfocusComment: Dispatch<SetStateAction<Comments | null>>;
};

export default function Comment({ comment, setfocusComment }: Props) {
  const [commentUser, setCommentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        const user: User = await axios
          .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${comment.userId}`)
          .then((res) => res.data);
        setCommentUser(user);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Flex onClick={() => setfocusComment(comment)} p='5' boxShadow='dark-lg' mb='10' cursor='pointer'>
        <Box w='20%' borderRight='2px'>
          <Flex alignItems='center' justify='space-between'>
            <Flex>
              <Image src='/images/pika.jpeg' objectFit='cover' boxSize='60px' borderRadius='50%' />
              <Box ml='5' color='#333'>
                <Text fontSize='lg'>{commentUser ? commentUser.lastName + commentUser.firstName : ''}</Text>
                <Text fontSize='xs'>{comment ? `投稿日:${comment.createdAt}` : `投稿日:`}</Text>
                <Text fontSize='xs'>{comment ? `更新日:${comment.updatedAt}` : `更新日:`}</Text>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box w='80%' display='flex' flexDirection='column' ml='3'>
          <Text borderBottom='2px' borderColor='#666'>
            {comment ? `タイトル: ${comment.title}` : 'タイトル:'}
          </Text>
          <Text fontSize='20'>{comment ? `${comment.description}` : 'タイトル:'}</Text>
        </Box>
      </Flex>
    </>
  );
}
