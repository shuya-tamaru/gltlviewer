import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import Form from "../../components/nextComponents/form";
import Header from "../../components/nextComponents/header";
import RegisterInputForm from "../../components/nextComponents/registerInputForm";

export default function () {
  const inputForms = ["会社名", "会社住所", "電話番号"];
  const title = "会社登録";
  const buttonText = "登録";
  const redirectPath = "/registration";
  const redirectPage = true;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header></Header>
      <Flex w="100vw" h="calc(100vh - 80px)" display="flex" justify="center" alignItems="center" margin="auto">
        <Box w="30%" bg="#ffffff" p="10px 10px 20px 10px" shadow="dark-lg" borderRadius="5px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Text fontSize="25px" fontWeight="800" color="#666666" textAlign="center">
              {title}
            </Text>
            {inputForms && inputForms.map((form: string) => <RegisterInputForm key={form} form={form} />)}
            {redirectPage ? (
              <Link href={redirectPath}>
                <Button type="submit" w="90%" h="50" py="5" ml="5" mt="5" color="#ffffff" colorScheme="red" fontWeight="800">
                  {buttonText}
                </Button>
              </Link>
            ) : (
              <Button type="submit" w="90%" h="50" py="5" ml="5" mt="5" color="#ffffff" colorScheme="red" fontWeight="800">
                {buttonText}
              </Button>
            )}
          </form>
        </Box>
      </Flex>
      <Form
        inputForms={inputForms}
        title={title}
        buttonText={buttonText}
        redirectPath={redirectPath}
        redirectPage={redirectPage}
      />
    </>
  );
}
