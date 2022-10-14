import { Button, useDisclosure, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialog, useToast } from '@chakra-ui/react';
import axios from 'axios';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useCurrentUser } from '../context/CurrentUserContext';
import useTransmission from '../hools/useTransmission';
import { Comments } from '../types/Comments';

type Props = {
  isOpenAlert: boolean,
  onCloseAlert: () => void,
  comment: Comments,
  guid: string,
  setComments: Dispatch<SetStateAction<Comments[] | []>>,
  index: number
}


export default function ({ index, isOpenAlert, onCloseAlert, comment, guid, setComments }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const currentUser = useCurrentUser();

  const deleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const deleteComment = async () => {
      if (currentUser) {
        try {
          const roomId = comment.commentRoomId;
          await axios
            .delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${comment.id}/${currentUser.id}`);
          const commentsInRoom = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/comments/${roomId}`).then(res => res.data);
          if (commentsInRoom.length === 0) {
            await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comment-rooms/${roomId}`);
            useTransmission('', 'deleteComment', guid);
          } else if (index === 0) {
            const firstCommentInRoom = commentsInRoom[0];
            useTransmission(firstCommentInRoom, 'updateComment', guid);
          }
          setComments(commentsInRoom)
          toast({
            title: `コメントを削除しました`,
            status: 'success',
            isClosable: true,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    deleteComment();
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              コメントの削除
            </AlertDialogHeader>

            <AlertDialogBody>
              コメントを完全に削除いたします。よろしいでしょうか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                キャンセル
              </Button>
              <Button colorScheme='red' onClick={(e) => { deleteComment(e); onCloseAlert() }} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}