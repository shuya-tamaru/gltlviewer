import { Button, Tooltip } from '@chakra-ui/react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { HoverColor } from './BottomMenu';
import useCommentAction, { CommentAction } from '../stores/useCommentAction';

const buttonStyles = {
  position: 'absolute',
  bottom: '10%',
  left: '50%',
  padding: 0,
  margin: 0,
  borderRadius: '50%',
  cursor: 'pointer',
  border: 'none',
  color: '#fff',
};

type Props = {
  styleProps: [HoverColor];
};

function CommentAddButton({ styleProps }: Props) {
  const [hoverColor] = styleProps;
  const { commentAction, setCommsntAction } = useCommentAction((state) => state);
  const actions = CommentAction;
  const tooltipText = commentAction === actions.READY ? 'Add Comment' : 'Cancel';

  return (
    <Button _hover={{ color: hoverColor }} sx={buttonStyles} variant='link'>
      <Tooltip hasArrow label={tooltipText} placement='top-start'>
        <span>
          {commentAction !== actions.ACTIVE ? (
            <AiFillPlusCircle size={40} onClick={() => setCommsntAction(actions.ACTIVE)} />
          ) : (
            <MdCancel size={40} onClick={() => setCommsntAction(actions.READY)} />
          )}
        </span>
      </Tooltip>
    </Button>
  );
}

export default CommentAddButton;
