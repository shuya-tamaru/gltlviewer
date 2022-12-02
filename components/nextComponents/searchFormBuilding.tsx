import { Box, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { Dispatch } from "react";

import { Search } from "../../pages/topPage/[companyId]";

type Props = {
  setSearchInput: Dispatch<React.SetStateAction<Search>>;
};

export default function SearchFormBuilding({ setSearchInput }: Props) {
  return (
    <>
      <Box w="65%" bg="#ffffff" display="flex" py="10px" alignItems="center" borderRadius="5px">
        <Search2Icon fontSize="20" color="#696969" ml="5" />
        <Box w="8%" color="#333" ml="10px" borderLeft="solid 1px #333">
          &nbsp;&nbsp;物件名 :
        </Box>
        <Input
          sx={{ ...inputStyle, width: "40%", cursor: "" }}
          focusBorderColor="none"
          placeholder={"Search Building"}
          onChange={(e) => setSearchInput((prevState) => ({ ...prevState, buildingName: e.target.value }))}
        />
        <Box w="10%" color={inputStyle.color} borderLeft="solid 1px #333">
          &nbsp;&nbsp;開始日付 :
        </Box>
        <Input
          sx={{ ...inputStyle, width: "20%" }}
          type="date"
          focusBorderColor="none"
          onChange={(e) => setSearchInput((prevState) => ({ ...prevState, startDate: e.target.value }))}
        />
        <Box w="10%" color={inputStyle.color} borderLeft="solid 1px #333">
          &nbsp;&nbsp;終了日付 :
        </Box>
        <Input
          sx={{ ...inputStyle, width: "20%" }}
          type="date"
          focusBorderColor="none"
          onChange={(e) => setSearchInput((prevState) => ({ ...prevState, endDate: e.target.value }))}
        />
      </Box>
    </>
  );
}

const inputStyle = {
  width: "10%",
  height: "100%",
  border: "none",
  color: "#333333",
  cursor: "pointer",
};
