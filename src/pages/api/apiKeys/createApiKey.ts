import prisma from 'db';
import createHttpError from 'http-errors';
import { TCreateApiKeyPayload } from './../../../features/apiKeys/types/types';
import { TCreateApiKeyResponse } from '@/features/apiKeys/types/types';
import { ApiKey } from '@/features/apiKeys/types/validation';
import { apiHandler } from '@/utils/api/apiHandler';
import { NextApiHandler } from 'next';

const createApiKey: NextApiHandler<TCreateApiKeyResponse> = async (req, res) => {
  try {
    if (!ApiKey.safeParse(req.body).success) {
      throw new createHttpError.BadRequest('Bad payload.');
    }

    const { userId, name, key, secret } = req.body as TCreateApiKeyPayload;
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
  POST: createApiKey,
});
