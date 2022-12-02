import { Box, Image } from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";

type ImagePreviewProps = {
  index: number;
  path: string;
  action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const ImagePreview = ({ index, path, action }: ImagePreviewProps) => {
  return (
    <Box display="table-cell" verticalAlign="middle" margin="auto" position="relative" ml="5">
      <Image src={`${path}`} objectFit="cover" boxSize="100px" />
      <Box
        position="absolute"
        width="30px"
        height="30px"
        right="-15px"
        top="-15px"
        cursor="pointer"
        onClick={(e) => action(e)}
        id={index.toString()}
      >
        <MdCancel size={30} color={"#111"} />
      </Box>
    </Box>
  );
};
