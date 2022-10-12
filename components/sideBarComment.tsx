import { Box, Flex, Image, Text, Tooltip, Button } from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { Comments } from '../types/Comments';
import { User } from '../types/Users';
import { useCurrentUser } from '../context/CurrentUserContext';

type Props = {
  comment: Comments;
};

export default function Post({ comment }: Props) {
  const [commentUser, setCommentUser] = useState<User | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const getUser = async () => {
      const user: User = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${comment.userId}`).then((res) => res.data);
      setCommentUser(user);
    };
    getUser();
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
          {
            currentUser?.id === commentUser?.id &&
            <Tooltip hasArrow color='#fff' fontWeight='600' label='投稿の編集・削除' bg='orange.400' placement='top'>
              <Button mr='5px' colorScheme='gray'>
                <FaRegEdit style={{ color: '#333', cursor: 'pointer' }} size={20} />
              </Button>
            </Tooltip>
          }
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
