import { Box, Button, useDisclosure, Flex } from "@chakra-ui/react";
import axios from "axios";

import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import BuildingTopBar from "../../components/nextComponents/buildingTopBar";
import Header from "../../components/nextComponents/header";
import UserName from "../../components/nextComponents/userName";
import IframeArea from "../../components/threeComponents/iframeArea";
import DrawerCommentAdd from "../../components/nextComponents/drawerCommentAdd";
import SideBarComment from "../../components/nextComponents/sideBarComment";
import { Building } from "../../types/Buildings";
import { useCurrentIframeState } from "../../context/CurrentIframeStateContext";
import useTransmission from "../../hooks/useTransmission";
import { Comments } from "../../types/Comments";
import DrawerCommentReply from "../../components/nextComponents/drawerCommentReply";
import useCanvasState, { CanvasState } from "../../components/threeComponents/stores/useCanvasState";
import useCommentTransmission from "../../components/threeComponents/stores/useCommentTransmission";

type Props = {
  building: Building;
};

export default function ({ building }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [initialComments, setInitialComments] = useState<Comments[] | []>([]);
  const [comments, setComments] = useState<Comments[] | []>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [guid, setGuid] = useState<string>("");
  const [displayState, setDisplayState] = useState<"flex" | "none">("none");
  const currentIframeState = useCurrentIframeState();
  const canvasState = CanvasState;
  const { currentCanvasState } = useCanvasState((state) => state);
  const { setInitialCommentsFetch } = useCommentTransmission((state) => state);

  useEffect(() => {
    const getComments = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/firstCommentInRoom/${building.id}`).then((res) => {
        setInitialComments(res.data);
      });
    };
    getComments();
  }, []);

  useEffect(() => {
    if (currentCanvasState) {
      switch (currentCanvasState) {
        case canvasState.READY: {
          initialComments.length > 0 && setInitialCommentsFetch(initialComments);
          break;
        }
        case canvasState.ADD_COMMENT: {
          setDisplayState("flex");
          break;
        }
        case canvasState.CANCEL_COMMENT: {
          break;
        }
      }
    }
    // if (currentIframeState) {
    //   switch (currentIframeState.message) {
    //     case "initialMessage": {
    //       initialComments.length > 0 && useTransmission(initialComments, "initialMessage");
    //       break;
    //     }
    //     case "addPost": {
    //       setDisplayState("flex");
    //       break;
    //     }
    //     case "getSingleComment": {
    //       const commentRoomId = currentIframeState.commentRoomId!;
    //       const commentRoomGuid = currentIframeState.guid as string;
    //       setDisplayState("flex");
    //       const getComments = async () => {
    //         const commentsInRoom = await axios
    //           .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/comments/${commentRoomId}`)
    //           .then((res) => res.data);
    //         setComments(commentsInRoom);
    //         setRoomId(commentRoomId);
    //         setGuid(commentRoomGuid);
    //       };
    //       getComments();
    //       break;
    //     }
    //   }
    // }
  }, [currentCanvasState]);

  return (
    <>
      <Header>
        <UserName />
      </Header>
      <Flex>
        <Box w="80%" h="calc(100vh - 80px)">
          <BuildingTopBar building={building} />
          <IframeArea />
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
                    guid={guid}
                    setComments={setComments}
                  />
                ))}
              </Box>
              <Button onClick={onOpen} colorScheme="gray" w="90%" h="40px" marginBlockEnd="10px">
                返信
              </Button>
              <DrawerCommentReply
                isOpen={isOpen}
                onClose={onClose}
                roomId={roomId}
                comments={comments}
                setComments={setComments}
              />
              <Link href={`/comments/commentDetail/${roomId}`}>
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
