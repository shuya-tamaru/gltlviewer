import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { Building } from '../types/Buildings';
import BuildingEditForm from './buildingEditForm';

type Props = {
  building: Building;
};

export default function ({ building }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputForm = ['建物名'];

  return (
    <>
      <Button onClick={onOpen} mr='10px' colorScheme='messenger'>
        編集
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='#666' textAlign='center'>
            建物情報を編集
          </ModalHeader>
          <ModalCloseButton borderRadius='50%' />
          <ModalBody pb='20px'>
            <BuildingEditForm inputForms={inputForm} data={building} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
