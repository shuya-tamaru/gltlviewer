import create from 'zustand';

interface ViewState {
  floorLength: string[];
  fetchFloor: (floorNames: string[]) => void;

  visibleFloors: string;
  handleFloorVisible: (selectedFloor: string) => void;
}

export default create<ViewState>((set) => ({
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
}));
