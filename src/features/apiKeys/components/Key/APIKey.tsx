import { bt_Apikey } from '@prisma/client';
import { APIKeyDesc } from './components/APIKeyDesc/APIKeyDesc';
import { APIKeyInfo } from './components/APIKeyInfo/APIKeyInfo';
import s from './APIKey.module.css';

interface APIKeyProps {
  apiKey: bt_Apikey;
}

export const APIKey = ({ apiKey }: APIKeyProps) => {
  return (
    <div className={s.container}>
      <APIKeyDesc label={apiKey.name} botsQuantity={0} />
      <APIKeyInfo apiKey={apiKey.key} secretKey={apiKey.secret} />
    </div>
  );
};
