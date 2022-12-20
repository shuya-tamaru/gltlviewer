import {
  Button,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { useCurrentUser } from "../../context/CurrentUserContext";
import useImageDelete from "../../hooks/useImageDelete";
import { Comments } from "../../types/Comments";
import useCommentActions, { CommentActions } from "../threeComponents/stores/useCommentActions";
import useCommentTransmission from "../threeComponents/stores/useCommentTransmission";
import { toastText } from "../utils/toastStatus";

type Props = {
  isOpenAlert: boolean;
  onCloseAlert: () => void;
  comment: Comments;
  setComments: Dispatch<SetStateAction<Comments[] | []>>;
  index: number;
};

export default function ({ index, isOpenAlert, onCloseAlert, comment, setComments }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const currentUser = useCurrentUser();

  const [imagePaths, setImgePath] = useState<string[]>([]);

  const { setCommentAction } = useCommentActions((state) => state);
  const commentActions = CommentActions;
  const { setUpdateComment } = useCommentTransmission((state) => state);

  useEffect(() => {
    const getExistingImagePaths = async () => {
      const paths: string[] = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/images/${comment.id}`)
        .then((res) => res.data);
      setImgePath(paths);
    };
    getExistingImagePaths();
  }, []);

  const deleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const deleteComment = async () => {
      if (currentUser) {
        try {
          const roomId = comment.commentRoomId;

          const deleteComment = async () => {
            await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${comment.id}/${currentUser.id}`);

            //fetchCommentRoom
            const commentsInRoom = await axios
              .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/comments/${roomId}`)
              .then((res) => res.data);

            if (commentsInRoom.length === 0) {
              await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comment-rooms/${roomId}`);
              setCommentAction(commentActions.DELETE_COMMENT);
            } else if (index === 0) {
              const firstCommentInRoom = commentsInRoom[0];
              setUpdateComment(firstCommentInRoom);
              setCommentAction(commentActions.UPDATE_COMMENT);
            }
            setComments(commentsInRoom);
            toast({ ...toastText.success, title: "コメントを削除しました" });
          };

          const deleteImage = async (commentId: string) => {
            //deleteImage in DB
            await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/images/comment/${commentId}`);
            //deleteAllImage in S3
            useImageDelete(imagePaths);
          };

          const deleleImageAndComment = async (commentId: string) => {
            await deleteImage(commentId);
            await deleteComment();
          };

          //deleteImages & comment
          imagePaths.length > 0 ? deleleImageAndComment(comment.id) : deleteComment();
        } catch (error) {
          console.log(error);
        }
      }
    };
    deleteComment();
  };

  return (
    <>
      <AlertDialog isOpen={isOpenAlert} leastDestructiveRef={cancelRef} onClose={onCloseAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              コメントの削除
            </AlertDialogHeader>

            <AlertDialogBody>コメントを完全に削除いたします。よろしいでしょうか？</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="red"
                onClick={(e) => {
                  deleteComment(e);
                  onCloseAlert();
                }}
              >
                Delete
              </Button>
              <Button ref={cancelRef} onClick={onCloseAlert} ml={3}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
