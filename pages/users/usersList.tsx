import { Box, Flex, Image, Text, Select, useDisclosure, useToast, SimpleGrid, UseToastOptions } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import AlertDialogChangeUserRole from "../../components/nextComponents/alertDialogChangeUserRole";
import SearchFormUser from "../../components/nextComponents/searchFormUser";

import TopBar from "../../components/nextComponents/topBar";
import { toastText } from "../../components/utils/toastStatus";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Company } from "../../types/Companys";
import { UserRoles } from "../../types/UserRoles";
import { User } from "../../types/Users";

export default function () {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const roleList = Object.keys(UserRoles);

  //currentState
  const currentUser = useCurrentUser();
  const [company, setCompany] = useState<Company | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  //editRoleState
  const [focusSelectorId, setFocusSelectorId] = useState<string | null>(null);
  const [focusUser, setFocusUser] = useState<User | null>(null);
  const [role, setRole] = useState<number | null>(null);

  //searchState
  const [searchUsers, setSearchUsers] = useState<User[]>([]);
  const [searchUserName, setSearchUserName] = useState<string>("");
  const [searchUserRole, setSearchUserRole] = useState<string>("");

  useEffect(() => {
    const getCurrentCompany = async () => {
      if (!currentUser) return;
      const currentCompany: Company = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/companys/${currentUser.companyId}`)
        .then((res) => res.data);
      const companyUsers: User[] = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/company/${currentUser.companyId}`)
        .then((res) => res.data);
      setSearchUsers(companyUsers);
      setUsers(companyUsers);
      setCompany(currentCompany);
    };
    getCurrentCompany();
  }, [currentUser]);

  useEffect(() => {
    if (users.length > 0) {
      const filterUserList: User[] = users.filter((user) => {
        const name: string = user.lastName + user.firstName;
        const role: number = user.userRole;
        const isSearchedName: boolean = name.toLowerCase().indexOf(searchUserName.trim().toLowerCase()) !== -1;
        const isSearchedRole: boolean = searchUserRole === "" ? true : role.toString() === searchUserRole;
        if (isSearchedName && isSearchedRole) return user;
      });
      setSearchUsers(filterUserList);
    }
  }, [searchUserName, searchUserRole]);

  const handleFocusSelector = (e: ChangeEvent<HTMLSelectElement>, user: User) => {
    if (currentUser && user.id === currentUser.id && currentUser.userRole === UserRoles.CompanyAdmin) {
      toast({ ...toastText.error, title: alertText });
      e.target.value = user.userRole.toString();
      return;
    }
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
      <TopBar>
        <SearchFormUser setSearchUserName={setSearchUserName} setSearchUserRole={setSearchUserRole} />
      </TopBar>
      <Box w="100%" h="calc(100vh - 80px)" bg="#f5f5f5" display="flex" flexDirection="column" justifyContent="center">
        <Box w="calc(100% - 20px)" h="100%" overflowY="scroll" p="0 10px 0 10px">
          <Text fontSize="25px" fontWeight="600" textAlign="center" color="#666" py="5px">
            {company && company.name}
          </Text>
          <SimpleGrid columns={5} spacing={5}>
            {searchUsers.map((user, index) => {
              return (
                <Box key={index} sx={style}>
                  <Image src={user.imagePath ? user.imagePath : `/images/avator.png`} objectFit="cover" boxSize="80px" />
                  <Flex display={"flex"} flexDirection={"column"} justify={"start"}>
                    <Box fontSize="20px" fontWeight="550">
                      {user.lastName + user.firstName}
                    </Box>
                    <Box fontSize="15px" fontWeight="550" mt="10px">
                      {user.email}
                    </Box>
                    {currentUser && currentUser.userRole < UserRoles.Editor ? (
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
                        {roleList.map((role, index) => {
                          return (
                            <option key={index} value={index}>
                              {role}
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

const alertText =
  "管理者は自身の権限を変更することはできません。権限を変更する場合は他の管理者を選定し、新しい管理者が変更を行なってください。";

const style = {
  w: "100%",
  h: "150px",
  bg: "#fff",
  borderRadius: "5px",
  mt: "10px",
  shadow: "xl",
  p: "5px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};
