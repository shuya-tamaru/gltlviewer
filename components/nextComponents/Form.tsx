import { useToast, Button, Center, Flex, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef } from "react";

type Props = {
  modelName: string;
  setPassword: Dispatch<SetStateAction<string>>;
  correctPwd: string;
};

const Form = ({ modelName, setPassword, correctPwd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handlePass = () => {
    if (inputRef.current) {
      inputRef.current.value === correctPwd
        ? setPassword(inputRef.current.value)
        : ((inputRef.current.value = ""), toast({ title: "passwordが違います", status: "error", isClosable: true }));
    }
  };

  return (
    <>
      <Center w="100%" h="100vh" m="0 auto" color="#fff" bg="#283b4f">
        <VStack w="30%">
          <Text textAlign="center" fontSize="6xl">
            {modelName}
          </Text>
          <FormControl>
            <FormLabel fontWeight="600">Password</FormLabel>
            <Flex>
              <Input ref={inputRef} type="password" bg="#fff" color="#333" />
              <Button type="submit" colorScheme="pink" ml="1" onClick={handlePass}>
                submit
              </Button>
            </Flex>
          </FormControl>
        </VStack>
      </Center>
    </>
  );
};

export default Form;
