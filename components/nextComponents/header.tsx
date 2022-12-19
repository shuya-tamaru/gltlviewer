import { Box, Text } from "@chakra-ui/react";

import Link from "next/link";
import { ReactNode } from "react";

import { useCurrentUser } from "../../context/CurrentUserContext";

type Props = {
  children?: ReactNode;
};

export default function Header({ children }: Props) {
  const currentUser = useCurrentUser();

  return (
    <>
      <Box
        bg="#6b48ff"
        w="100%"
        h="80px"
        p={4}
        color="white"
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        position="sticky"
        zIndex={"10"}
      >
        <Link href={currentUser ? `/topPage/${currentUser.companyId}` : ""}>
          <Text fontWeight="800" fontSize="4xl" cursor="pointer" mx="2">
            ServiceName
          </Text>
        </Link>
        {children}
      </Box>
    </>
  );
}
