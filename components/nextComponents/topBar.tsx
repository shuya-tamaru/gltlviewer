import { ReactNode } from "react";

import Header from "./header";
import UserName from "./userName";

type Props = {
  children?: ReactNode;
};

export default function TopBar({ children }: Props) {
  return (
    <Header>
      {children}
      <UserName />
    </Header>
  );
}
