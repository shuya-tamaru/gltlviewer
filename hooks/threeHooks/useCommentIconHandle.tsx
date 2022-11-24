import * as THREE from "three";

import { MutableRefObject, useEffect } from "react";

import useCanvasState, { CanvasState } from "../../components/threeComponents/stores/useCanvasState";
import useCommentTransmission from "../../components/threeComponents/stores/useCommentTransmission";

function useCommentIconHandle(groupRef: MutableRefObject<THREE.Group | null>) {
  const canvasState = CanvasState;
  const { currentCanvasState, setCanvasState } = useCanvasState((state) => state);
  const { focusComment } = useCommentTransmission((state) => state);

  useEffect(() => {
    switch (currentCanvasState) {
      case canvasState.CANCEL_COMMENT: {
        const cancelCommentIcon = groupRef.current!.children.filter((icon) => icon.uuid === focusComment.guid);
        cancelCommentIcon && cancelCommentIcon.length > 0 && groupRef.current!.remove(cancelCommentIcon[0]);
        break;
      }
    }
  }, [currentCanvasState]);

  return;
}

export default useCommentIconHandle;
