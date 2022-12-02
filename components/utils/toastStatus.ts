import { UseToastOptions } from "@chakra-ui/react";

export const toastText = {
  success: {
    title: "",
    status: "success",
    isClosable: true,
  },
  error: {
    title: "",
    status: "error",
    isClosable: true,
  },
  cancel: {
    title: "",
    status: "warning",
    isClosable: true,
  },
} as {
  success: UseToastOptions;
  error: UseToastOptions;
  cancel: UseToastOptions;
};
