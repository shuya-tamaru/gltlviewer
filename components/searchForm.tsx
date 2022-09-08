import { Box, Input } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';


export default function SearchForm() {
	return (
    <>
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
    </>
  );
}
