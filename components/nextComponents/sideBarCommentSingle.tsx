import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

import { useEffect, useState } from "react";

import { Comments } from "../../types/Comments";
import { User } from "../../types/Users";

type Props = {
  comment: Comments;
};

export default function ({ comment }: Props) {
  const [commentUser, setCommentUser] = useState<User | null>(null);
  useEffect(() => {
    try {
      const getUser = async () => {
        const user: User = await axios
          .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${comment.userId}`)
          .then((res) => res.data);
        setCommentUser(user);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [comment]);

  return (
    <>
      <Box w="100%" mb="5">
        <Flex alignItems="center" justify="space-between" borderBottom="2px" borderColor="#999">
          <Flex>
            <Image src="/images/pika.jpeg" objectFit="cover" boxSize="60px" borderRadius="50%" />
            <Box ml="5" color="#333">
              <Text fontSize="lg">{commentUser ? commentUser.lastName + commentUser.firstName : "userName"}</Text>
              <Text fontSize="xs">{comment ? comment.createdAt : ""}</Text>
              <Text fontSize="xs">{comment ? comment.updatedAt : ""}</Text>
            </Box>
          </Flex>
          <BsThreeDotsVertical style={{ color: "#333", cursor: "pointer" }} size={20} />
        </Flex>
        <Box alignItems="center">
          <Flex my="2" mx="2" borderBottom="2px" borderColor="#999" borderStyle="dotted">
            Title:<Text>&nbsp;{comment ? comment.title : "デフォルトタイトル"}</Text>
          </Flex>
          <Text my="2" mx="2">
            {comment ? comment.description : "デフォルト本文"}
          </Text>
          <Image src="/images/building.jpeg" objectFit="cover" boxSize="100%" />
        </Box>
      </Box>
    </>
  );
}
