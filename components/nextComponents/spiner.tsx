import { Box } from '@chakra-ui/react';
import { Circles } from 'react-loader-spinner';

type Props = {
  containerWidth?: string;
  containerHeight?: string;
  iconWidth?: string;
  iconHeight?: string;
};

export default function ({ containerWidth, containerHeight, iconWidth, iconHeight }: Props) {
  return (
    <Box
      width={containerWidth ? containerWidth : '100vw'}
      height={containerHeight ? containerHeight : '100vh'}
      display='flex'
      alignItems='center'
      justifyContent='center'
      bg='#f5f5f5'
    >
      <Circles
        width={iconWidth ? iconWidth : '70'}
        height={iconHeight ? iconHeight : '70'}
        color="#6b48ff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
}
