import { Menu, MenuButton, MenuItem, MenuList, Portal, Tooltip } from '@chakra-ui/react';
import { IoLayersOutline } from 'react-icons/io5';
import { HoverColor, IconStyle } from './BottomMenu';
import useCurrentFloor from '../stores/useCurrentFloor';
import useViewEvent from '../stores/useViewEvent';

type Props = {
  styleProps: [IconStyle, HoverColor];
};

function FloorSelector({ styleProps }: Props) {
  const [iconStyles, hoverColor] = styleProps;

  const { isPerspective, floorList, handleFloorVisible } = useViewEvent((state) => state);
  const floorListReverse = [...floorList].reverse();
  const handleFloorVisibe = (floorName: string) => {
    const selectedFloor = floorName.split('_floor')[0];
    handleFloorVisible(selectedFloor);
  };

  const { setDestinationFloor, setCurrentWalkingFloor } = useCurrentFloor((state) => state);
  const handleCurrentFloor = (floorNum: number, floorName: string) => {
    setDestinationFloor(floorNum);
    setCurrentWalkingFloor(floorName);
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
          {isPerspective ? (
            <MenuItem className='button' key={'all'} onClick={() => handleFloorVisibe('all')}>
              {'全階表示'}
            </MenuItem>
          ) : (
            <></>
          )}
          {floorListReverse.map((floorName, index) => {
            const floorNum = floorListReverse.length;
            const floor = floorNum - index;
            return (
              <MenuItem
                className='button'
                key={floor}
                onClick={() =>
                  isPerspective ? handleFloorVisibe(floorName) : handleCurrentFloor(floor - 1, floorName)
                }
              >
                {isPerspective ? floorName : floorName + 'へ移動'}
              </MenuItem>
            );
          })}
        </MenuList>
      </Portal>
    </Menu>
  );
}

export default FloorSelector;
