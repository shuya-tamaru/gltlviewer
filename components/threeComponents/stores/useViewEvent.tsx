import create from 'zustand';

interface ViewState {
  isPerspective: boolean;
  setIsPerspective: (flg: boolean) => void;

  floorList: string[];
  setFloorList: (floorNames: string[]) => void;

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

  floorList: [],
  setFloorList: (floorNames: string[]) => {
    set(() => {
      return { floorList: floorNames };
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
