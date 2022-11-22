import create from 'zustand';
import * as THREE from 'three';

interface ViewState {
  isPerspective: boolean;
  setIsPerspective: (flg: boolean) => void;

  floorList: string[];
  setFloorList: (floorNames: string[]) => void;

  visibleFloors: string;
  handleFloorVisible: (selectedFloor: string) => void;

  cameraIsMoving: boolean;
  cameraMovingToggle: (flg: boolean) => void;

  perspectiveCameraPos: THREE.Vector3;
  setPerspectiveCameraPos: (position: THREE.Vector3) => void;
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

  perspectiveCameraPos: new THREE.Vector3(-20, 20, 20),
  setPerspectiveCameraPos: (position: THREE.Vector3) => {
    set(() => {
      return { perspectiveCameraPos: position };
    });
  },
}));
