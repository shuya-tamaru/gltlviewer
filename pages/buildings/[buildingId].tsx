import { Box, Flex, Button } from '@chakra-ui/react';
import axios from 'axios';

import { GetStaticPropsContext } from 'next';
import Link from 'next/link';

import BuildingTopBar from '../../components/buildingTopBar';
import Header from '../../components/header';
import UserName from '../../components/userName';
import IframeArea from '../../components/iframeArea';
import CommentForm from '../../components/commentForm';
import SideBarComment from '../../components/sideBarComment';
import { Building } from '../../types/Buildings';
import { useEffect, useState } from 'react';
import { useCurrentIframeState, useCurrentIframeStateUpdate } from '../../context/CurrentIframeStateContext';
import useTransmission from '../../hools/useTransmission';
import { Comments } from '../../types/Comments';

type Props = {
  building: Building;
};

export default function ({ building }: Props) {
  const [comments, setComments] = useState<Comments[] | []>([]);
  const [roomId, setRoomId] = useState<string>('');
  const [displayState, setDisplayState] = useState<string>('none');
  const currentIframeState = useCurrentIframeState();

  useEffect(() => {
    const getComments = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/firstCommentInRoom/${building.id}`)
        .then((res) => setComments(res.data));
    };
    getComments();
  }, []);

  useEffect(() => {
    if (currentIframeState) {
      switch (currentIframeState.message) {
        case 'initialMessage': {
          comments.length > 0 && useTransmission(comments, 'initialMessage');
          break;
        }
        case 'addPost': {
          setDisplayState('flex');
          break;
        }
        case 'getSingleComment': {
          const commentRoomId = currentIframeState.commentRoomId!;
          setDisplayState('flex');
          const getComments = async () => {
            const commentsInRoom = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/comments/${commentRoomId}`).then(res => res.data);
            setComments(commentsInRoom);
            setRoomId(commentRoomId);
          }
          getComments();
          break;
        }

      }
    }
  }, [currentIframeState])


  return (
    <>
      <Header>
        <UserName />
      </Header>
      <Flex>
        <Box w='80%' h='calc(100vh - 80px)'>
          <BuildingTopBar building={building} />
          <IframeArea />
        </Box>
        <Box w='20%' h='calc(100vh - 80px)' boxShadow='0px 0px 15px -5px #777777'>
          <Box w='100%' h='70%' px='3' pt='3' display={displayState} flexDirection='column' alignItems='center'>
            <Box w='100%' h='calc(100% - 40px)' mb='2' overflowY='scroll' border='2px solid' borderColor='#999' >
              {comments.map((comment) => (
                <SideBarComment key={comment.id} comment={comment} />
              ))}
            </Box>
            <Link href={`/comments/commentDetail/${roomId}`}>
              <Button colorScheme='red' w='90%' h='40px'>
                Read More
              </Button>
            </Link>
          </Box>
          <CommentForm building={building} />
        </Box>
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings/buildingList/224bb556-d42c-4908-b531-bf2c86983376`)
    .then((res) => res.data);
  if (!result) return;
  const paths: [{ params: { buildingId: string } }] = result.map((building: Building) => ({
    params: { buildingId: `${building.id}` },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const result: Building = await axios
    .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings/${params!.buildingId}`)
    .then((res) => res.data);
  return { props: { building: result } };
}
