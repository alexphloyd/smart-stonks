import { ApiKeysList } from 'src/features/apiKeys/components/ApiKeyList/ApiKeyList';
import { ApiKeysControlBar } from 'src/features/apiKeys/components/ControlBar/ApiKeysControlBar';
import s from './UserApiKeys.module.css';

export const UserApiKeys = () => {
  return (
    <main className={s.container}>
      <ApiKeysControlBar />
      <ApiKeysList />
    </main>
  );
};
