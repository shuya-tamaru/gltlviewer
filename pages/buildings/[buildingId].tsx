import { Box, Button, useDisclosure, Flex } from "@chakra-ui/react";
import axios from "axios";

import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useState } from "react";

import BuildingTopBar from "../../components/nextComponents/buildingTopBar";
import Header from "../../components/nextComponents/header";
import UserName from "../../components/nextComponents/userName";
import WebGLCanvas from "../../components/threeComponents/WebGLCanvas";
import DrawerCommentAdd from "../../components/nextComponents/drawerCommentAdd";
import SideBarComment from "../../components/nextComponents/sideBarComment";
import { Building } from "../../types/Buildings";
import { Comments } from "../../types/Comments";
import DrawerCommentReply from "../../components/nextComponents/drawerCommentReply";
import useCommentHandleApp from "../../hooks/useCommentHandleApp";
import useCommentTransmission from "../../components/threeComponents/stores/useCommentTransmission";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { UserRoles } from "../../types/UserRoles";

type Props = {
  building: Building;
};

export default function ({ building }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUser = useCurrentUser();
  const [comments, setComments] = useState<Comments[] | []>([]);
  const [displayState, setDisplayState] = useState<"flex" | "none">("none");
  const { focusComment } = useCommentTransmission((state) => state);
  const props = {
    building,
    setDisplayState,
    setComments,
  };

  useCommentHandleApp(props);

  return (
    <>
      <Header>
        <UserName />
      </Header>
      <Flex>
        <Box w="80%" h="calc(100vh - 80px)">
          <BuildingTopBar building={building} />
          <WebGLCanvas building={building} />
        </Box>
        <Box w="20%" h="calc(100vh - 80px)" boxShadow="0px 0px 15px -5px #777777">
          {comments.length > 0 && (
            <Box w="100%" h="70%" px="3" pt="3" display={displayState} flexDirection="column" alignItems="center">
              <Box w="100%" h="calc(100% - 40px)" mb="2" overflowY="scroll" border="2px solid" borderColor="#999">
                {comments.map((comment, index) => (
                  <SideBarComment
                    key={comment.id}
                    index={index}
                    comment={comment}
                    commentsLength={comments.length}
                    setComments={setComments}
                  />
                ))}
              </Box>
              {currentUser && currentUser.userRole <= UserRoles.Commenter && (
                <>
                  <Button onClick={onOpen} colorScheme="gray" w="90%" h="40px" marginBlockEnd="10px">
                    返信
                  </Button>
                  <DrawerCommentReply isOpen={isOpen} onClose={onClose} comments={comments} setComments={setComments} />
                </>
              )}
              <Link href={`/comments/commentDetail/${focusComment.id!}`}>
                <Button colorScheme="red" w="90%" h="40px">
                  Read More
                </Button>
              </Link>
            </Box>
          )}
          <DrawerCommentAdd building={building} />
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
