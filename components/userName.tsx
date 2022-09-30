import { Box, Image, Text, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { MdLogout } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { HiOfficeBuilding } from 'react-icons/hi';
import { BiUserPlus } from 'react-icons/bi';
import { CgUserList } from 'react-icons/cg';
import axios from 'axios';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { useCurrentUser, useCurrentUserUpdate } from '../context/CurrentUserContext';

export default function UserName() {
  const router = useRouter();

  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserUpdate();

  const fontSize = '20px';
  const userMenu = [
    {
      icon: <FaUserEdit style={{ fontSize }} />,
      menu: 'ユーザー情報編集',
      path: '/users/userEditForm',
    },
    {
      icon: <HiOfficeBuilding style={{ fontSize }} />,
      menu: '会社情報編集',
      path: '/company/companyEditForm',
    },
    {
      icon: <BiUserPlus style={{ fontSize }} />,
      menu: '新規ユーザーの招待',
      path: '/users/inviteUser',
    },
    {
      icon: <CgUserList style={{ fontSize }} />,
      menu: 'ユーザーリスト',
      path: '/users/usersList',
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
    signOut({ redirect: false });
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
          shadow='xl'
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
                  leftIcon={userMenu.icon}
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
            leftIcon={<MdLogout style={{ fontSize: '20px' }} />}
          >
            ログアウト
          </Button>
        </Box>
      </Box>
    </>
  );
}
