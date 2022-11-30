import { Box, Flex, Image, Radio, Text, VStack, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import TopBar from "../../components/nextComponents/topBar";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Company } from "../../types/Companys";
import { UserRoles } from "../../types/UserRoles";
import { User } from "../../types/Users";

const style = {
  w: "80%",
  h: "100px",
  bg: "#fff",
  borderRadius: "5px",
  mt: "10px",
  shadow: "2xl",
  p: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.5s ease",
};

export default function () {
  const searchText = "Search User";
  const radioForm = ["admin", "権限1", "権限2", "権限3", "権限4"];

  const currentUser = useCurrentUser();
  const [company, setCompany] = useState<Company | null>(null);
  const [users, setUsers] = useState<User[] | []>([]);
  const [focusUser, setFocusUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentCompany = async () => {
      if (!currentUser) return;
      const response: Company = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/companys/${currentUser.companyId}`)
        .then((res) => res.data);
      const companyUsers: User[] = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/company/${currentUser.companyId}`)
        .then((res) => res.data);
      setUsers(companyUsers);
      setCompany(response);
    };
    getCurrentCompany();
  }, [currentUser]);

  function getKeyByValue(object: Record<string, unknown>, value: unknown) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  return (
    <>
      <TopBar searchText={searchText} />
      <Box w="100%" h="calc(100vh - 80px)" bg="#f5f5f5" display="flex" flexDirection="column">
        <Flex h="100%">
          <Box w="50%" h="100%" overflowY="scroll" shadow="2xl">
            <Text fontSize="25px" fontWeight="600" textAlign="center" color="#666" py="5px">
              {company && company.name}
            </Text>
            <Flex w="100%" display="flex" flexDirection="column" alignItems="center">
              {users.map((user) => {
                return (
                  <Box
                    key={user.id}
                    onClick={() => setFocusUser(user)}
                    sx={style}
                    _hover={{ transform: "scale(1.001)", opacity: 0.6 }}
                  >
                    <Box w="80%" display="flex" justifyContent="start" alignItems="center">
                      <Image
                        src={user.imagePath ? user.imagePath : `/images/pika.jpeg`}
                        objectFit="cover"
                        boxSize="60px"
                        borderRadius="50%"
                      />
                      <Text ml="30px" fontSize="25px" fontWeight="550">
                        {user.lastName + user.firstName}
                      </Text>
                    </Box>
                    <Text mx="30px" fontSize="15px" fontWeight="550">
                      {getKeyByValue(UserRoles, user.userRole)}
                    </Text>
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box w="50%" h="100%" display="flex" justifyContent="center" alignItems="center">
            {focusUser && (
              <Box w="80%" h="70%" bg="#fff" borderRadius="5px" shadow="2xl">
                <VStack w="100%" h="100%" p="20px" display="flex" alignItems="center">
                  <Image
                    src={focusUser.imagePath ? focusUser.imagePath : `/images/pika.jpeg`}
                    objectFit="cover"
                    boxSize="150px"
                    borderRadius="50%"
                    shadow="2xl"
                  />
                  <Text fontSize="50px" fontWeight="700">
                    {focusUser.lastName + " " + focusUser.firstName}
                  </Text>
                  <Text fontSize="25px" fontWeight="550">
                    email : {focusUser.email}
                  </Text>

                  {currentUser && currentUser.userRole < UserRoles.Editor && (
                    <RadioGroup name="radio" display="flex" justifyContent="center">
                      <Box py="5">
                        <VStack align="stretch">
                          {radioForm.map((form, index) => {
                            return (
                              <Radio key={index} size="lg" value={index.toString()}>
                                {form}
                              </Radio>
                            );
                          })}
                        </VStack>
                      </Box>
                    </RadioGroup>
                  )}
                </VStack>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
