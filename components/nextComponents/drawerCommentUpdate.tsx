import { useToast } from "@chakra-ui/react";
import axios from "axios";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useCurrentUser } from "../../context/CurrentUserContext";
import useImageUploader from "../../hooks/useImageUploader";
import useImageDelete from "../../hooks/useImageDelete";
import { Comments } from "../../types/Comments";
import DrawerForm from "./drawerForm";
import useCommentActions, { CommentActions } from "../threeComponents/stores/useCommentActions";
import useCommentTransmission from "../threeComponents/stores/useCommentTransmission";

type Props = {
  comment: Comments;
  commentsLength: number;
  setDisplayComemnt: Dispatch<SetStateAction<Comments | null>>;
  isOpenUpdate: boolean;
  onCloseUpdate: () => void;
};

export default function ({ comment, commentsLength, setDisplayComemnt, isOpenUpdate, onCloseUpdate }: Props) {
  const toast = useToast();

  const currentUser = useCurrentUser();

  const [title, setTitle] = useState<string>(`${comment.title}`);
  const [desc, setDesc] = useState<string>(`${comment.description}`);
  const [images, setImages] = useState<File[]>([]);
  const [initialExistingPaths, setInitialExistingPaths] = useState<string[]>([]);
  const [existingPaths, setExistingPaths] = useState<string[]>([]);

  const { setCommentAction } = useCommentActions((state) => state);
  const commentActions = CommentActions;
  const { setUpdateComment } = useCommentTransmission((state) => state);

  useEffect(() => {
    const getExistingImagePaths = async () => {
      const imagePaths: string[] = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/images/${comment.id}`)
        .then((res) => res.data);
      setInitialExistingPaths(imagePaths);
      setExistingPaths(imagePaths);
      setImages([]);
    };
    getExistingImagePaths();
  }, [isOpenUpdate]);

  const cancelComment = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    onCloseUpdate();
    setDesc(`${comment.description}`);
    setTitle(`${comment.title}`);
    setExistingPaths(initialExistingPaths);
    setImages([]);
    toast({
      title: `コメント編集をキャンセルしました`,
      status: "warning",
      isClosable: true,
    });
  };

  const updateComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updateComment = async () => {
      if (currentUser) {
        try {
          const newComment: Comments = {
            ...comment,
            title: title,
            description: desc,
          };

          await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${comment.id}/${currentUser.id}`, newComment);

          const deletePaths =
            existingPaths.length > 0
              ? initialExistingPaths.filter((path) => existingPaths.indexOf(path) === -1)
              : initialExistingPaths;
          if (deletePaths.length > 0) {
            useImageDelete(deletePaths);
          }

          images.length > 0 && useImageUploader(images, newComment.id);

          onCloseUpdate();
          setDesc(`${newComment.description}`);
          setTitle(`${newComment.title}`);
          setDisplayComemnt(newComment);
          commentsLength === 1 && (setUpdateComment(newComment), setCommentAction(commentActions.UPDATE_COMMENT));
          toast({
            title: `コメントを編集しました`,
            status: "success",
            isClosable: true,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    updateComment();
  };

  const props = {
    onClose: onCloseUpdate,
    isOpen: isOpenUpdate,
    cancelFunction: cancelComment,
    excuteFunction: updateComment,
    headerText: "コメント編集",
    title: title,
    setTitle: setTitle,
    desc: desc,
    setDesc: setDesc,
    excuteButtonText: "Update",
    images,
    setImages,
    existingPaths,
    setExistingPaths,
  };

  return (
    <>
      <DrawerForm props={props} />
    </>
  );
}
