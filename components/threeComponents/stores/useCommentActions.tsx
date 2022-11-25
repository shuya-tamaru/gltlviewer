import create from "zustand";

export const CommentActions = {
  LOADING: 0,
  READY: 1,
  WAITING: 2,
  ADD_COMMENT: 3,
  CANCEL_COMMENT: 4,
  SELECT_COMMENT: 5,
  UPDATE_COMMENT: 6,
  DELETE_COMMENT: 7,
} as const;

export type CommentActionsType = typeof CommentActions[keyof typeof CommentActions];
export const AllActionType = Object.values(CommentActions);

interface ICommentActions {
  currentCommentAction: CommentActionsType;
  setCommentAction: (state: CommentActionsType) => void;
}
export default create<ICommentActions>((set) => ({
  currentCommentAction: CommentActions.LOADING,
  setCommentAction: (state: CommentActionsType) => {
    set(() => {
      return { currentCommentAction: state };
    });
  },
}));
