import { AdapterUser } from 'next-auth/adapters';
import { Session, User } from 'next-auth/core/types';
import { JWT } from 'next-auth/jwt';
import { z } from 'zod';
import { TAuthError } from './errors';
import { UserAuthenticate } from './validations';

export type Role = 'ADMIN' | 'USER';

export interface TUser {
  id: number;
  email: string;
  role: Role;
}

export type TUserAuthenticatePayload = z.infer<typeof UserAuthenticate>;

export type TCreateNewUserResponse = {
  newUser?: TUser;
  error?: TAuthError;
};

export type TSessionCallbackParams = {
  session: Session;
  token: JWT;
  user: User | AdapterUser;
};
