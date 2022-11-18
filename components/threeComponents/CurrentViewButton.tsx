import { Button, Tooltip } from '@chakra-ui/react';
import { BiWalk } from 'react-icons/bi';
import { GiCube } from 'react-icons/gi';
import { ButtonStyles, HoverColor, IconStyle } from './BottomMenu';
import useCommentAction, { CommentAction } from './stores/useCommentAction';
import useViewEvent from './stores/useViewEvent';

type Props = {
  styleProps: [IconStyle, ButtonStyles, HoverColor];
};

function CurrentViewButton({ styleProps }: Props) {
  const [iconStyles, buttonStyles, hoverColor] = styleProps;

  const isPerspective = useViewEvent((state) => state.isPerspective);
  const setIsPerspective = useViewEvent((state) => state.setIsPerspective);

  const cameraMovingToggle = useViewEvent((state) => state.cameraMovingToggle);
  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;

  const handleIcon = () => {
    if (commentAction === actions.ACTIVE) return;
    setIsPerspective(!isPerspective);
    cameraMovingToggle(true);
  };

  return (
    <Button _hover={{ color: hoverColor }} onClick={handleIcon} sx={buttonStyles} variant='link'>
      {isPerspective ? (
        <Tooltip hasArrow label='Walk Through' placement='top-start'>
          <span>
            <BiWalk style={iconStyles} className='button' />
          </span>
        </Tooltip>
      ) : (
        <Tooltip hasArrow label='Perspective' placement='top-start'>
          <span>
            <GiCube style={iconStyles} className='button' />
          </span>
        </Tooltip>
      )}
    </Button>
  );
}

export default CurrentViewButton;
