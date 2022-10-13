import { Box, Flex, Image, Text, Tooltip, Button, useDisclosure, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialog, useToast } from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';

import { useEffect, useRef, useState } from 'react';
import { Comments } from '../types/Comments';
import { User } from '../types/Users';
import { useCurrentUser } from '../context/CurrentUserContext';
import DrawerCommentUpdate from './drawerCommentUpdate';
import useTransmission from '../hools/useTransmission';
import AlertDialogDelete from './alertDialogDelete';

type Props = {
  comment: Comments,
  commentsLength: number,
  guid: string,
};

export default function Post({ comment, commentsLength, guid }: Props) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert
  } = useDisclosure()

  const [displayComment, setDisplayComemnt] = useState<Comments | null>(comment);
  const [commentUser, setCommentUser] = useState<User | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (displayComment) {
      const getUser = async () => {
        const user: User = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${displayComment.userId}`).then((res) => res.data);
        setCommentUser(user);
      };
      getUser();
    }
  }, []);



  return (
    <>
      {
        displayComment && (
          <>
            <Box w='100%' mb='5'>
              <Flex alignItems='center' justify='space-between' borderBottom='2px' borderColor='#999'>
                <Flex>
                  <Image src='/images/pika.jpeg' objectFit='cover' boxSize='60px' borderRadius='50%' />
                  <Box ml='5' color='#333'>
                    <Text fontSize='lg'>{commentUser ? commentUser.lastName + commentUser.firstName : 'userName'}</Text>
                    <Text fontSize='xs'>{displayComment ? displayComment.createdAt : '投降日:2022-01-01'}</Text>
                    <Text fontSize='xs'>{displayComment ? displayComment.updatedAt : '更新日:2022-02-01'}</Text>
                  </Box>
                </Flex>
                {
                  currentUser?.id === commentUser?.id &&
                  (
                    <Flex justify="end">
                      <Tooltip hasArrow color='#fff' fontWeight='600' label='編集' bg='orange.400' placement='top'>
                        <Button p="0" colorScheme='white'>
                          <FaRegEdit onClick={() => { onOpen(); }} style={{ color: '#333', cursor: 'pointer' }} size={20} />
                        </Button>
                      </Tooltip>
                      <Tooltip hasArrow color='#fff' fontWeight='600' label='削除' bg='orange.400' placement='top'>
                        <Button p="0" colorScheme='white'>
                          <RiDeleteBinLine onClick={() => onOpenAlert()} style={{ color: '#333', cursor: 'pointer' }} size={20} />
                        </Button>
                      </Tooltip>
                    </Flex>
                  )
                }
              </Flex>
              <Box alignItems='center'>
                <Flex my='2' mx='2' borderBottom='2px' borderColor='#999' borderStyle='dotted'>
                  Title:<Text>&nbsp;{displayComment ? displayComment.title : 'デフォルトタイトル'}</Text>
                </Flex>
                <Text my='2' mx='2'>
                  {displayComment ? displayComment.description : 'デフォルト本文'}
                </Text>
                <Image src='/images/building.jpeg' objectFit='cover' boxSize='100%' />
              </Box>
            </Box>
            <DrawerCommentUpdate comment={displayComment} commentsLength={commentsLength} guid={guid} setDisplayComemnt={setDisplayComemnt} isOpen={isOpen} onClose={onClose} />
            <AlertDialogDelete comment={displayComment} commentsLength={commentsLength} guid={guid} setDisplayComemnt={setDisplayComemnt} isOpenAlert={isOpenAlert} onCloseAlert={onCloseAlert} />
          </>
        )
      }
    </>
  );
}
