import { Box, Image, Text, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import axios from 'axios';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCurrentUser, useCurrentUserUpdate } from '../context/CurrentUserContext';

export default function UserName() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserUpdate();

  const userMenu = [
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

  const signout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/auth/signout`);
    setCurrentUser(null);
    router.push('/login');
  };

  return (
    <>
      <Box display='flex' justifyContent='center' alignItems='center' position='relative'>
        <Image src='/images/pika.jpeg' objectFit='cover' boxSize='60px' borderRadius='50%' mx='2' />
        <Text fontSize='xl' fontWeight='550' textAlign='center'>
          {!currentUser ? 'unknownUser' : currentUser.lastName + currentUser.firstName}
        </Text>
        <HamburgerIcon ml='10px' fontSize='40px' cursor='pointer' ref={clickedElement} />
        <Box
          display={menuState}
          flexDirection='column'
          bg='#fff'
          position='absolute'
          right='-10px'
          top='70px'
          zIndex='100000000'
        >
          {userMenu.map((userMenu) => {
            return (
              <Link href={userMenu.path} key={userMenu.menu}>
                <Button
                  w='200px'
                  colorScheme='#fff'
                  borderRadius='0'
                  color='#666'
                  _hover={{ background: 'red', color: '#fff' }}
                >
                  {userMenu.menu}
                </Button>
              </Link>
            );
          })}
          <Button
            onClick={signout}
            w='200px'
            colorScheme='#fff'
            borderRadius='0'
            color='#666'
            _hover={{ background: 'red', color: '#fff' }}
          >
            ログアウト
          </Button>
        </Box>
      </Box>
    </>
  );
}
