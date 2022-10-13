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
  commentsLength: number,
  guid: string,
  setDisplayComemnt: Dispatch<SetStateAction<Comments | null>>,
}


export default function ({ isOpenAlert, onCloseAlert, comment, commentsLength, guid, setDisplayComemnt }: Props) {

  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const currentUser = useCurrentUser();

  const deleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const deleteComment = async () => {
      if (currentUser) {
        try {
          await axios
            .delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${comment.id}/${currentUser.id}`);
          if (commentsLength === 1) {
            await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comment-rooms/${comment.commentRoomId}`);
            useTransmission('', 'deleteComment', guid);
          }
          setDisplayComemnt(null);
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