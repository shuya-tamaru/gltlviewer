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
import { Comments } from '../../types/Comments';

type Props = {
  building: Building;
};

export default function ({ building }: Props) {
  const commentRoomId = '44566bcc-8959-4ac8-ada7-49c2c8662b0d';
  const [comments, setComments] = useState<Comments[] | []>([]);

  useEffect(() => {
    const getComments = async () => {
      const response: Comments[] | [] = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/comments/${commentRoomId}`)
        .then((res) => res.data);
      setComments(response);
    };
    getComments();
  }, []);

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
          <Box w='100%' h='70%' px='3' pt='3' display='flex' flexDirection='column' alignItems='center'>
            <Box w='100%' h='calc(100% - 40px)' mb='2' overflowY='scroll' border='2px solid' borderColor='#999'>
              {comments.map((comment) => (
                <SideBarComment key={comment.id} comment={comment} />
              ))}
            </Box>
            <Link href='/comments/commentDetail'>
              <Button colorScheme='red' w='90%' h='40px'>
                Read More
              </Button>
            </Link>
          </Box>
          <CommentForm />
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
