import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

import { useCurrentUser } from "../../context/CurrentUserContext";
import { Building } from "../../types/Buildings";
import { UserRoles } from "../../types/UserRoles";
import ModalBuildingUpdate from "./modalBuildingUpdate";
import Spiner from "./spiner";
import { buildingState } from "./store/Building/building";

type Props = {
  building: Building;
};

export default function BuildingLink({ building }: Props) {
  const setBuilding = useSetRecoilState(buildingState);
  const currentUser = useCurrentUser();

  const setCurrentBuilding = () => {
    setBuilding(building);
  };

  return (
    <>
      <Flex
        bg="#ffffff"
        w="60%"
        h="100px"
        alignItems="center"
        m="0 auto 10px auto"
        boxShadow="2xl"
        borderRadius="3px"
        justify="space-between"
        transition="all 0.5s ease"
        _hover={{ transform: "scale(1.001)", opacity: 0.7 }}
      >
        <a href={`/buildings/${building.id}`} onClick={setCurrentBuilding}>
          <Image
            src={building.imagePath ? building.imagePath : "/images/building.png"}
            objectFit="cover"
            boxSize="100px"
            cursor="pointer"
            fallback={<Spiner containerWidth={"100%"} containerHeight={"100%"} iconWidth={"100"} iconHeight={"100"} />}
          />
        </a>
        <Box h="100%" w="100%">
          <a href={`/buildings/${building.id}`}>
            <Text
              fontSize="3xl"
              w="100% - 20px"
              h="70%"
              lineHeight="70px"
              m="auto"
              fontWeight="800"
              color="#555555"
              ml="20px"
              cursor="pointer"
            >
              {building.name}
            </Text>
            <Text fontSize="xl" w="100% - 20px" h="30%" lineHeight="30px" m="auto" fontWeight="800" color="#555555" ml="20px">
              CreatedAt : {building.createdAt.substring(0, 10)}
            </Text>
          </a>
        </Box>
        <Box position="relative">
          {currentUser && currentUser.userRole < UserRoles.Commenter && <ModalBuildingUpdate building={building} />}
        </Box>
      </Flex>
    </>
  );
}
