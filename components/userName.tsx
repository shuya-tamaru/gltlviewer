import { Box, Image, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function UserName() {
	return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image src="/images/pika.jpeg" objectFit="cover" boxSize="60px" borderRadius="50%" />
        <Text ml="10px" fontSize="25px" fontWeight="550">
          Shuya Tamaru
        </Text>
        <HamburgerIcon ml="10px" fontSize="40px" cursor="pointer" />
      </Box>
    </>
	);
}