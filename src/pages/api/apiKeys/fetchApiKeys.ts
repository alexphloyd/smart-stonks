import prisma from 'db';
import createHttpError from 'http-errors';
import { NextApiHandler } from 'next';
import { apiHandler } from '@/utils/api/apiHandler';
import { TFetchApiKeyPayload, TFetchApiKeysResponse } from '@/features/apiKeys/types/types';
import { FetchApiKeys } from '@/features/apiKeys/types/validation';

const fetchApiKeys: NextApiHandler<TFetchApiKeysResponse> = async (req, res) => {
  try {
    if (!FetchApiKeys.safeParse(req.body).success) {
      throw new createHttpError.BadRequest('Bad payload.');
    }

    const { userId } = req.body as TFetchApiKeyPayload;
    const apiKeys = await prisma.bt_Apikey.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({ apiKeys });
  } catch (error) {
    throw new createHttpError.InternalServerError('Sorry, we had unexpected error.');
  }
};

export default apiHandler({ GET: fetchApiKeys });
