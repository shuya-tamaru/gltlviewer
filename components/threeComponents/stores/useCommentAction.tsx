import create from 'zustand';

export const CommentAction = {
  INACTIVE: 0,
  READY: 1,
  ACTIVE: 2,
} as const;

export type CommentActionType = typeof CommentAction[keyof typeof CommentAction];
export const AllActionType = Object.values(CommentAction);

interface CommentActionState {
  commentAction: CommentActionType;
  setCommsntAction: (action: CommentActionType) => void;
}
export default create<CommentActionState>((set) => ({
  commentAction: CommentAction.INACTIVE,
  setCommsntAction: (action: CommentActionType) => {
    set(() => {
      return { commentAction: action };
    });
  },
}));
