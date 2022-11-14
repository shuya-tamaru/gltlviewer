import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import React, { Dispatch, SetStateAction, useState } from 'react';

import { useCurrentUser } from '../context/CurrentUserContext';
import { Comments } from '../types/Comments';
import DrawerForm from './drawerForm';
import useImageUploader from '../hooks/useImageUploader';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  comments: Comments[];
  roomId: string;
  setComments: Dispatch<SetStateAction<Comments[]>>;
};

export default function ({ isOpen, onClose, roomId, comments, setComments }: Props) {
  const toast = useToast();
  const currentUser = useCurrentUser();

  const [desc, setDesc] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);

  const addReply = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    try {
      const newComment = {
        title,
        description: desc,
        commentRoomId: roomId,
      };
      const postedComment: Comments = await axios
        .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/comments/${currentUser!.id}`, newComment)
        .then((res) => res.data);
      setComments([...comments, postedComment]);

      images.length > 0 && useImageUploader(images, postedComment.id);
      setDesc('');
      setTitle('');
      setImages([]);
      onClose();
      toast({
        title: `返信しました`,
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setDesc('');
      setTitle('');
      setImages([]);
      onClose();
      toast({
        title: '投稿に失敗しました',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const cancelReply = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setDesc('');
    setTitle('');
    onClose();
    toast({
      title: `返信をキャンセルしました`,
      status: 'warning',
      isClosable: true,
    });
  };
  const props = {
    onClose: onClose,
    isOpen: isOpen,
    cancelFunction: cancelReply,
    excuteFunction: addReply,
    headerText: '返信を投稿する',
    title: title,
    setTitle: setTitle,
    desc: desc,
    setDesc: setDesc,
    excuteButtonText: 'Add',
    images,
    setImages,
  };

  return (
    <>
      <DrawerForm props={props} />
    </>
  );
}
