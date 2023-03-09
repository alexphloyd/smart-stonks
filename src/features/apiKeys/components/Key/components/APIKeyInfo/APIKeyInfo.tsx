import { useState } from 'react';
import s from './APIKeyInfo.module.css';

interface APIKeyInfoProps {
  apiKey: string;
  secretKey: string;
}

export const APIKeyInfo = ({ apiKey, secretKey }: APIKeyInfoProps) => {
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [isSecretSaved, setIsSecretSaved] = useState(false);

  const handleSaveKey = () => {
    setIsKeySaved(true);
    navigator.clipboard.writeText(apiKey);
    setTimeout(() => setIsKeySaved(false), 1500);
  };

  const handleSaveSecret = () => {
    setIsSecretSaved(true);
    navigator.clipboard.writeText(secretKey);
    setTimeout(() => setIsSecretSaved(false), 1500);
  };

  return (
    <div className={s.container}>
      <div onClick={handleSaveKey}>
        <span>API Key: </span>
        <p>{isKeySaved ? 'Saved to Clipboard..' : apiKey}</p>
      </div>

      <div onClick={handleSaveSecret}>
        <span>Secret Key: </span>
        <p>{isSecretSaved ? 'Saved to Clipboard..' : secretKey}</p>
      </div>
    </div>
  );
};
