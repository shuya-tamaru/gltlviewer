import { Menu, MenuButton, MenuItem, MenuList, Portal, Tooltip } from '@chakra-ui/react';
import { IoLayersOutline } from 'react-icons/io5';
import { HoverColor, IconStyle } from './BottomMenu';
import useViewEvent from './stores/useViewEvent';

type Props = {
  styleProps: [IconStyle, HoverColor];
};

function FloorSelector({ styleProps }: Props) {
  const [iconStyles, hoverColor] = styleProps;

  const floors: string[] = useViewEvent((state) => state.floorLength);
  const floorsReverse = [...floors].reverse();
  const handleVisibleFloors = useViewEvent((state) => state.handleFloorVisible);

  const handleFloorVisibe = (floorName: string) => {
    const selectedFloor = floorName.split('_floor')[0];
    handleVisibleFloors(selectedFloor);
  };

  return (
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
          <MenuItem className='button' key={'all'} onClick={(e) => handleFloorVisibe('all')}>
            {'全階表示'}
          </MenuItem>
          {floorsReverse.map((floorName, index) => {
            const floorNum = floors.length;
            const floor = floorNum - index;
            return (
              <MenuItem className='button' key={floor} onClick={() => handleFloorVisibe(floorName)}>
                {floorName}
              </MenuItem>
            );
          })}
        </MenuList>
      </Portal>
    </Menu>
  );
}

export default FloorSelector;
