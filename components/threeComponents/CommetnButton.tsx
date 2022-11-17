import { Button, Tooltip } from '@chakra-ui/react';
import { AiOutlineComment } from 'react-icons/ai';
import { ButtonStyles, HoverColor, IconStyle } from './BottomMenu';

type Props = {
  styleProps: [IconStyle, ButtonStyles, HoverColor];
};

function CommetnButton({ styleProps }: Props) {
  const [iconStyles, buttonStyles, hoverColor] = styleProps;
  return (
    <Button _hover={{ color: hoverColor }} sx={buttonStyles} variant='link'>
      <Tooltip hasArrow label='Add Comment' placement='top-start'>
        <span>
          <AiOutlineComment style={iconStyles} />
        </span>
      </Tooltip>
    </Button>
  );
}

export default CommetnButton;
