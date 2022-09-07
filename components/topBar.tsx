import { Box, Image, Input, Text } from '@chakra-ui/react';
import { HamburgerIcon, Search2Icon } from '@chakra-ui/icons';
import Header from './header';

export default function TopBar() {
	return (
		<Header>
			<Box w="70%" bg="#ffffff" display="flex" py="5px" alignItems="center" borderRadius="5px">
				<Search2Icon fontSize="20" color="#696969" ml="5" />
				<Input
					w="90%"
					h="30"
					border="none"
					py="5"
					ml="5"
					color="#333333"
					placeholder="Search Building"
					focusBorderColor="none"
				/>
			</Box>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Image src="/images/pika.jpeg" objectFit="cover" boxSize="60px" borderRadius="50%" />
				<Text ml="10px" fontSize="25px" fontWeight="550">
					Shuya Tamaru
				</Text>
				<HamburgerIcon ml="10px" fontSize="40px" cursor="pointer" />
			</Box>
		</Header>
		// <Box
		// 	bg="#6b48ff"
		// 	w="100%"
		// 	h="80px"
		// 	p={4}
		// 	color="white"
		// 	alignItems="center"
		// 	display="flex"
		// 	justifyContent="space-between"
		// 	position="sticky"
		// 	cursor="pointer"
		// >
		// 	<Text fontWeight="800" fontSize={32}>
		// 		ServiceName
		// 	</Text>

		// </Box>
	);
}
