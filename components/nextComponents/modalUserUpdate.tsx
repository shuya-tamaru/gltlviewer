import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";

import UserEditForm from "./userEditForm";
import { ButtonStyles, HoverStyles, IconSize } from "./userHamburgerMenu";

type Props = {
  iconSize: IconSize;
  buttonStyles: ButtonStyles;
  hoverStyles: HoverStyles;
};

export default function ({ iconSize, buttonStyles, hoverStyles }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} sx={buttonStyles} _hover={hoverStyles} leftIcon={<FaUserEdit style={{ fontSize: iconSize }} />}>
        ユーザー情報編集
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#666" textAlign="center">
            ユーザー情報編集
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" />
          <ModalBody pb="20px">
            <UserEditForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
