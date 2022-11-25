import create from "zustand";
import { Comments } from "../../../types/Comments";
import * as THREE from "three";

type FocusComment = {
  guid: string;
  coordinate: THREE.Vector3;
  id?: string;
};

interface initialCommentsFetch {
  initialCommentsFetch: Comments[];
  setInitialCommentsFetch: (state: Comments[]) => void;
  focusComment: FocusComment;
  setfocusComment: (focusComment: FocusComment) => void;
  updateComment: null | Comments;
  setUpdateComment: (updateComment: Comments | null) => void;
}

export default create<initialCommentsFetch>((set) => ({
  initialCommentsFetch: [],
  setInitialCommentsFetch: (state: Comments[]) => {
    set(() => {
      return { initialCommentsFetch: state };
    });
  },

  focusComment: { guid: "", coordinate: new THREE.Vector3(0, 0, 0), id: "" },
  setfocusComment: (focusComment: FocusComment) => {
    set(() => {
      return { focusComment: focusComment };
    });
  },

  updateComment: null,
  setUpdateComment: (updateComment: Comments | null) => {
    set(() => {
      return { updateComment: updateComment };
    });
  },
}));
