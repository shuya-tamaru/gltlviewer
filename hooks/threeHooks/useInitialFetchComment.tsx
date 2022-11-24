import { useEffect } from "react";
import useCommentTransmission from "../../components/threeComponents/stores/useCommentTransmission";
import { Comments } from "../../types/Comments";

type addNewCommentType = (commentData?: Comments, FocusTemp?: boolean) => void;

function useInitialFetchComment(addNewCommentIcon: addNewCommentType) {
  const { initialCommentsFetch } = useCommentTransmission((state) => state);

  useEffect(() => {
    if (initialCommentsFetch.length > 0) {
      initialCommentsFetch.map((comment) => {
        addNewCommentIcon(comment);
      });
    }
  }, [initialCommentsFetch]);
  return;
}

export default useInitialFetchComment;
