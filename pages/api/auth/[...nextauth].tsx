import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { User } from '../../../types/Users';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/users/auth/signin`, credentials);
        const user: User = res.data;
        if (!user) throw new Error('invalid credentials');
        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.userData = token.user;
      }
      return session;
    },
  },
  secret: 'test',
  pages: {
    signIn: '/login/index',
    // error: '/registration/index',
    signOut: '',
  },
};

export default NextAuth(authOptions);
