import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

import BuildingTopBar from "../../../components/nextComponents/buildingTopBar";
import Header from "../../../components/nextComponents/header";
import UserName from "../../../components/nextComponents/userName";
import { useCurrentUser } from "../../../context/CurrentUserContext";
import { Building } from "../../../types/Buildings";
import { UserRoles } from "../../../types/UserRoles";

type Props = {
  building: Building;
};

export default function ({ building }: Props) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  if (currentUser) {
    currentUser.userRole > UserRoles.Editor && router.push(`/topPage/${currentUser.companyId}`);
  }

  return (
    currentUser &&
    currentUser.userRole <= UserRoles.Editor && (
      <>
        <Header>
          <UserName />
        </Header>
        <Flex>
          <Box w="100%" h="calc(100vh - 80px)">
            <BuildingTopBar building={building} />
            <Box w="100%" h="92%" bg="blue" p="5px" fontSize="100">
              {building.name}長期修繕計画など
            </Box>
          </Box>
        </Flex>
      </>
    )
  );
}

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings`).then((res) => res.data);
  if (!result) return;
  const paths: [{ params: { buildingId: string } }] = result.map((building: Building) => ({
    params: { buildingId: `${building.id}` },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const result: Building = await axios
    .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings/${params!.buildingId}`)
    .then((res) => res.data);
  return { props: { building: result } };
}
