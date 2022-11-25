import { Button, Tooltip } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { HoverColor } from "./BottomMenu";
import useCommentModeState, { CommentModeStates } from "../stores/useCommentModeState";

const buttonStyles = {
  position: "absolute",
  bottom: "10%",
  left: "50%",
  padding: 0,
  margin: 0,
  borderRadius: "50%",
  cursor: "pointer",
  border: "none",
  color: "#fff",
};

type Props = {
  styleProps: [HoverColor];
};

function CommentAddButton({ styleProps }: Props) {
  const [hoverColor] = styleProps;
  const { commentModeState, setCommentModeState } = useCommentModeState((state) => state);

  const tooltipText = commentModeState === CommentModeStates.READY ? "Add Comment" : "Cancel";

  return (
    <Button _hover={{ color: hoverColor }} sx={buttonStyles} variant="link">
      <Tooltip hasArrow label={tooltipText} placement="top-start">
        <span>
          {commentModeState !== CommentModeStates.ACTIVE ? (
            <AiFillPlusCircle size={40} onClick={() => setCommentModeState(CommentModeStates.ACTIVE)} />
          ) : (
            <MdCancel size={40} onClick={() => setCommentModeState(CommentModeStates.READY)} />
          )}
        </span>
      </Tooltip>
    </Button>
  );
}

export default CommentAddButton;
