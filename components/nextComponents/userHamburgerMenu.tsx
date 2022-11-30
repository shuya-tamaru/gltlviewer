import { Box, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MdLogout } from "react-icons/md";
import { BiUserPlus } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { useCurrentUser, useCurrentUserUpdate } from "../../context/CurrentUserContext";
import ModalUserUpdate from "./modalUserUpdate";
import ModalCompanyUpdate from "./modalCompanyUpdate";
import { UserRoles } from "../../types/UserRoles";

export default function UserHamburgerMenu() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserUpdate();

  const signout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/auth/signout`);
    setCurrentUser(null);
    signOut({ redirect: false });
    router.push("/login");
  };

  //handle hamburger menu
  const [menuState, setMenuState] = useState<string>("none");
  const clickedElement = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const el = clickedElement.current;
    if (!el) return;
    const hundleClickOutside = (e: MouseEvent) => {
      !el?.contains(e.target as Node) ? setMenuState("none") : setMenuState("flex");
    };
    document.addEventListener("click", hundleClickOutside);
  }, [clickedElement]);

  return (
    <>
      {currentUser && (
        <>
          <HamburgerIcon ml="10px" fontSize="40px" cursor="pointer" ref={clickedElement} />
          <Box
            display={menuState}
            flexDirection="column"
            bg="#fff"
            position="absolute"
            right="-10px"
            top="70px"
            zIndex="10"
            shadow="md"
          >
            <ModalUserUpdate iconSize={iconSize} buttonStyles={buttonStyles} hoverStyles={hoverStyles} />
            {currentUser.userRole < UserRoles.Commenter && (
              <ModalCompanyUpdate iconSize={iconSize} buttonStyles={buttonStyles} hoverStyles={hoverStyles} />
            )}
            {currentUser.userRole < UserRoles.Commenter && (
              <Link href={"/users/inviteUser"}>
                <Button sx={buttonStyles} _hover={hoverStyles} leftIcon={<BiUserPlus style={{ fontSize: iconSize }} />}>
                  新規ユーザーの招待
                </Button>
              </Link>
            )}

            <Link href={"/users/usersList"}>
              <Button sx={buttonStyles} _hover={hoverStyles} leftIcon={<CgUserList style={{ fontSize: iconSize }} />}>
                ユーザーリスト
              </Button>
            </Link>
            <Button
              onClick={signout}
              sx={buttonStyles}
              _hover={hoverStyles}
              leftIcon={<MdLogout style={{ fontSize: iconSize }} />}
            >
              ログアウト
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export type IconSize = string;
export type ButtonStyles = {
  w: string;
  background: string;
  borderRadius: string;
  color: string;
};
export type HoverStyles = {
  background: string;
  color: string;
};

const iconSize: IconSize = "20px";
const buttonStyles: ButtonStyles = {
  w: "200px",
  background: "#fff",
  borderRadius: "0",
  color: "#666",
};
const hoverStyles: HoverStyles = {
  background: "red",
  color: "#fff",
};
