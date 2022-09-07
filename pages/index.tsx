import { Box, Text } from '@chakra-ui/react'

import type { NextPage } from 'next'

import BuildingLink from '../components/buildingLink'
import TopBar from '../components/topBar'


const IndexPage: NextPage = () => {
  const buildings= [0,1,2,3,4,5];

  return (
    <>
      <TopBar />
      <Box w="100%" h="100vh - 80px" bg="#f5f5f5" display="flex" flexDirection="column">
        <Text fontSize="40px" fontWeight="800" pt="20px" pb="10px" color="#666666" m="auto">BuildingList</Text>
        {buildings.map((building: number)=> (
          <BuildingLink key={building} building = {building} ></BuildingLink>
        ))}
      </Box>
    </>
  )
}

export default IndexPage
