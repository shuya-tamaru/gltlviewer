import { Box, Flex, Button, Text, Image} from "@chakra-ui/react";

import BuildingTopBar from "../../components/buildingTopBar";
import CommentForm from "../../components/commentForm";
import Header from "../../components/header";
import Post from "../../components/post";
import UserName from "../../components/userName";
import Comment from "../../components/comment";

export default function CommentDetail() {
  const posts:number[] = [0,1,2,3,4];


	return (
    <>
      <Header>
        <UserName/>
      </Header>
      <Flex>
        <Box w="80%" h="calc(100vh - 80px)" >
          <BuildingTopBar/>
          <Box p="5" w="100%" h="92%" overflowY="scroll" color="#333">
            {posts.map((post) => (
              <Comment key={post}/>
            ))}
          </Box>
        </Box>
        <Box w="20%" h="calc(100vh - 80px)" boxShadow="0px 0px 15px -5px #777777">
          <Box w="100%" h="70%" px="3" pt="3" display="flex" flexDirection="column" alignItems="center">
            <Box w="100%" h="calc(100% - 40px)" mb="2" overflowY="scroll">
                <Post/>
            </Box>
            <Button colorScheme="red" w="90%" h="40px" >Read More</Button>
          </Box>
          <CommentForm/>
        </Box>
      </Flex>

    </>
  )
}

