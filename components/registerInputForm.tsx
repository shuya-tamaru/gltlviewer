import { Input } from '@chakra-ui/react';

type Props = {
  form: string;
};

export default function RegisterInputForm({ form }: Props) {
  return (
    <>
      <Input
        type='text'
        placeholder={form}
        required
        w='90%'
        h='50'
        py='5'
        ml='5'
        mt='5'
        color='#333333'
        borderColor='#999999'
        borderWidth='2px'
      />
    </>
  );
}
