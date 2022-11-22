import { Button, Tooltip } from '@chakra-ui/react';
import { AiOutlineComment } from 'react-icons/ai';
import { ButtonStyles, HoverColor, IconStyle } from './BottomMenu';
import useCommentAction, { CommentAction } from '../stores/useCommentAction';

type Props = {
  styleProps: [IconStyle, ButtonStyles, HoverColor];
};

function CommetnButton({ styleProps }: Props) {
  const [iconStyles, buttonStyles, hoverColor] = styleProps;
  const { commentAction, setCommsntAction } = useCommentAction((state) => state);
  const actions = CommentAction;
  const handleCommentAction = () => {
    commentAction === actions.INACTIVE ? setCommsntAction(actions.READY) : setCommsntAction(actions.INACTIVE);
  };

  return (
    <Button _hover={{ color: hoverColor }} sx={buttonStyles} variant='link' onClick={handleCommentAction}>
      <Tooltip hasArrow label='Add Comment' placement='top-start'>
        <span>
          <AiOutlineComment style={iconStyles} />
        </span>
      </Tooltip>
    </Button>
  );
}

export default CommetnButton;
