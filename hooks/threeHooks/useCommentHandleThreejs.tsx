import * as THREE from "three";

import { MutableRefObject, useEffect } from "react";

import useCommentActions, { CommentActions } from "../../components/threeComponents/stores/useCommentActions";
import useCommentTransmission from "../../components/threeComponents/stores/useCommentTransmission";
import { Comments } from "../../types/Comments";

type GroupRef = MutableRefObject<THREE.Group | null>;
type AddNewIcon = (commentData?: Comments, FocusTemp?: boolean) => void;

function useCommentHandleThreejs(groupRef: GroupRef, addNewCommentIcon: AddNewIcon) {
  const commentActions = CommentActions;
  const { currentCommentAction, setCommentAction } = useCommentActions((state) => state);
  const { focusComment, initialCommentsFetch, updateComment, setUpdateComment } = useCommentTransmission((state) => state);

  const iconDelete = () => {
    const deteletCommentIcon = groupRef.current!.children.filter((icon) => icon.uuid === focusComment.guid);
    deteletCommentIcon && deteletCommentIcon.length > 0 && groupRef.current!.remove(deteletCommentIcon[0]);
  };

  useEffect(() => {
    initialCommentsFetch.length > 0 &&
      initialCommentsFetch.map((comment) => {
        addNewCommentIcon(comment);
      });
  }, [initialCommentsFetch]);

  useEffect(() => {
    switch (currentCommentAction) {
      case commentActions.CANCEL_COMMENT: {
        iconDelete();
        break;
      }
      case commentActions.UPDATE_COMMENT: {
        const updateCommentIcon = groupRef.current!.children.filter((icon) => icon.uuid === focusComment.guid);
        updateCommentIcon[0].userData = { tag: "comment", ...updateComment! };
        setUpdateComment(null);
        break;
      }
      case commentActions.DELETE_COMMENT: {
        iconDelete();
        break;
      }
    }
    setCommentAction(commentActions.WAITING);
  }, [currentCommentAction]);

  return;
}

export default useCommentHandleThreejs;
