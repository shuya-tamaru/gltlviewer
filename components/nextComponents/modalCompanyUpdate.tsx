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
import { HiOfficeBuilding } from 'react-icons/hi';
import CompanyEditForm from './companyEditForm';

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme='#fff'
        borderRadius='0'
        color='#666'
        _hover={{ background: 'red', color: '#fff' }}
        leftIcon={<HiOfficeBuilding style={{ fontSize: '20px' }} />}
      >
        会社情報編集
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='#666' textAlign='center'>
            会社情報を編集
          </ModalHeader>
          <ModalCloseButton borderRadius='50%' />
          <ModalBody pb='20px'>
            <CompanyEditForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
