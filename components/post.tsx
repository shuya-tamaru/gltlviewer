import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { Comments } from '../types/Comments';
import { User } from '../types/Users';

type Props = {
  commentRoomId?: string;
};

export default function Post({ commentRoomId }: Props) {
  const [comment, setComment] = useState<Comments | null>(null);
  const [commentUser, setCommentUser] = useState<User | null>(null);

  useEffect(() => {
    const getComment = async () => {
      try {
        const response: Comments = await axios
          .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/firstComment/${commentRoomId}`)
          .then((res) => res.data);
        const user = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${response.userId}`).then((res) => res.data);
        user && setCommentUser(user);
        response && setComment(response);
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
  }, []);

  return (
    <>
      <Box w='100%' mb='5'>
        <Flex alignItems='center' justify='space-between' borderBottom='2px' borderColor='#999'>
          <Flex>
            <Image src='/images/pika.jpeg' objectFit='cover' boxSize='60px' borderRadius='50%' />
            <Box ml='5' color='#333'>
              <Text fontSize='lg'>{commentUser ? commentUser.lastName + commentUser.firstName : 'userName'}</Text>
              <Text fontSize='xs'>{comment ? comment.createdAt : '投降日:2022-01-01'}</Text>
              <Text fontSize='xs'>{comment ? comment.updatedAt : '更新日:2022-02-01'}</Text>
            </Box>
          </Flex>
          <BsThreeDotsVertical style={{ color: '#333', cursor: 'pointer' }} size={20} />
        </Flex>
        <Box alignItems='center'>
          <Flex my='2' mx='2' borderBottom='2px' borderColor='#999' borderStyle='dotted'>
            Title:<Text>&nbsp;{comment ? comment.title : 'デフォルトタイトル'}</Text>
          </Flex>
          <Text my='2' mx='2'>
            {comment ? comment.description : 'デフォルト本文'}
          </Text>
          <Image src='/images/building.jpeg' objectFit='cover' boxSize='100%' />
        </Box>
      </Box>
    </>
  );
}
