import { Button, Tooltip } from "@chakra-ui/react";
import { AiOutlineComment } from "react-icons/ai";
import { ButtonStyles, HoverColor, IconStyle } from "./BottomMenu";
import useCommentModeState, { CommentModeStates } from "../stores/useCommentModeState";

type Props = {
  styleProps: [IconStyle, ButtonStyles, HoverColor];
};

function CommetnButton({ styleProps }: Props) {
  const [iconStyles, buttonStyles, hoverColor] = styleProps;
  const { commentModeState, setCommentModeState } = useCommentModeState((state) => state);
  const handleCommentAction = () => {
    commentModeState === CommentModeStates.INACTIVE
      ? setCommentModeState(CommentModeStates.READY)
      : setCommentModeState(CommentModeStates.INACTIVE);
  };

  return (
    <Button _hover={{ color: hoverColor }} sx={buttonStyles} variant="link" onClick={handleCommentAction}>
      <Tooltip hasArrow label="Add Comment" placement="top-start">
        <span>
          <AiOutlineComment style={iconStyles} />
        </span>
      </Tooltip>
    </Button>
  );
}

export default CommetnButton;
