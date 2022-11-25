import { Image, Text, VStack } from "@chakra-ui/react";
import useCommentActions, { CommentActions } from "../stores/useCommentActions";
import useCommentModeState, { CommentModeStates } from "../stores/useCommentModeState";

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
  const { commentModeState } = useCommentModeState((state) => state);
  const { setCommentAction } = useCommentActions((state) => state);

  const selectComment = () => {
    commentModeState === CommentModeStates.READY && setCommentAction(CommentActions.SELECT_COMMENT);
  };

  return (
    <VStack sx={styles} id={"popUp"} cursor={"pointer"} onClick={() => selectComment()}>
      <Text id={"popDate"}>投稿日</Text>
      <Text id={"poptitle"}>タイトル:hello</Text>
      <Text id={"popdescription"}>本文:こんにちは</Text>
      <Image id={"popImage"} src={"/images/pika.jpeg"} objectFit="cover" boxSize="60px" mx="2" />
    </VStack>
  );
}

export default PopupText;
