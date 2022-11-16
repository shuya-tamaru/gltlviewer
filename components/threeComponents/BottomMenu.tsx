import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Portal, Tooltip } from '@chakra-ui/react';
import { IoLayersOutline } from 'react-icons/io5';
import { AiOutlineComment } from 'react-icons/ai';
import { BiWalk } from 'react-icons/bi';
import { GiCube } from 'react-icons/gi';

import { Dispatch, SetStateAction } from 'react';

const iconStyles = { fontSize: '1.5em' };
const hoverColor = '#e60012';
const buttonStyles = {
  padding: '0',
  margin: 0,
  borderRadius: '50%',
  cursor: 'pointer',

  border: 'none',
  color: '#fff',
};

type Props = {
  currentView: boolean;
  setCurrentView: Dispatch<SetStateAction<boolean>>;
};

export default function BottomMenu({ currentView, setCurrentView }: Props) {
  const handleIcon = () => {
    setCurrentView(!currentView);
  };

  return (
    <Flex position='absolute' bottom='5%' left='20px'>
      {/* walkThrougButton */}
      <Button _hover={{ color: hoverColor }} sx={buttonStyles} variant='link'>
        {currentView ? (
          <Tooltip hasArrow label='Walk Through' placement='top-start'>
            <span>
              <BiWalk style={iconStyles} onClick={handleIcon} />
            </span>
          </Tooltip>
        ) : (
          <Tooltip hasArrow label='Perspective' placement='top-start'>
            <span>
              <GiCube style={iconStyles} onClick={handleIcon} />
            </span>
          </Tooltip>
        )}
      </Button>

      {/* floorSelector */}
      <Menu>
        <Tooltip hasArrow label='Select Floor' placement='top-start'>
          <MenuButton color='#fff' _hover={{ color: hoverColor }} w='40px'>
            <span style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <IoLayersOutline style={iconStyles} />
            </span>
          </MenuButton>
        </Tooltip>
        <Portal>
          <MenuList>
            <MenuItem>Menu 1</MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Open Closed Tab</MenuItem>
            <MenuItem>Open File</MenuItem>
          </MenuList>
        </Portal>
      </Menu>

      {/* commentBotton */}
      <Button _hover={{ color: hoverColor }} sx={buttonStyles} variant='link'>
        <Tooltip hasArrow label='Add Comment' placement='top-start'>
          <span>
            <AiOutlineComment style={iconStyles} />
          </span>
        </Tooltip>
      </Button>
    </Flex>
  );
}
