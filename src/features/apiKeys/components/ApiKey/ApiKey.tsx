import { bt_Apikey } from '@prisma/client';

interface ApiKeyProps {
  apiKey: bt_Apikey;
}

export const ApiKey = ({ apiKey }: ApiKeyProps) => {
  return <div>key</div>;
};
