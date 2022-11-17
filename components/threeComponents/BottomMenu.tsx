import { Button, Flex, Tooltip } from '@chakra-ui/react';
import { AiOutlineComment } from 'react-icons/ai';
import CommetnButton from './CommetnButton';

import CurrentViewButton from './CurrentViewButton';
import FloorSelector from './FloorSelector';

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

export default function BottomMenu() {
  return (
    <Flex position='absolute' bottom='5%' left='20px'>
      <CurrentViewButton styleProps={[iconStyles, buttonStyles, hoverColor]} />
      <FloorSelector styleProps={[iconStyles, hoverColor]} />
      <CommetnButton styleProps={[iconStyles, buttonStyles, hoverColor]} />
    </Flex>
  );
}
