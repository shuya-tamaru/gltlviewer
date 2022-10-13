import { Box, Textarea, Button, Input, useToast, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";

import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../context/CurrentUserContext";
import { Comments } from "../types/Comments";


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
    toast({
      title: `返信をキャンセルしました`,
      status: 'warning',
      isClosable: true,
    })
  }

  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size='lg' closeOnOverlayClick={false}>
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton onClick={(e) => { cancelReply(e); onClose() }} />
          <DrawerHeader>返信を投稿する</DrawerHeader>
          <DrawerBody>
            <Box w="100%" h="30%" display="flex" alignItems="center" flexDirection="column" p="2.5">
              <form style={{ width: "100%", height: "100%" }} >
                <Input required value={title} onChange={(e) => setTitle(e.target.value)} id="input" w="100%" h="15%" placeholder='タイトルを入力' borderColor="#999" border="2px" />
                <Textarea required value={desc} onChange={(e) => setDesc(e.target.value)} id="textArea" w="100%" h="60%" placeholder='コメントを入力' borderColor="#999" border="2px" />
                <Box w="100%" h="20%" mt="2" display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <BiImageAdd style={{ marginLeft: "5px", cursor: "pointer" }} size={30} />
                    <GrDocumentPdf style={{ marginLeft: "5px", cursor: "pointer" }} size={30} />
                  </Box>
                  <Box display="flex" >
                    <Button onClick={(e) => { addReply(e); setDesc(''); setTitle(''); onClose() }} colorScheme='red' ml="2">Add</Button>
                    <Button onClick={(e) => { cancelReply(e); onClose() }} colorScheme='gray' ml="2">Cancel</Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}