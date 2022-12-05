import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";

import BuildingTopBar from "../../../components/nextComponents/buildingTopBar";
import Comment from "../../../components/nextComponents/comment";
import { CommentRooms } from "../../../types/CommentRooms";
import { GetStaticPropsContext } from "next";
import { Comments } from "../../../types/Comments";
import { useEffect, useState } from "react";
import { Building } from "../../../types/Buildings";
import TopBar from "../../../components/nextComponents/topBar";

type Props = {
  comments: Comments[];
};

export default function CommentDetail({ comments }: Props) {
  const [focusComment, setfocusComment] = useState<Comments | null>(null);
  const [building, setBuilding] = useState<Building | null>(null);

  useEffect(() => {
    try {
      const firstComment = comments[0];
      const getBuilding = async () => {
        const commentRoom: CommentRooms = await axios
          .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comment-rooms/${firstComment.commentRoomId}`)
          .then((res) => res.data);
        const building: Building = await axios
          .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings/${commentRoom.buildingId}`)
          .then((res) => res.data);
        setBuilding(building);
      };
      getBuilding();
    } catch (error) {}
  }, []);

  return (
    building && (
      <>
        <TopBar />
        <Flex>
          <Box w="100%" h="calc(100vh - 80px)">
            <BuildingTopBar building={building} />
            <Box p="5" w="100%" h="92%" overflowY="scroll" color="#333">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} setfocusComment={setfocusComment} />
              ))}
            </Box>
          </Box>
        </Flex>
      </>
    )
  );
}

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comment-rooms`).then((res) => res.data);
  if (!result) return;
  const paths: [{ params: { id: string } }] = result.map((commentRoom: CommentRooms) => ({
    params: { id: `${commentRoom.id}` },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const result: Comments[] | [] = await axios
    .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/comments/${params!.id}`)
    .then((res) => res.data);

  return { props: { comments: result } };
}
