import { Box, Flex, Button } from "@chakra-ui/react";

import Link from "next/link";

import BuildingTopBar from "../../components/buildingTopBar";
import Header from "../../components/header";
import UserName from '../../components/userName';
import IframeArea from "../../components/iframeArea";
import CommentForm from "../../components/commentForm";
import Post from "../../components/post";


export default function Building() {
  const posts:number[] = [0,1,2];

  return (
    <>
      <Header>
        <UserName/>
      </Header>
      <Flex>
        <Box w="80%" h="calc(100vh - 80px)" >
          <BuildingTopBar/>
          <IframeArea/>
        </Box>
        <Box w="20%" h="calc(100vh - 80px)" boxShadow="0px 0px 15px -5px #777777" >
          <Box w="100%" h="70%" px="3" pt="3" display="flex" flexDirection="column" alignItems="center" >
            <Box w="100%" h="calc(100% - 40px)" mb="2" overflowY="scroll" border="2px solid" borderColor="#999">
              {posts.map((post)=>(
                <Post key={post}/>
              ))}
            </Box>
            <Link href="/comments/commentDetail">
              <Button colorScheme="red" w="90%" h="40px" >Read More</Button>
            </Link>
          </Box>
          <CommentForm/>
        </Box>
      </Flex>
    </>
  );
}