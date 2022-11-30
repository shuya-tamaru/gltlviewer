import { Box, Image, Text } from "@chakra-ui/react";

import { useCurrentUser } from "../../context/CurrentUserContext";
import UserHamburgerMenu from "./userHamburgerMenu";

export default function UserName() {
  const currentUser = useCurrentUser();

  return (
    <>
      {currentUser && (
        <Box display="flex" justifyContent="center" alignItems="center" position="relative">
          <Image
            src={currentUser?.imagePath ? currentUser?.imagePath : "/images/pika.jpeg"}
            objectFit="cover"
            boxSize="60px"
            borderRadius="50%"
            mx="2"
          />
          <Text fontSize="xl" fontWeight="550" textAlign="center">
            {currentUser.lastName + currentUser.firstName}
          </Text>
          <UserHamburgerMenu />
        </Box>
      )}
    </>
  );
}
