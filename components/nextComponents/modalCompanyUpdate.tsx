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

import { HiOfficeBuilding } from "react-icons/hi";
import CompanyEditForm from "./companyEditForm";
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
      <Button
        onClick={onOpen}
        sx={buttonStyles}
        _hover={hoverStyles}
        leftIcon={<HiOfficeBuilding style={{ fontSize: iconSize }} />}
      >
        会社情報編集
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#666" textAlign="center">
            会社情報を編集
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" />
          <ModalBody pb="20px">
            <CompanyEditForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
