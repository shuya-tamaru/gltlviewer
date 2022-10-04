import { Box } from '@chakra-ui/react';
import { Dna } from 'react-loader-spinner';

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
      <Dna
        width={iconWidth ? iconWidth : '200'}
        height={iconHeight ? iconHeight : '200'}
        ariaLabel='dna-loading'
        wrapperStyle={{}}
        wrapperClass='dna-wrapper'
        visible={true}
      />
    </Box>
  );
}
