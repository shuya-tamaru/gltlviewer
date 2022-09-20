import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

import { ReactNode } from 'react'

type Props = {
  children?: ReactNode 
}

export default function Header({children}:Props) {
  return (
    <>
      <Box bg="#6b48ff" w="100%" h="80px" p={4} color="white" alignItems="center" display="flex" justifyContent="space-between" position="sticky">
        <Link href="/">
          <Text fontWeight="800" fontSize={32} cursor="pointer">ServiceName</Text>
        </Link>
        {children}
      </Box>
    </>
  );
}