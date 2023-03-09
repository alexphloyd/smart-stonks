import getUserByEmail from '@/features/auth/utlis/getUserByEmail';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePasswordWithHash } from '@/features/auth/utlis/comparePasswordWithHash';
import { TSessionCallbackParams } from '@/features/auth/types/types';
import { User } from '@prisma/client';

export const authOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials) return null;

        const user: User | null = await getUserByEmail(credentials!.email);
        if (!user) {
          return null;
        }

        const isPasswordsMatch = await comparePasswordWithHash(
          credentials.password,
          user.hashedPassword!
        );
        if (isPasswordsMatch && user) {
          return {
            id: user.id.toString(),
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 60 * 60, // 1 hours
  },
  callbacks: {
    session: async ({ session, user, token }: TSessionCallbackParams) => {
      //@ts-ignore
      session.user.id = token.sub;
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
