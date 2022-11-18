import create from 'zustand';
import * as THREE from 'three';

interface PositionState {
  floorDefaultPosition: THREE.Vector3[];
  setFloorDefaultPosition: (positon: THREE.Vector3[]) => void;
  destinationFloor: null | number;
  setDestinationFloor: (floorNum: number | null) => void;
  currentWalkingFloor: string | null;
  setCurrentWalkingFloor: (floorName: string) => void;
}

export default create<PositionState>((set) => ({
  floorDefaultPosition: [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 3, 0),
    new THREE.Vector3(0, 6, 0),
    new THREE.Vector3(0, 9, 0),
    new THREE.Vector3(0, 12, 0),
  ],
  setFloorDefaultPosition: (positon: THREE.Vector3[]) => {
    set(() => {
      return { floorDefaultPosition: positon };
    });
  },
  destinationFloor: null,
  setDestinationFloor: (floorNum: number | null) => {
    set(() => {
      return { destinationFloor: floorNum };
    });
  },

  currentWalkingFloor: null,
  setCurrentWalkingFloor: (floorName: string) => {
    set(() => {
      return { currentWalkingFloor: floorName };
    });
  },
}));
