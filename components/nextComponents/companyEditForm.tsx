import { Button, Input } from '@chakra-ui/react';
import axios from 'axios';

import { useEffect, useState } from 'react';

import { useCurrentUser } from '../../context/CurrentUserContext';
import { Company } from '../../types/Companys';

const style = {
  w: '90%',
  h: '50',
  py: '5',
  ml: '5',
  mt: '5',
  color: '#333333',
  borderColor: '#999999',
  borderWidth: '2px',
};

export default function () {
  const [loading, setLoading] = useState(false);
  const currentUser = useCurrentUser();
  const [company, setCompany] = useState<Company | null>(null);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    const getCurrentCompany = async () => {
      if (!currentUser) return;
      const response: Company = await axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/companys/${currentUser.companyId}`)
        .then((res) => res.data);
      setName(response.name);
      setAddress(response.address);
      setPhoneNumber(response.phoneNumber);
      setCompany(response);
    };
    getCurrentCompany();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateCompany = {
      ...company,
      name,
      address,
      phoneNumber,
    };

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/companys/${updateCompany.id}`, updateCompany);
      setLoading(true);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='会社名' required sx={style} />
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type='text'
          placeholder='会社住所'
          required
          sx={style}
        />
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type='text'
          placeholder='電話番号'
          required
          sx={style}
        />

        <Button
          isLoading={loading}
          type='submit'
          w='90%'
          h='50'
          py='5'
          ml='5'
          mt='5'
          color='#ffffff'
          colorScheme='red'
          fontWeight='800'
        >
          更新
        </Button>
      </form>
    </>
  );
}
