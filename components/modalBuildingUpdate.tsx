import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { Tooltip } from '@chakra-ui/react';

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
      <Tooltip hasArrow color='#fff' fontWeight='600' label='建物情報を編集' bg='red.400' placement='top'>
        <Button onClick={onOpen} mr='10px' colorScheme='gray'>
          <FiEdit style={{ fontSize: '20px' }} />
        </Button>
      </Tooltip>

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
