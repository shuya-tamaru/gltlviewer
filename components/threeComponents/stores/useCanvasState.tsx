import create from "zustand";

export const CanvasState = {
  LOADING: 0,
  READY: 1,
  ADD_COMMENT: 2,
  CANCEL_COMMENT: 3,
} as const;

export type CanvasStateType = typeof CanvasState[keyof typeof CanvasState];
export const AllActionType = Object.values(CanvasState);

interface ICanvasState {
  currentCanvasState: CanvasStateType;
  setCanvasState: (state: CanvasStateType) => void;
}
export default create<ICanvasState>((set) => ({
  currentCanvasState: CanvasState.LOADING,
  setCanvasState: (state: CanvasStateType) => {
    set(() => {
      return { currentCanvasState: state };
    });
  },
}));
