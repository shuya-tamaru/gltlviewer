import { Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, DrawerBody, DrawerHeader, Input, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { GrDocumentPdf } from 'react-icons/gr';
import { useCurrentUser } from '../context/CurrentUserContext';
import useTransmission from '../hools/useTransmission';
import { Comments } from '../types/Comments';
import DrawerForm from './drawerForm';

type Props = {
  comment: Comments,
  commentsLength: number,
  guid: string,
  setDisplayComemnt: Dispatch<SetStateAction<Comments | null>>,
  isOpenUpdate: boolean,
  onCloseUpdate: () => void
}

export default function ({ comment, commentsLength, guid, setDisplayComemnt, isOpenUpdate, onCloseUpdate }: Props) {
  const toast = useToast();

  const currentUser = useCurrentUser();

  const [desc, setDesc] = useState<string>(`${comment.title}`);
  const [title, setTitle] = useState<string>(`${comment.description}`);


  const cancelComment = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    onCloseUpdate()
    setDesc(`${comment.description}`);
    setTitle(`${comment.title}`);
    toast({
      title: `コメント編集をキャンセルしました`,
      status: 'warning',
      isClosable: true,
    })
  };

  const updateComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newComment: Comments = {
      ...comment,
      title: title,
      description: desc
    }
    const upateComment = async () => {
      if (currentUser) {
        try {
          await axios
            .patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${comment.id}/${currentUser.id}`, newComment);
          onCloseUpdate()
          setDesc(`${newComment.description}`);
          setTitle(`${newComment.title}`);
          setDisplayComemnt(newComment);
          toast({
            title: `コメントを編集しました`,
            status: 'success',
            isClosable: true,
          })
        } catch (error) {
          console.log(error)
        }
      };
    }
    upateComment()
    commentsLength === 1 && useTransmission(newComment, "updateComment", guid)
  };

  const props = {
    onClose: onCloseUpdate,
    isOpen: isOpenUpdate,
    cancelFunction: cancelComment,
    excuteFunction: updateComment,
    headerText: 'コメント編集',
    title: title,
    setTitle: setTitle,
    desc: desc,
    setDesc: setDesc,
    excuteButtonText: 'Update'
  }


  return (
    <>
      <DrawerForm props={props} />
    </>
  );
}