import { Box, Button, Text } from '@chakra-ui/react';

import Link from 'next/link';

import { AiOutlineComment } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { BsGraphUp } from 'react-icons/bs';
import { HiInformationCircle } from 'react-icons/hi';

type Props = {
  buildingName: string | undefined;
};

export default function BuildingTopBar({ buildingName }: Props) {
  type buildingMenu = {
    menu: string;
    path: string;
    icon: JSX.Element;
  };

  const buildingMenu: buildingMenu[] = [
    {
      menu: '建物情報',
      path: '/buildings/buildingInformation',
      icon: <HiInformationCircle size={25} />,
    },
    {
      menu: 'グラフ',
      path: '/buildings/buildingGraph',
      icon: <BsGraphUp size={25} />,
    },
    {
      menu: 'ゲストを招待',
      path: '/users/inviteGuest',
      icon: <BiUserPlus size={25} />,
    },
    {
      menu: 'コメント検索',
      path: '/comments/commentList',
      icon: <AiOutlineComment size={25} />,
    },
  ];

  return (
    <>
      <Box w='100%' h='8%' px='20px' position='relative' borderBottom='2px' borderColor='#999'>
        <Link href='/buildings/building'>
          <Text fontSize='30px' fontWeight='750' color='#666666' position='absolute' bottom='0' left='20px' cursor='pointer'>
            {buildingName}
          </Text>
        </Link>
        <Box position='absolute' bottom='0' right='20px'>
          {buildingMenu.map((menuObj) => {
            return (
              <Link href={menuObj.path} key={menuObj.menu}>
                <Button w='160px' colorScheme='red' ml='5px' borderRadius='4px' leftIcon={menuObj.icon}>
                  {menuObj.menu}
                </Button>
              </Link>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
