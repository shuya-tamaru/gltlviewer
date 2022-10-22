import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useCurrentUser } from '../context/CurrentUserContext';
import useImageUploader from '../hools/useImageUploader';
import useImageDelete from '../hools/useImageDelete';
import useTransmission from '../hools/useTransmission';
import { Comments } from '../types/Comments';
import DrawerForm from './drawerForm';

type Props = {
  comment: Comments,
  commentsLength: number,
  guid: string,
  setDisplayComemnt: Dispatch<SetStateAction<Comments | null>>,
  isOpenUpdate: boolean,
  onCloseUpdate: () => void
}

export default function ({ comment, commentsLength, guid, setDisplayComemnt, isOpenUpdate, onCloseUpdate }: Props) {
  const toast = useToast();

  const currentUser = useCurrentUser();

  const [desc, setDesc] = useState<string>(`${comment.title}`);
  const [title, setTitle] = useState<string>(`${comment.description}`);
  const [images, setImages] = useState<File[]>([]);
  const [initialExistingPaths, setInitialExistingPaths] = useState<string[]>([]);
  const [existingPaths, setExistingPaths] = useState<string[]>([]);

  useEffect(() => {
    const getExistingImagePaths = async () => {
      const imagePaths: string[] = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/images/${comment.id}`).then(res => res.data);
      setInitialExistingPaths(imagePaths);
      setExistingPaths(imagePaths);
      setImages([]);
    }
    getExistingImagePaths();
  }, [isOpenUpdate])

  const cancelComment = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    onCloseUpdate()
    setDesc(`${comment.description}`);
    setTitle(`${comment.title}`);
    setExistingPaths(initialExistingPaths);
    setImages([]);
    toast({
      title: `コメント編集をキャンセルしました`,
      status: 'warning',
      isClosable: true,
    })
  };

  const updateComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const upateComment = async () => {
      if (currentUser) {
        try {
          const newComment: Comments = {
            ...comment,
            title: title,
            description: desc
          }

          await axios
            .patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${comment.id}/${currentUser.id}`, newComment);

          const deletePaths
            = existingPaths.length > 0
              ? initialExistingPaths.filter(path => existingPaths.indexOf(path) === -1)
              : initialExistingPaths;
          if (deletePaths.length > 0) {
            useImageDelete(deletePaths);
          }

          images.length > 0 && useImageUploader(images, newComment.id);
          commentsLength === 1 && useTransmission(newComment, "updateComment", guid);

          onCloseUpdate()
          setDesc(`${newComment.description}`);
          setTitle(`${newComment.title}`);
          setDisplayComemnt(newComment);
          toast({
            title: `コメントを編集しました`,
            status: 'success',
            isClosable: true,
          })
        } catch (error) {
          console.log(error)
        }
      };
    }
    upateComment()
  };

  const props = {
    onClose: onCloseUpdate,
    isOpen: isOpenUpdate,
    cancelFunction: cancelComment,
    excuteFunction: updateComment,
    headerText: 'コメント編集',
    title: title,
    setTitle: setTitle,
    desc: desc,
    setDesc: setDesc,
    excuteButtonText: 'Update',
    images,
    setImages,
    existingPaths,
    setExistingPaths
  }


  return (
    <>
      <DrawerForm props={props} />
    </>
  );
}