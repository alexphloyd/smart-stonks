import { APIKeysTable } from '@/features/apiKeys/components/APIKeyTable/APIKeysTable';
import { APIKeysControlBar } from '@/features/apiKeys/components/ControlBar/APIKeysControlBar';
import s from './UserAPIKeys.module.css';

export const UserAPIKeys = () => {
  return (
    <main className={s.container}>
      <APIKeysControlBar />
      <APIKeysTable />
    </main>
  );
};
