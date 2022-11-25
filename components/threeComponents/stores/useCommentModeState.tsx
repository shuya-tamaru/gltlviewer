import create from "zustand";

export const CommentModeStates = {
  INACTIVE: 0,
  READY: 1,
  ACTIVE: 2,
} as const;

export type CommentModeStatesType = typeof CommentModeStates[keyof typeof CommentModeStates];
export const AllActionType = Object.values(CommentModeStates);

interface ICommentModeStates {
  commentModeState: CommentModeStatesType;
  setCommentModeState: (state: CommentModeStatesType) => void;
}
export default create<ICommentModeStates>((set) => ({
  commentModeState: CommentModeStates.INACTIVE,
  setCommentModeState: (state: CommentModeStatesType) => {
    set(() => {
      return { commentModeState: state };
    });
  },
}));
