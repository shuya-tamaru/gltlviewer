import { Box, Textarea, Button, Input } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";

import React, { useState } from "react";
import { Building } from "../types/Buildings";
import { useCurrentIframeState } from "../context/CurrentIframeStateContext";
import axios from "axios";
import { useCurrentUser } from "../context/CurrentUserContext";
import useTransmission from "../hools/useTransmission";

type Props = {
  building: Building;
}
type NewComment = {
  title: string,
  description: string,
  commentRoomId: string
}

export default function CommentForm({ building }: Props) {

  const [buttonToggle, setButtonToggle] = useState<boolean>(true);
  const [desc, setDesc] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const currentIframeState = useCurrentIframeState();
  const currentUser = useCurrentUser();


  const guid = currentIframeState?.guid;
  const coordinate = currentIframeState?.coordinate;

  const addComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      currentIframeState
        && currentIframeState.message === 'addPost'
        && useTransmission(postedComment, currentIframeState.message, guid);
      alert('success');

    } catch (error) {
      console.log(error)
    }
  }

  const cancelComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    useTransmission('', 'cancelPost', guid);
    setDesc('');
    setTitle('');
  }

  return (
    <>
      <Box w="100%" h="30%" display="flex" alignItems="center" flexDirection="column" p="2.5">
        <form style={{ width: "100%", height: "100%" }} >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} id="input" w="100%" h="15%" placeholder='タイトルを入力' borderColor="#999" border="2px" />
          <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} id="textArea" w="100%" h="60%" placeholder='コメントを入力' borderColor="#999" border="2px" />
          <Box w="100%" h="20%" mt="2" display="flex" justifyContent="space-between">
            <Box display="flex">
              <BiImageAdd style={{ marginLeft: "5px", cursor: "pointer" }} size={30} />
              <GrDocumentPdf style={{ marginLeft: "5px", cursor: "pointer" }} size={30} />
            </Box>
            <Box display="flex">
              {buttonToggle ? (
                <Button onClick={(e) => { addComment(e); setDesc(''); setTitle(''); }} colorScheme='red' ml="2">Add</Button>
              ) : (
                <>
                  <Button value={"Update"} colorScheme='red' ml="2">Update</Button>
                  <Button value={"Delete"} colorScheme='red' ml="2">Delete</Button>
                </>
              )}
              <Button onClick={(e) => cancelComment(e)} colorScheme='red' ml="2">Cancel</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}