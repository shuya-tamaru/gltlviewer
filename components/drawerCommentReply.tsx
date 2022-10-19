import { Box, Textarea, Button, Input, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";

import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Comments } from "../types/Comments";
import DrawerForm from "./drawerForm";


type Props = {
  isOpen: boolean,
  onClose: () => void,
  comments: Comments[],
  roomId: string,
  setComments: Dispatch<SetStateAction<Comments[]>>,
}

export default function ({ isOpen, onClose, roomId, comments, setComments }: Props) {

  const toast = useToast();

  const [desc, setDesc] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const currentUser = useCurrentUser();

  const addReply = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    try {
      const newComment = {
        title,
        description: desc,
        commentRoomId: roomId
      }
      const postedComment: Comments =
        await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${currentUser!.id}`, newComment).then(res => res.data);
      setComments([...comments, postedComment]);

    } catch (error) {
      console.log(error);
    }
    setDesc('');
    setTitle('');
    onClose();
    toast({
      title: `返信しました`,
      status: 'success',
      isClosable: true,
    })
  }

  const cancelReply = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setDesc('');
    setTitle('');
    onClose();
    toast({
      title: `返信をキャンセルしました`,
      status: 'warning',
      isClosable: true,
    })
  }
  const props = {
    onClose: onClose,
    isOpen: isOpen,
    cancelFunction: cancelReply,
    excuteFunction: addReply,
    headerText: '返信を投稿する',
    title: title,
    setTitle: setTitle,
    desc: desc,
    setDesc: setDesc,
    excuteButtonText: 'Add'
  }

  return (
    <>
      <DrawerForm props={props} />
    </>
  );
}