import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";

import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import BuildingTopBar from "../../../components/nextComponents/buildingTopBar";
import Post from "../../../components/nextComponents/post";
import SearchFormComment from "../../../components/nextComponents/searchFormComment";
import TopBar from "../../../components/nextComponents/topBar";
import useDateFilter from "../../../hooks/useDateFilter";
import { Building } from "../../../types/Buildings";
import { Comments } from "../../../types/Comments";

type Props = {
  building: Building;
};

export type SearchInput = {
  title: string;
  startDate: string;
  endDate: string;
};

export default function CommentList({ building }: Props) {
  const [comments, setComments] = useState<Comments[] | []>([]);
  const [searchComments, setSearchComments] = useState<Comments[] | []>([]);
  const [searhInput, setSearchInput] = useState<SearchInput>({
    title: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const getFirstCommentInRoom = async () => {
      const response: Comments[] = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/firstCommentInRoom/${building.id}`)
        .then((res) => res.data);
      setComments(response);
    };
    getFirstCommentInRoom();
  }, []);

  useEffect(() => {
    const filterCommentList = comments.filter((comment) => {
      const title = comment.title;
      const isSearchTitle: boolean = title.toLowerCase().indexOf(searhInput.title.trim().toLowerCase()) !== -1;

      const createdAt = new Date(comment.createdAt.substring(0, 10));
      const isSearchDate: boolean = useDateFilter(searhInput, createdAt);

      if (isSearchTitle && isSearchDate) return comment;
    });

    setSearchComments(filterCommentList);
  }, [comments, searhInput]);

  return (
    <>
      <TopBar>
        <SearchFormComment setSearchInput={setSearchInput} />
      </TopBar>
      <Flex>
        <Box w="100%" h="calc(100vh - 80px)">
          <BuildingTopBar building={building} />
          <SimpleGrid w="100%" h="92%" columns={4} spacing={10} overflowY="scroll" py="5" px="5">
            {searchComments.map((comment) => (
              <Link href={`/comments/commentDetail/${comment.commentRoomId}`} key={comment.id}>
                <Box
                  cursor="pointer"
                  h="300px"
                  overflow="hidden"
                  boxShadow="2xl"
                  borderRadius="3"
                  p="3"
                  transition="all 0.5s ease"
                  _hover={{ transform: "scale(1.01)", opacity: 0.7 }}
                >
                  <Post comment={comment} />
                </Box>
              </Link>
            ))}
          </SimpleGrid>
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
