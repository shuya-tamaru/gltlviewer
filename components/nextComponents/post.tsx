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
    const getCommentUser = async () => {
      try {
        const user = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${comment.userId}`).then((res) => res.data);
        user && setCommentUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    getCommentUser();
  }, []);

  return (
    <>
      <Box w="100%" mb="5">
        <Flex alignItems="center" justify="space-between" borderBottom="2px" borderColor="#999">
          <Flex>
            <Image src="/images/avator.png" objectFit="cover" boxSize="60px" borderRadius="50%" />
            <Box ml="5" color="#333">
              <Text fontSize="lg">{commentUser ? commentUser.lastName + commentUser.firstName : ""}</Text>
              <Text fontSize="xs">{comment ? `投降日:${comment.createdAt.substring(0, 10)}` : "投降日:2022-01-01"}</Text>
              <Text fontSize="xs">{comment ? `更新日:${comment.updatedAt.substring(0, 10)}` : "更新日:2022-02-01"}</Text>
            </Box>
          </Flex>
          <BsThreeDotsVertical style={{ color: "#333", cursor: "pointer" }} size={20} />
        </Flex>
        <Box alignItems="center">
          <Flex my="2" mx="2" borderBottom="2px" borderColor="#999" borderStyle="dotted">
            Title:<Text>&nbsp;{comment ? comment.title : ""}</Text>
          </Flex>
          <Text my="2" mx="2">
            {comment ? comment.description : ""}
          </Text>
          <Image src="/images/building.png" objectFit="cover" boxSize="100%" />
        </Box>
      </Box>
    </>
  );
}
