import create from 'zustand';

interface ViewState {
  isPerspective: boolean;
  setIsPerspective: (flg: boolean) => void;

  floorLength: string[];
  fetchFloor: (floorNames: string[]) => void;

  visibleFloors: string;
  handleFloorVisible: (selectedFloor: string) => void;

  cameraIsMoving: boolean;
  cameraMovingToggle: (flg: boolean) => void;
}

export default create<ViewState>((set) => ({
  isPerspective: true,
  setIsPerspective: (flg: boolean) => {
    set(() => {
      return { isPerspective: flg };
    });
  },

  floorLength: [],
  fetchFloor: (floorNames: string[]) => {
    set(() => {
      return { floorLength: floorNames };
    });
  },

  visibleFloors: 'all',
  handleFloorVisible: (selectedFloor: string) => {
    set(() => {
      return { visibleFloors: selectedFloor };
    });
  },

  cameraIsMoving: false,
  cameraMovingToggle: (flg: boolean) => {
    set(() => {
      return { cameraIsMoving: flg };
    });
  },
}));
