import { Box, Flex, Link, ListItem, OrderedList, Text, Tooltip, useClipboard, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { buildingList } from "../utils/paths";

const IndexPage: NextPage = () => {
  const [path, setPath] = useState("");
  const { onCopy, value } = useClipboard(path);

  const successCopy = (path: string) => {
    const copiedPath = document.URL + `building/${path}`;
    setPath(copiedPath);
    onCopy();
  };

  useEffect(() => {
    path !== "" && onCopy();
  }, [path]);

  return (
    <Box w="100vw" h="100vh" bg="#283b4f" color={"#fff"} fontWeight="600">
      <OrderedList pt=" 20px">
        <VStack>
          <Text fontSize="2xl">Building List</Text>
          {buildingList.map((val) => {
            return (
              <ListItem key={val.id}>
                <Flex>
                  <Link mr="3" href={`/building/${val.id}`}>
                    {val.name}
                  </Link>
                  <Tooltip
                    label={value.split("/building/")[1] && value.split("/building/")[1] === val.id ? "copied" : "copy"}
                    placement="right"
                    closeDelay={500}
                    hasArrow
                    bg="#d53f8c"
                    fontWeight="600"
                  >
                    <Box cursor="pointer" onClick={() => successCopy(val.id)}>
                      <BiCopy />
                    </Box>
                  </Tooltip>
                </Flex>
              </ListItem>
            );
          })}
        </VStack>
      </OrderedList>
    </Box>
  );
};

export default IndexPage;
