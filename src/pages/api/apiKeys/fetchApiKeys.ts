import prisma from 'db';
import createHttpError from 'http-errors';
import { NextApiHandler } from 'next';
import { apiHandler } from '@/utils/api/apiHandler';
import { TFetchAPIKeyPayload, TFetchAPIKeysResponse } from '@/features/apiKeys/types/types';
import { FetchAPIKeys } from '@/features/apiKeys/types/validation';

const fetchAPIKeys: NextApiHandler<TFetchAPIKeysResponse> = async (req, res) => {
  try {
    if (!FetchAPIKeys.safeParse(req.body).success) {
      throw new createHttpError.BadRequest('Bad payload.');
    }

    const { userId } = req.body as TFetchAPIKeyPayload;
    const apiKeys = await prisma.bt_Apikey.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return res.status(200).json({ apiKeys });
  } catch (error) {
    throw new createHttpError.InternalServerError('Sorry, we had unexpected error.');
  }
};

export default apiHandler({ POST: fetchAPIKeys });
