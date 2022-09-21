import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

import Link from 'next/link';

import BuildingTopBar from '../../components/buildingTopBar';
import CommentSearchForm from '../../components/commentSearchForm';
import Header from '../../components/header';
import Post from '../../components/post';
import UserName from '../../components/userName';

export default function CommentList() {
  const posts: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <Header>
        <UserName />
      </Header>
      <Flex>
        <Box w='80%' h='calc(100vh - 80px)'>
          <BuildingTopBar />
          <SimpleGrid w='100%' h='92%' columns={3} spacing={10} overflowY='scroll' py='5' px='5'>
            {posts.map((post) => (
              <Link href='/comments/commentDetail' key={post}>
                <Box cursor='pointer' h='300px' overflow='hidden' boxShadow='dark-lg' borderRadius='3' p='3'>
                  <Post />
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
        <Box w='20%' h='calc(100vh - 80px)' boxShadow='2xl' display='flex' flexDirection='column' alignItems='center' pt='5' bg='#fffafa'>
          <CommentSearchForm />
        </Box>
      </Flex>
    </>
  );
}
