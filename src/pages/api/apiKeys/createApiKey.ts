import prisma from 'db';
import createHttpError from 'http-errors';
import { TCreateAPIKeyPayload } from '../../../features/apiKeys/types/types';
import { TCreateAPIKeyResponse } from '@/features/apiKeys/types/types';
import { APIKey } from '@/features/apiKeys/types/validation';
import { apiHandler } from '@/utils/api/apiHandler';
import { NextApiHandler } from 'next';

const createAPIKey: NextApiHandler<TCreateAPIKeyResponse> = async (req, res) => {
  try {
    if (!APIKey.safeParse(req.body).success) {
      throw new createHttpError.BadRequest('Bad payload.');
    }

    const { userId, name, key, secret } = req.body as TCreateAPIKeyPayload;
    const newApiKey = await prisma.bt_Apikey.create({
      data: {
        userId: Number(userId),
        name,
        key,
        secret,
        exchange: 'BINANCE',
      },
    });

    return res.status(200).json({ newApiKey });
  } catch (error) {
    throw new createHttpError.InternalServerError('Sorry, we had unexpected error.');
  }
};

export default apiHandler({
  POST: createAPIKey,
});
