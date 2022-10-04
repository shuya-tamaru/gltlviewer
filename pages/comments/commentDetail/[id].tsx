import { Box, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';

import BuildingTopBar from '../../../components/buildingTopBar';
import CommentForm from '../../../components/commentForm';
import Header from '../../../components/header';
import UserName from '../../../components/userName';
import Comment from '../../../components/comment';
import { CommentRooms } from '../../../types/CommentRooms';
import { GetStaticPropsContext } from 'next';
import { Comments } from '../../../types/Comments';
import { useEffect, useState } from 'react';
import SideBarCommentSingle from '../../../components/sideBarCommentSingle';
import { Building } from '../../../types/Buildings';

type Props = {
  comments: Comments[] | [];
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
    <>
      <Header>
        <UserName />
      </Header>
      <Flex>
        <Box w='80%' h='calc(100vh - 80px)'>
          <BuildingTopBar building={building} />
          <Box p='5' w='100%' h='92%' overflowY='scroll' color='#333'>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} setfocusComment={setfocusComment} />
            ))}
          </Box>
        </Box>
        <Box w='20%' h='calc(100vh - 80px)' boxShadow='0px 0px 15px -5px #777777'>
          <Box w='100%' h='70%' px='3' pt='3' display='flex' flexDirection='column' alignItems='center'>
            <Box w='100%' h='calc(100% - 40px)' mb='2' overflowY='scroll'>
              {focusComment ? <SideBarCommentSingle comment={focusComment} /> : null}
            </Box>
            <Button colorScheme='red' w='90%' h='40px'>
              Read More
            </Button>
          </Box>
          <CommentForm />
        </Box>
      </Flex>
    </>
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
