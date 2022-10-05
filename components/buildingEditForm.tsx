import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from 'react-icons/bi';
import axios from 'axios';

import { useCallback, useState } from 'react';

import { Building } from '../types/Buildings';

type inputForms = {
  inputForms: string[];
  data: Building;
};

export default function ({ inputForms, data }: inputForms) {
  const [buildingName, setBuildingName] = useState<string>(data.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateBuilding = {
      ...data,
      name: buildingName,
    };

    try {
      const buildingUpdate = async () => {
        await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings/${data.id}`, updateBuilding);
      };
      buildingUpdate();
      setLoading(true);
      location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        {inputForms &&
          inputForms.map((form: string) => (
            <Input
              key={form}
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
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
          ))}
        <Box
          {...getRootProps()}
          w='200px'
          h='150px'
          border='2px dotted gray'
          display='table'
          alignItems='center'
          textAlign='center'
          margin=' 15px auto'
          color='#666'
          bg='#f5f5f5'
          borderRadius='5px'
        >
          <input {...getInputProps()} type='file' style={{ display: 'none' }} />
          {isDragActive ? (
            <Text display='table-cell' verticalAlign='middle' alignItems='center'>
              Drop the files here ...
            </Text>
          ) : (
            <BiImageAdd
              style={{ cursor: 'pointer', display: 'table-cell', verticalAlign: 'middle', margin: 'auto' }}
              size={150}
            />
          )}
        </Box>
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
