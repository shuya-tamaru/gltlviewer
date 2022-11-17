import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Portal, Tooltip } from '@chakra-ui/react';
import { IoLayersOutline } from 'react-icons/io5';
import { AiOutlineComment } from 'react-icons/ai';
import { BiWalk } from 'react-icons/bi';
import { GiCube } from 'react-icons/gi';

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import useViewEvent from './stores/useViewEvent';

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

  const floors: string[] = useViewEvent((state) => state.floorLength);
  const floorsReverse = [...floors].reverse();
  const handleVisibleFloors = useViewEvent((state) => state.handleFloorVisible);

  const handleFloorVisibe = (e: React.MouseEvent<HTMLButtonElement>, floorName: string) => {
    e.stopPropagation();
    const selectedFloor = floorName.split('_floor')[0];
    handleVisibleFloors(selectedFloor);
  };

  return (
    <Flex position='absolute' bottom='5%' left='20px'>
      {/* walkThrougButton */}
      <Button _hover={{ color: hoverColor }} onClick={handleIcon} sx={buttonStyles} variant='link'>
        {currentView ? (
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

      {/* floorSelector */}
      <Menu>
        <Tooltip hasArrow label='Select Floor' placement='top-start'>
          <MenuButton color='#fff' _hover={{ color: hoverColor }} w='40px' className='button'>
            <span style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <IoLayersOutline style={iconStyles} />
            </span>
          </MenuButton>
        </Tooltip>
        <Portal>
          <MenuList>
            <MenuItem className='button' key={'all'} onClick={(e) => handleFloorVisibe(e, 'all')}>
              {'全階表示'}
            </MenuItem>
            {floorsReverse.map((floorName, index) => {
              const floorNum = floors.length;
              const floor = floorNum - index;
              return (
                <MenuItem className='button' key={floor} onClick={(e) => handleFloorVisibe(e, floorName)}>
                  {floorName}
                </MenuItem>
              );
            })}
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
