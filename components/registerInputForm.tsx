import { Input } from '@chakra-ui/react';

type Form = {
	form: string;
};

export default function RegisterInputForm({ form }: Form) {
	return (
		<Input
			w="90%"
			h="50"
			py="5"
			ml="5"
			mt="5"
			color="#333333"
			borderColor="#999999"
			borderWidth="2px"
			placeholder={form}
		/>
	);
}
