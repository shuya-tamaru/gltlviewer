import { Box, Button, Text } from "@chakra-ui/react";
import { AiOutlineComment } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { HiInformationCircle } from "react-icons/hi";

import Link from "next/link";

import { Building } from "../../types/Buildings";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { UserRoles } from "../../types/UserRoles";

type Props = {
  building: Building;
};
type buildingMenu = {
  menu: string;
  path: string;
  icon: JSX.Element;
  role: number;
};

export default function BuildingTopBar({ building }: Props) {
  const buildingMenu: buildingMenu[] = [
    {
      menu: "建物情報",
      path: `/buildings/buildingInformation/${building.id}`,
      icon: <HiInformationCircle size={25} />,
      role: UserRoles.Editor,
    },
    {
      menu: "グラフ",
      path: `/buildings/buildingGraph/${building.id}`,
      icon: <BsGraphUp size={25} />,
      role: UserRoles.Editor,
    },
    {
      menu: "ゲストを招待",
      path: "/users/inviteGuest",
      icon: <BiUserPlus size={25} />,
      role: UserRoles.Editor,
    },
    {
      menu: "コメント検索",
      path: `/comments/commentList/${building.id}`,
      icon: <AiOutlineComment size={25} />,
      role: UserRoles.OnlyWatch,
    },
  ];

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
