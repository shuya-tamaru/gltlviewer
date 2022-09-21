import { Box, Image, Text, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function UserName() {
  type userMenu = {
    menu: string;
    path: string;
  };

  const userMenu: userMenu[] = [
    {
      menu: 'ユーザー情報編集',
      path: '/users/userEditForm',
    },
    {
      menu: '会社情報編集',
      path: '/company/companyEditForm',
    },
    {
      menu: '新規ユーザーの招待',
      path: '/users/inviteUser',
    },
    {
      menu: 'ユーザーリスト',
      path: '/',
    },
    {
      menu: 'ログアウト',
      path: '/login',
    },
  ];

  const [menuState, setMenuState] = useState<string>('none');
  const clickedElement = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = clickedElement.current;
    if (!el) return;

    const hundleClickOutside = (e: MouseEvent) => {
      !el?.contains(e.target as Node) ? setMenuState('none') : setMenuState('flex');
    };
    document.addEventListener('click', hundleClickOutside);
  }, [clickedElement]);

  return (
    <>
      <Box display='flex' justifyContent='center' alignItems='center' position='relative'>
        <Image src='/images/pika.jpeg' objectFit='cover' boxSize='60px' borderRadius='50%' />
        <Text ml='10px' fontSize='25px' fontWeight='550'>
          Shuya Tamaru
        </Text>
        <HamburgerIcon ml='10px' fontSize='40px' cursor='pointer' ref={clickedElement} />
        <Box display={menuState} flexDirection='column' bg='#fff' position='absolute' right='-10px' top='70px' zIndex='100000000'>
          {userMenu.map((userMenu) => {
            return (
              <Link href={userMenu.path} key={userMenu.menu}>
                <Button w='200px' colorScheme='#fff' borderRadius='0' color='#666' _hover={{ background: 'red', color: '#fff' }}>
                  {userMenu.menu}
                </Button>
              </Link>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
