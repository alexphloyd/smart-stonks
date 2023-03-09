import {
  Role,
  TCreateNewUserResponse,
  TUserAuthenticatePayload,
} from '@/features/auth/types/types';
import getUserByEmail from '@/features/auth/utlis/getUserByEmail';
import { NextApiHandler } from 'next';
import { hashPassword } from '@/features/auth/utlis/hashPassword';
import createHttpError from 'http-errors';
import prisma from 'db';
import { apiHandler } from '@/utils/api/apiHandler';
import { UserAuthenticate } from '@/features/auth/types/validations';

const createNewUser: NextApiHandler<TCreateNewUserResponse> = async (req, res) => {
  try {
    if (!UserAuthenticate.safeParse(req.body).success) {
      throw new createHttpError.BadRequest('Invalid credentials.');
    }

    const userCredentials = req.body as TUserAuthenticatePayload;

    const userInDB = await getUserByEmail(userCredentials.email);
    if (userInDB) {
      throw new createHttpError.Conflict('This email is already being used.');
    }

    const hashedPassword = await hashPassword(userCredentials.password);
    const newUser = await prisma.user.create({
      data: {
        email: userCredentials.email,
        hashedPassword,
      },
    });

    return res.status(200).json({
      newUser: { email: newUser.email, id: newUser.id, role: newUser.role as Role },
    });
  } catch (error) {
    throw new createHttpError.InternalServerError('Sorry, we had unexpected error.');
  }
};

export default apiHandler({ POST: createNewUser });
