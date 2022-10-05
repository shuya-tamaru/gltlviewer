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
import { FaUserEdit } from 'react-icons/fa';
import UserEditForm from './userEditForm';

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
        leftIcon={<FaUserEdit style={{ fontSize: '20px' }} />}
      >
        ユーザー情報編集
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='#666' textAlign='center'>
            ユーザー情報編集
          </ModalHeader>
          <ModalCloseButton borderRadius='50%' />
          <ModalBody pb='20px'>
            <UserEditForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
