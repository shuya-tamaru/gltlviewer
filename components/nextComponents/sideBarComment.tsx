import { Box, Flex, Image, Text, Tooltip, Button, useDisclosure } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Comments } from "../../types/Comments";
import { User } from "../../types/Users";
import { useCurrentUser } from "../../context/CurrentUserContext";
import DrawerCommentUpdate from "./drawerCommentUpdate";
import AlertDialogDelete from "./alertDialogDelete";

type Props = {
  comment: Comments;
  commentsLength: number;
  setComments: Dispatch<SetStateAction<Comments[] | []>>;
  index: number;
};

export default function Post({ comment, commentsLength, setComments, index }: Props) {
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();

  const [displayComment, setDisplayComemnt] = useState<Comments | null>(comment);
  const [commentUser, setCommentUser] = useState<User | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (displayComment) {
      const getUser = async () => {
        const user: User = await axios
          .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${displayComment.userId}`)
          .then((res) => res.data);
        setCommentUser(user);
      };
      getUser();
    }
  }, []);

  return (
    <>
      {displayComment && (
        <>
          <Box w="100%" mb="5">
            <Flex alignItems="center" justify="space-between" borderBottom="2px" borderColor="#999">
              <Flex>
                <Image src="/images/avator.png" objectFit="cover" boxSize="60px" borderRadius="50%" />
                <Box ml="5" color="#333">
                  <Text fontSize="lg">{commentUser ? commentUser.lastName + commentUser.firstName : ""}</Text>
                  <Text fontSize="xs">{displayComment ? displayComment.createdAt : ""}</Text>
                  <Text fontSize="xs">{displayComment ? displayComment.updatedAt : ""}</Text>
                </Box>
              </Flex>
              {currentUser?.id === commentUser?.id && (
                <Flex justify="end">
                  <Tooltip hasArrow color="#fff" fontWeight="600" label="編集" bg="orange.400" placement="top">
                    <Button p="0" colorScheme="white">
                      <FaRegEdit onClick={onOpenUpdate} style={{ color: "#333", cursor: "pointer" }} size={20} />
                    </Button>
                  </Tooltip>
                  <Tooltip hasArrow color="#fff" fontWeight="600" label="削除" bg="red.400" placement="top">
                    <Button p="0" colorScheme="white">
                      <RiDeleteBinLine onClick={onOpenAlert} style={{ color: "#333", cursor: "pointer" }} size={20} />
                    </Button>
                  </Tooltip>
                </Flex>
              )}
            </Flex>
            <Box alignItems="center">
              <Flex my="2" mx="2" borderBottom="2px" borderColor="#999" borderStyle="dotted">
                Title:<Text>&nbsp;{displayComment ? displayComment.title : ""}</Text>
              </Flex>
              <Text my="2" mx="2">
                {displayComment ? displayComment.description : ""}
              </Text>
              <Image src="/images/building.png" objectFit="cover" boxSize="100%" />
            </Box>
          </Box>
          <DrawerCommentUpdate
            comment={displayComment}
            commentsLength={commentsLength}
            setDisplayComemnt={setDisplayComemnt}
            isOpenUpdate={isOpenUpdate}
            onCloseUpdate={onCloseUpdate}
          />
          <AlertDialogDelete
            index={index}
            comment={displayComment}
            setComments={setComments}
            isOpenAlert={isOpenAlert}
            onCloseAlert={onCloseAlert}
          />
        </>
      )}
    </>
  );
}
