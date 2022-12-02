import { Box, Button, Text } from "@chakra-ui/react";

import Link from "next/link";

import { Building } from "../../types/Buildings";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { buildingBarMenu } from "../utils/buildingBarMenu";

type Props = {
  building: Building;
};

export default function BuildingTopBar({ building }: Props) {
  const buildingMenu = buildingBarMenu(building.id);
  const currentUser = useCurrentUser();

  return (
    <>
      <Box w="100%" h="8%" px="20px" position="relative" borderColor="#999" borderBottom="2px solid #dcdcdc">
        <Link href={building ? `/buildings/${building.id}` : ""}>
          <Text fontSize="30px" fontWeight="750" color="#666666" position="absolute" bottom="0" left="20px" cursor="pointer">
            {building.name}
          </Text>
        </Link>
        <Box position="absolute" bottom="0" right="20px">
          {currentUser &&
            buildingMenu.map((menuObj) => {
              if (currentUser.userRole <= menuObj.role) {
                return (
                  <Link href={menuObj.path} key={menuObj.menu}>
                    <Button w="160px" colorScheme="red" ml="5px" borderRadius="0px" leftIcon={menuObj.icon}>
                      {menuObj.menu}
                    </Button>
                  </Link>
                );
              }
            })}
        </Box>
      </Box>
    </>
  );
}
