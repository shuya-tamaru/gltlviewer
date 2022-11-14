import { Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, DrawerHeader, Input, Textarea, useToast } from '@chakra-ui/react';
import { BiImageAdd } from 'react-icons/bi';
import { GrDocumentPdf } from 'react-icons/gr';

import { Dispatch, SetStateAction } from 'react';
import CommentImageForm from './commentImageForm';

type Props = {
  props:
  {
    onClose: () => void,
    isOpen: boolean,
    cancelFunction: (e?: React.MouseEvent<HTMLButtonElement>) => void,
    excuteFunction: (e: React.MouseEvent<HTMLButtonElement>) => void,
    headerText: string,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    desc: string,
    setDesc: Dispatch<SetStateAction<string>>,
    excuteButtonText: string,
    images: File[],
    setImages: Dispatch<SetStateAction<File[]>>,
    existingPaths?: string[],
    setExistingPaths?: Dispatch<SetStateAction<string[]>>,
  }
}

export default function ({ props }: Props) {

  const {
    onClose,
    isOpen,
    cancelFunction,
    excuteFunction,
    headerText,
    title,
    setTitle,
    desc,
    setDesc,
    excuteButtonText,
    images,
    setImages,
    existingPaths,
    setExistingPaths
  } = props;

  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size='lg' closeOnOverlayClick={false}>
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton onClick={e => cancelFunction(e)} />
          <DrawerHeader textAlign="center">{headerText}</DrawerHeader>
          <DrawerBody>
            <Box w="100%" h="100%" display="flex" alignItems="center" flexDirection="column" p="2.5">
              <form style={{ width: "100%" }} >
                <Input required value={title} onChange={(e) => setTitle(e.target.value)} id="input" w="100%" h="40px" placeholder='タイトルを入力' borderRadius="2px" borderColor="#999" border="2px" />
                <Textarea required value={desc} onChange={(e) => setDesc(e.target.value)} id="textArea" w="100%" h="300px" mt="5px" placeholder='コメントを入力' borderRadius="2px" borderColor="#999" border="2px" />
                <Box w="100%" mt="2" display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <BiImageAdd style={{ marginLeft: "5px", cursor: "pointer" }} size={30} />
                    <GrDocumentPdf style={{ marginLeft: "5px", cursor: "pointer" }} size={30} />
                  </Box>
                  <Box display="flex" >
                    <Button onClick={e => excuteFunction(e)} colorScheme='red' ml="2">{excuteButtonText}</Button>
                    <Button onClick={e => cancelFunction(e)} colorScheme='red' ml="2">Cancel</Button>
                  </Box>
                </Box>
              </form>
              <CommentImageForm images={images} setImages={setImages} existingPath={existingPaths} setExistingPaths={setExistingPaths} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}