import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { GetStaticPropsContext } from "next";

import BuildingLink from "../../components/nextComponents/buildingLink";
import TopBar from "../../components/nextComponents/topBar";
import Pagination from "../../components/nextComponents/pagenation";
import { SelectPage } from "../../types/SelectPage";
import { Building } from "../../types/Buildings";
import { Company } from "../../types/Companys";
import { useSession } from "next-auth/react";
import Spiner from "../../components/nextComponents/spiner";
import SearchFormBuilding from "../../components/nextComponents/searchFormBuilding";

export type Search = {
  buildingName: string;
  startDate: string;
  endDate: string;
};

type GetBuildings = Building[] | null;
type Props = {
  getbuildings: GetBuildings;
};

export default function ({ getbuildings }: Props) {
  const [currentItems, setCurrentItems] = useState<GetBuildings>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { status } = useSession();
  const [searchInput, setSearchInput] = useState<Search>({ buildingName: "", startDate: "", endDate: "" });

  const itemsPerPage = 6;

  useEffect(() => {
    if (!getbuildings || getbuildings.length <= 0) return;
    const searchedBuildings = getSearchedBuildings(getbuildings);

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(searchedBuildings.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(searchedBuildings!.length / itemsPerPage));
  }, [searchInput, itemOffset, itemsPerPage]);

  const handlePageClick: SelectPage = (selected) => {
    const newOffset = getbuildings ? (selected.selected * itemsPerPage) % getbuildings.length : itemOffset;
    setItemOffset(newOffset);
  };

  const getSearchedBuildings = (getbuildings: Building[]) => {
    const searchedBuildings = getbuildings.filter((building) => {
      const name = building.name;
      const isSearchName: boolean = name.toLowerCase().indexOf(searchInput.buildingName.trim().toLowerCase()) !== -1;

      let isSearchDate: boolean;
      const createdAt = new Date(building.createdAt.substring(0, 10));
      if (searchInput.startDate === "" && searchInput.endDate === "") {
        isSearchDate = true;
      } else if (searchInput.startDate !== "" && searchInput.endDate !== "") {
        const searchStartDate = new Date(searchInput.startDate);
        const searchEndtDate = new Date(searchInput.endDate);
        isSearchDate = searchStartDate <= createdAt && createdAt <= searchEndtDate ? true : false;
      } else if (searchInput.startDate !== "") {
        const searchStartDate = new Date(searchInput.startDate);
        isSearchDate = searchStartDate <= createdAt ? true : false;
      } else {
        const searchEndtDate = new Date(searchInput.endDate);
        isSearchDate = createdAt <= searchEndtDate ? true : false;
      }

      if (isSearchName && isSearchDate) return building;
    });
    return searchedBuildings;
  };

  return (
    <>
      {status === "loading" || status === "unauthenticated" ? (
        <Spiner />
      ) : (
        <>
          <TopBar>
            <SearchFormBuilding setSearchInput={setSearchInput} />
          </TopBar>
          <Box w="100%" h="calc(100vh - 120px)" bg="#f5f5f5" display="flex" flexDirection="column">
            <Text h="80px" fontSize="30px" fontWeight="800" color="#666666" m="auto" my="5px">
              物件一覧
            </Text>
            <Box h="calc(100vh)" display="flex" flexDirection="column">
              {currentItems &&
                currentItems.map((building: Building) => <BuildingLink key={building.id} building={building}></BuildingLink>)}
            </Box>
            <Pagination pageCount={pageCount} handlePageClick={handlePageClick}></Pagination>
          </Box>
        </>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/companys`).then((res) => res.data);
  if (!result) return;
  const paths: [{ params: { companyId: string } }] = result.map((company: Company) => ({
    params: { companyId: `${company.id}` },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const ENDPOINT = `${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings/buildingList/${params!.companyId}`;
  const result: GetBuildings = await axios.get(ENDPOINT).then((res) => res.data);
  return { props: { getbuildings: result } };
}
