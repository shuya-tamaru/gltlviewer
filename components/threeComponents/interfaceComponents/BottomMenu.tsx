import { Flex } from '@chakra-ui/react';
import CommentAddButton from './CommentAddButton';
import CommetnButton from './CommetnButton';

import CurrentViewButton from './CurrentViewButton';
import FloorSelector from './FloorSelector';
import useCommentAction, { CommentAction } from '../stores/useCommentAction';

export type IconStyle = { fontSize: string };
export type HoverColor = string;
export type ButtonStyles = {
  padding: number;
  margin: number;
  borderRadius: string;
  cursor: string;
  border: string;
  color: string;
};

const iconStyles: IconStyle = { fontSize: '1.5em' };
const hoverColor: HoverColor = '#e60012';
const buttonStyles: ButtonStyles = {
  padding: 0,
  margin: 0,
  borderRadius: '50%',
  cursor: 'pointer',
  border: 'none',
  color: '#fff',
};

function BottomMenu() {
  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;

  return (
    <>
      <Flex position='absolute' bottom='5%' left='20px'>
        <CurrentViewButton styleProps={[iconStyles, buttonStyles, hoverColor]} />
        <FloorSelector styleProps={[iconStyles, hoverColor]} />
        <CommetnButton styleProps={[iconStyles, buttonStyles, hoverColor]} />
      </Flex>
      {commentAction !== actions.INACTIVE && <CommentAddButton styleProps={[hoverColor]} />}
    </>
  );
}
export default BottomMenu;
