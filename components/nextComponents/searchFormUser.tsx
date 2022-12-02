import { Search2Icon } from "@chakra-ui/icons";
import { Box, Input, Select } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { UserRoles } from "../../types/UserRoles";

type Props = {
  setSearchUserName: Dispatch<SetStateAction<string>>;
  setSearchUserRole: Dispatch<SetStateAction<string>>;
};

export default function SearchFormUser({ setSearchUserName, setSearchUserRole }: Props) {
  const roleList = Object.keys(UserRoles);

  return (
    <Box w="65%" py="10px" bg="#ffffff" display="flex" alignItems="center" borderRadius="5px">
      <Search2Icon fontSize="20" color="#696969" ml="5" />
      <Box w="10%" color="#333" ml="10px" borderLeft="solid 1px #333">
        &nbsp;&nbsp;UserName :
      </Box>
      <Input
        w="65%"
        h="100%"
        border="none"
        color="#333333"
        focusBorderColor="none"
        placeholder={"Search User"}
        onChange={(e) => setSearchUserName(e.target.value)}
      />
      <Box w="5%" color="#333" borderLeft="solid 1px #333">
        &nbsp;&nbsp;Role :
      </Box>
      <Select
        placeholder="ユーザー権限で検索"
        variant="unstyled"
        w="25%"
        h="100%"
        size={"sm"}
        color="#333"
        textAlign="center"
        borderRadius={0}
        cursor="pointer"
        icon={<MdArrowDropDown />}
        onChange={(e) => setSearchUserRole(e.target.value)}
      >
        {roleList.map((role, index) => {
          return (
            <option key={index} value={index}>
              {role}
            </option>
          );
        })}
      </Select>
    </Box>
  );
}
