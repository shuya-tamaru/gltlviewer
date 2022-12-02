import { AiOutlineComment } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { HiInformationCircle } from "react-icons/hi";
import { UserRoles } from "../../types/UserRoles";

type buildingBarMenu = {
  menu: string;
  path: string;
  icon: JSX.Element;
  role: number;
};

type FunctionType = (buildingId: string) => buildingBarMenu[];

export const buildingBarMenu: FunctionType = (buildingId: string) => {
  const menu = [
    {
      menu: "建物情報",
      path: `/buildings/buildingInformation/${buildingId}`,
      icon: <HiInformationCircle size={25} />,
      role: UserRoles.Editor,
    },
    {
      menu: "グラフ",
      path: `/buildings/buildingGraph/${buildingId}`,
      icon: <BsGraphUp size={25} />,
      role: UserRoles.Editor,
    },
    {
      menu: "ゲストを招待",
      path: "/users/inviteGuest",
      icon: <BiUserPlus size={25} />,
      role: UserRoles.Editor,
    },
    {
      menu: "コメント検索",
      path: `/comments/commentList/${buildingId}`,
      icon: <AiOutlineComment size={25} />,
      role: UserRoles.OnlyWatch,
    },
  ];
  return menu;
};
