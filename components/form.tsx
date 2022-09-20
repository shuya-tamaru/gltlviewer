import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

import RegisterInputForm from "./registerInputForm";

type inputForms = {
  inputForms?: string[],
  title: string,
  buttonText: string,
  redirectPath: string,
  redirectPage :boolean,
};


export default function({inputForms, title, buttonText, redirectPath, redirectPage}:inputForms) {

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto" >
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px" >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize="25px" fontWeight="800" color="#666666" textAlign="center">{title}</Text>
            {inputForms && inputForms.map((form:string) => (
              <RegisterInputForm key={form} form={form}/>
            ))}
            {
              redirectPage
              ?<Link href={redirectPath}><Button type="submit" w="90%" h="50" py="5" ml="5" mt="5" color="#ffffff" colorScheme="red" fontWeight="800" >{buttonText}</Button></Link>
              :<Button type="submit" w="90%" h="50" py="5" ml="5" mt="5" color="#ffffff" colorScheme="red" fontWeight="800" >{buttonText}</Button>
            }
          </form>
        </Box>
      </Flex>
    </>
  );
}
