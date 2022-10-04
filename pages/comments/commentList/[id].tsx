import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import BuildingTopBar from '../../../components/buildingTopBar';
import CommentSearchForm from '../../../components/commentSearchForm';
import Header from '../../../components/header';
import Post from '../../../components/post';
import UserName from '../../../components/userName';
import { Building } from '../../../types/Buildings';
import { CommentRooms } from '../../../types/CommentRooms';

type Props = {
  building: Building;
};

export default function CommentList({ building }: Props) {
  const [commentRooms, setCommentRooms] = useState<CommentRooms[] | []>([]);

  useEffect(() => {
    const getCommentRooms = async () => {
      const response: CommentRooms[] = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comment-rooms/commet_rooms/${building.id}`)
        .then((res) => res.data);
      setCommentRooms(response);
    };
    getCommentRooms();
  }, []);

  return (
    <>
      <Header>
        <UserName />
      </Header>
      <Flex>
        <Box w='80%' h='calc(100vh - 80px)'>
          <BuildingTopBar building={building} />
          <SimpleGrid w='100%' h='92%' columns={3} spacing={10} overflowY='scroll' py='5' px='5'>
            {commentRooms.map((commentRoom) => (
              <Link href={`/comments/commentDetail/${commentRoom.id}`} key={commentRoom.id}>
                <Box
                  cursor='pointer'
                  h='300px'
                  overflow='hidden'
                  boxShadow='2xl'
                  borderRadius='3'
                  p='3'
                  transition='all 0.5s ease'
                  _hover={{ transform: 'scale(1.01)', opacity: 0.7 }}
                >
                  <Post commentRoomId={commentRoom.id} />
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
        <Box
          w='20%'
          h='calc(100vh - 80px)'
          boxShadow='2xl'
          display='flex'
          flexDirection='column'
          alignItems='center'
          pt='5'
          bg='#fffafa'
        >
          <CommentSearchForm />
        </Box>
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings`).then((res) => res.data);
  if (!result) return;
  const paths: [{ params: { id: string } }] = result.map((building: Building) => ({
    params: { id: `${building.id}` },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const result: Building = await axios
    .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings/${params!.id}`)
    .then((res) => res.data);
  return { props: { building: result } };
}
