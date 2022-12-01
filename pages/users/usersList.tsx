import { Box, Flex, Image, Text, VStack, Select, useDisclosure, useToast, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import AlertDialogChangeUserRole from "../../components/nextComponents/alertDialogChangeUserRole";

import TopBar from "../../components/nextComponents/topBar";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Company } from "../../types/Companys";
import { UserRoles } from "../../types/UserRoles";
import { User } from "../../types/Users";

export default function () {
  const searchText = "Search User";
  const roleList = Object.keys(UserRoles);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUser = useCurrentUser();
  const [company, setCompany] = useState<Company | null>(null);
  const [users, setUsers] = useState<User[] | []>([]);
  const [focusSelectorId, setFocusSelectorId] = useState<string | null>(null);
  const [focusUser, setFocusUser] = useState<User | null>(null);
  const [role, setRole] = useState<number | null>(null);

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

  const handleFocusSelector = (e: ChangeEvent<HTMLSelectElement>, user: User) => {
    const selectorId = e.target.id;
    const selectedRole = parseInt(e.target.value);
    setFocusSelectorId(selectorId);
    setRole(selectedRole);
    setFocusUser(user);
    onOpen();
  };

  const getKeyByValue = (object: Record<string, unknown>, value: unknown) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  return (
    <>
      <TopBar searchText={searchText} />
      <Box w="100%" h="calc(100vh - 80px)" bg="#f5f5f5" display="flex" flexDirection="column" justifyContent="center">
        <Box w="calc(100% - 20px)" h="100%" overflowY="scroll" p="0 10px 0 10px">
          <Text fontSize="25px" fontWeight="600" textAlign="center" color="#666" py="5px">
            {company && company.name}
          </Text>
          <SimpleGrid columns={5} spacing={5}>
            {users.map((user, index) => {
              return (
                <Box key={index} sx={style}>
                  <Box w="100%" display="flex" justifyContent="space-around" alignItems="center">
                    <Image src={user.imagePath ? user.imagePath : `/images/pika.jpeg`} objectFit="cover" boxSize="90px" />
                    <Flex display={"flex"} flexDirection={"column"} justify={"start"}>
                      <Box fontSize="20px" fontWeight="550">
                        {user.lastName + user.firstName}
                      </Box>
                      <Box fontSize="15px" fontWeight="550" mt="10px">
                        {user.email}
                      </Box>
                      {currentUser && currentUser.userRole < UserRoles.Commenter ? (
                        <Select
                          variant="filled"
                          id={"selector" + index.toString()}
                          defaultValue={user.userRole}
                          w="170px"
                          size={"sm"}
                          mt="10px"
                          icon={<MdArrowDropDown />}
                          onChange={(e) => {
                            handleFocusSelector(e, user);
                          }}
                        >
                          {roleList.map((form, index) => {
                            return (
                              <option key={index} value={index}>
                                {form}
                              </option>
                            );
                          })}
                        </Select>
                      ) : (
                        <Text fontSize="15px" fontWeight="550" mt="10px">
                          {getKeyByValue(UserRoles, user.userRole)}
                        </Text>
                      )}
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>
        <AlertDialogChangeUserRole
          isOpen={isOpen}
          focusUser={focusUser}
          role={role}
          focusSelectorId={focusSelectorId}
          setFocusSelectorId={setFocusSelectorId}
          setRole={setRole}
          onClose={onClose}
        />
      </Box>
    </>
  );
}

const style = {
  w: "100%",
  h: "150px",
  bg: "#fff",
  borderRadius: "5px",
  mt: "10px",
  shadow: "2xl",
  p: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "all 0.5s ease",
};
