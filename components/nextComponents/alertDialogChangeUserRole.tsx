import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import axios from "axios";

import { Dispatch, SetStateAction, useRef, useState } from "react";

import { User } from "../../types/Users";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusUser: User | null;
  role: number | null;
  focusSelectorId: string | null;
  setFocusSelectorId: Dispatch<SetStateAction<string | null>>;
  setRole: Dispatch<SetStateAction<number | null>>;
};

const alertDialogChangeUserRole = ({ isOpen, focusUser, role, focusSelectorId, setFocusSelectorId, setRole, onClose }: Props) => {
  const cancelRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const userRoleUpdate = async () => {
    const updateUser = {
      ...focusUser,
      userRole: role,
    };
    await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${updateUser.id}`, updateUser).then((res) => res.data);
    toast(toastText.success);
  };

  const handleUserRole = async () => {
    setLoading(true);
    try {
      role && focusUser && userRoleUpdate();
    } catch (error) {
      console.log(error);
      toast(toastText.error);
    }
    setLoading(false);
    setFocusSelectorId(null);
    setRole(null);
    onClose();
  };

  const cancelAction = () => {
    if (focusSelectorId && focusUser) {
      const selector = document.getElementById(focusSelectorId) as HTMLSelectElement;
      const cancelUserRole = async () => {
        const user = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/${focusUser.id}`).then((res) => res.data);
        selector.value = user.userRole.toString();
      };
      cancelUserRole();
    }
    toast(toastText.cancel);
    setFocusSelectorId(null);
    setRole(null);
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={cancelAction}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            ユーザー権限の変更
          </AlertDialogHeader>

          <AlertDialogBody>
            {focusUser && focusUser.lastName + focusUser.firstName + "の権限を本当に変更しますか？"}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" onClick={handleUserRole} isLoading={loading}>
              更新
            </Button>
            <Button ref={cancelRef} onClick={cancelAction} ml={3}>
              キャンセル
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const toastText = {
  success: {
    title: `権限の更新が完了しました`,
    status: "success",
    isClosable: true,
  },
  error: {
    title: `権限の更新に失敗しましt`,
    status: "error",
    isClosable: true,
  },
  cancel: {
    title: `権限の更新をキャンセルしました`,
    status: "warning",
    isClosable: true,
  },
} as {
  success: UseToastOptions;
  error: UseToastOptions;
  cancel: UseToastOptions;
};

export default alertDialogChangeUserRole;
