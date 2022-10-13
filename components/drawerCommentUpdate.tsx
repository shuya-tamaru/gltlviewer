import { Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, DrawerBody, DrawerHeader, Input, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { GrDocumentPdf } from 'react-icons/gr';
import { useCurrentUser } from '../context/CurrentUserContext';
import useTransmission from '../hools/useTransmission';
import { Comments } from '../types/Comments';

type Props = {
  comment: Comments,
  commentsLength: number,
  guid: string,
  setDisplayComemnt: Dispatch<SetStateAction<Comments | null>>,
  isOpen: boolean,
  onClose: () => void
}

export default function ({ comment, commentsLength, guid, setDisplayComemnt, isOpen, onClose }: Props) {
  const toast = useToast();

  const currentUser = useCurrentUser();

  const [desc, setDesc] = useState<string>(`${comment.title}`);
  const [title, setTitle] = useState<string>(`${comment.description}`);


  const cancelComment = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    // useTransmission('', 'cancelPost', guid);
    onClose()
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
          onClose()
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


  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size='lg' closeOnOverlayClick={false}>
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton onClick={e => cancelComment(e)} />
          <DrawerHeader>コメント編集</DrawerHeader>
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
                    <Button onClick={e => updateComment(e)} colorScheme='red' ml="2">Update</Button>
                    <Button onClick={e => cancelComment(e)} colorScheme='red' ml="2">Cancel</Button>
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