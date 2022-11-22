import BottomMenu from './BottomMenu';
import DisplayCurrentFloor from './DisplayCurrentFloor';
import PopupText from './PopupText';
import LoadingDisplay from './LoadingDisplay';

function Interface() {
  return (
    <>
      <LoadingDisplay />
      <BottomMenu />
      <DisplayCurrentFloor />
      <PopupText />
    </>
  );
}

export default Interface;
