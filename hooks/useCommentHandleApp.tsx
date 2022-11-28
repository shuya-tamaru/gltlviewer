import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useCommentActions, { CommentActions } from "../components/threeComponents/stores/useCommentActions";
import useCommentTransmission from "../components/threeComponents/stores/useCommentTransmission";
import { Building } from "../types/Buildings";
import { Comments } from "../types/Comments";
type Props = {
  building: Building;
  setDisplayState: Dispatch<SetStateAction<"flex" | "none">>;
  setComments: Dispatch<SetStateAction<[] | Comments[]>>;
};

function useCommentHandleApp(props: Props) {
  const { building, setDisplayState, setComments } = props;
  const commentActions = CommentActions;
  const { currentCommentAction, setCommentAction } = useCommentActions((state) => state);
  const { setInitialCommentsFetch } = useCommentTransmission((state) => state);
  const [initialComments, setInitialComments] = useState<Comments[] | []>([]);
  const { focusComment } = useCommentTransmission((state) => state);

  useEffect(() => {
    const getComments = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/firstCommentInRoom/${building.id}`).then((res) => {
        setInitialComments(res.data);
      });
    };
    getComments();
  }, []);

  useEffect(() => {
    switch (currentCommentAction) {
      case commentActions.READY: {
        initialComments.length > 0 && setInitialCommentsFetch(initialComments);
        break;
      }
      case commentActions.SELECT_COMMENT: {
        const { id } = focusComment;
        setDisplayState("flex");
        setCommentAction(commentActions.WAITING);
        const getComments = async () => {
          const commentsInRoom = await axios
            .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/comments/${id}`)
            .then((res) => res.data);
          setComments(commentsInRoom);
        };
        getComments();
        break;
      }
      default: {
        break;
      }
    }
  }, [currentCommentAction]);

  return;
}

export default useCommentHandleApp;
