import { useToast, useDisclosure } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { Building } from "../../types/Buildings";
import axios from "axios";
import { useCurrentUser } from "../../context/CurrentUserContext";
import DrawerForm from "./drawerForm";
import useImageUploader from "../../hooks/useImageUploader";
import useCommentActions, { CommentActions } from "../threeComponents/stores/useCommentActions";
import useCommentTransmission from "../threeComponents/stores/useCommentTransmission";
import { toastText } from "../utils/toastStatus";

type Props = {
  building: Building;
};
type NewComment = {
  title: string;
  description: string;
  commentRoomId: string;
};

export default function ({ building }: Props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useCurrentUser();
  const commentActions = CommentActions;
  const { currentCommentAction, setCommentAction } = useCommentActions((state) => state);
  const { focusComment, setUpdateComment } = useCommentTransmission((state) => state);

  const [desc, setDesc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [coordinate, setCoordinate] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (currentCommentAction === commentActions.ADD_COMMENT) {
      const coordinate = focusComment.coordinate;
      const focusCommentCoordinate = { x: coordinate.x, y: coordinate.y, z: coordinate.z };
      const jsonCoordinate = JSON.stringify(focusCommentCoordinate);
      onOpen();
      setCoordinate(jsonCoordinate);
    }
  }, [currentCommentAction]);

  const resetState = () => {
    setDesc("");
    setTitle("");
    setImages([]);
    onClose();
  };

  const addComment = async (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.preventDefault();
    try {
      const newComment: NewComment = await axios
        .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comment-rooms/${building.id}`, { coordinate })
        .then((res) => {
          return {
            title: title,
            description: desc,
            commentRoomId: res.data.id,
          };
        });
      const postedComment = await axios
        .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${currentUser!.id}`, newComment)
        .then((res) => {
          const { id, title, description, createdAt, updatedAt, commentRoomId, userId } = res.data;
          return {
            id,
            title,
            description,
            createdAt,
            updatedAt,
            commentRoomId,
            userId,
            buildingId: building.id,
            coordinate,
          };
        });

      images.length > 0 && useImageUploader(images, postedComment.id);
      setUpdateComment(postedComment), setCommentAction(commentActions.UPDATE_COMMENT);
      resetState();
      toast({ ...toastText.success, title: "コメントを投稿しました" });
    } catch (error) {
      console.log(error);
      resetState();
      toast({ ...toastText.error, title: "コメント投稿に失敗しました" });
    }
  };

  const cancelComment = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setCommentAction(commentActions.CANCEL_COMMENT);
    resetState();
    toast({ ...toastText.cancel, title: "コメント投稿をキャンセルしました" });
  };

  const props = {
    onClose: onClose,
    isOpen: isOpen,
    cancelFunction: cancelComment,
    excuteFunction: addComment,
    headerText: "コメントを投稿する",
    title: title,
    setTitle: setTitle,
    desc: desc,
    setDesc: setDesc,
    excuteButtonText: "Add",
    images,
    setImages,
  };

  return (
    <>
      <DrawerForm props={props} />
    </>
  );
}
