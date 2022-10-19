import { Box, Textarea, Button, Input, useToast, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";

import React, { useEffect, useState } from "react";
import { Building } from "../types/Buildings";
import { useCurrentIframeState } from "../context/CurrentIframeStateContext";
import axios from "axios";
import { useCurrentUser } from "../context/CurrentUserContext";
import useTransmission from "../hools/useTransmission";
import DrawerForm from "./drawerForm";

type Props = {
  building: Building;
}
type NewComment = {
  title: string,
  description: string,
  commentRoomId: string
}

export default function ({ building }: Props) {

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [desc, setDesc] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [guid, setGuid] = useState<string>('');
  const [coordinate, setCoordinate] = useState<string>('');
  const currentIframeState = useCurrentIframeState();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentIframeState) {
      if (currentIframeState.message === 'addPost') {
        onOpen();
        setGuid(currentIframeState.guid as string);
        setCoordinate(currentIframeState.coordinate as string);
      }
    }
  }, [currentIframeState]);

  const addComment = async (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.preventDefault();
    try {
      const newComment: NewComment =
        await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comment-rooms/${building.id}`, { coordinate })
          .then((res) => {
            return {
              title: title,
              description: desc,
              commentRoomId: res.data.id,
            }
          });
      const postedComment =
        await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${currentUser!.id}`, newComment)
          .then((res) => {
            const { id, title, description, createdAt, updatedAt, commentRoomId, userId } = res.data;
            return {
              id,
              title,
              description,
              createdAt,
              updatedAt,
              commentRoomId,
              userId,
              buildingId: building.id,
              coordinate
            }
          });

      useTransmission(postedComment, 'addPost', guid);
      setDesc('');
      setTitle('');
      onClose()
      toast({
        title: `コメントを投稿しました`,
        status: 'success',
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
      setDesc('');
      setTitle('');
      onClose()
      toast({
        title: 'コメント投稿に失敗しました',
        status: 'error',
        isClosable: true,
      })
    }
  }

  const cancelComment = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    useTransmission('', 'cancelPost', guid);
    setDesc('');
    setTitle('');
    onClose()
    toast({
      title: `コメント投稿をキャンセルしました`,
      status: 'warning',
      isClosable: true,
    })
  }

  const props = {
    onClose: onClose,
    isOpen: isOpen,
    cancelFunction: cancelComment,
    excuteFunction: addComment,
    headerText: 'コメントを投稿する',
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