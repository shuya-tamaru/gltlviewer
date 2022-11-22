import { Box, Text } from '@chakra-ui/react';
import useCurrentFloor from '../stores/useCurrentFloor';
import useViewEvent from '../stores/useViewEvent';

const buttonStyles = {
  width: '60px',
  height: '40px',
  position: 'absolute',
  top: '5px',
  left: '5px',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  border: 'none',
  color: '#fff',
  fontSize: '1.5rem',
  background: 'rgb(0,0,0,0.7)',
};

function DisplayCurrentFloor() {
  const isPerspective = useViewEvent((state) => state.isPerspective);
  const currentWalkingFloor = useCurrentFloor((state) => state.currentWalkingFloor);
  const currentFloor = currentWalkingFloor?.split('_floor')[0];

  return (
    <>
      {!isPerspective && (
        <Box sx={buttonStyles}>
          <Text textAlign='center'>{currentFloor}</Text>
        </Box>
      )}
    </>
  );
}

export default DisplayCurrentFloor;
