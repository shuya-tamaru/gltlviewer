import { Box, Link, ListItem, OrderedList, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { buildingList } from "../utils/paths";

const IndexPage: NextPage = () => {
  return (
    <Box w="100vw" h="100vh" bg="#283b4f" color={"#fff"} fontWeight="600">
      <OrderedList pt=" 20px">
        <VStack>
          <Text fontSize="2xl">Building List</Text>
          {buildingList.map((val) => {
            return (
              <ListItem key={val.id}>
                <Link href={`/building/${val.id}`}>{val.id}</Link>;
              </ListItem>
            );
          })}
        </VStack>
      </OrderedList>
    </Box>
  );
};

export default IndexPage;
