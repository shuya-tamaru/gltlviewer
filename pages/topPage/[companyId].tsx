import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { GetStaticPropsContext } from 'next';

import BuildingLink from '../../components/buildingLink';
import TopBar from '../../components/topBar';
import Pagination from '../../components/pagenation';
import { SelectPage } from '../../types/SelectPage';
import { Building } from '../../types/Buildings';
import { Company } from '../../types/Companys';

type GetBuildings = Building[] | null;
type Props = {
  getbuildings: GetBuildings;
};

export default function ({ getbuildings }: Props) {
  const [currentItems, setCurrentItems] = useState<GetBuildings>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const searchText = 'Search Building';

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (getbuildings) {
      setCurrentItems(getbuildings.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(getbuildings.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage]);

  const handlePageClick: SelectPage = (selected) => {
    const newOffset = getbuildings ? (selected.selected * itemsPerPage) % getbuildings.length : itemOffset;
    setItemOffset(newOffset);
  };

  return (
    <>
      <TopBar searchText={searchText} />
      <Box w='100%' h='calc(100vh - 120px)' bg='#f5f5f5' display='flex' flexDirection='column'>
        <Text h='80px' fontSize='40px' fontWeight='800' color='#666666' m='auto' my='5px'>
          物件一覧
        </Text>
        <Box h='calc(100vh)' display='flex' flexDirection='column'>
          {currentItems &&
            currentItems.map((building: Building) => <BuildingLink key={building.id} building={building}></BuildingLink>)}
        </Box>
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick}></Pagination>
      </Box>
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
