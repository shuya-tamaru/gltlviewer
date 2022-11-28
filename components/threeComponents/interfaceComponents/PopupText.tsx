import { Image, Text, VStack } from "@chakra-ui/react";

const styles = {
  background: "#fff",
  width: "200px",
  position: "absolute",
  padding: 0,
  margin: 0,
  border: "none",
  color: "#333",
  visibility: "hidden",
};

function PopupText() {
  return (
    <VStack sx={styles} id={"popUp"} cursor={"pointer"}>
      <Text id={"popDate"}>投稿日</Text>
      <Text id={"poptitle"}>タイトル:hello</Text>
      <Text id={"popdescription"}>本文:こんにちは</Text>
      <Image id={"popImage"} src={"/images/pika.jpeg"} objectFit="cover" boxSize="60px" mx="2" />
    </VStack>
  );
}

export default PopupText;
