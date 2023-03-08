import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useTransition } from 'react';
import { fetchAPIKeys } from '../../slice/thunks/fetchAPIKeys';
import { APIKey } from '../Key/APIKey';
import { APIKeysTableSkelet } from './components/APIKeysTableSkelet/APIKeysTableSkelet';
import s from './APIKeysTable.module.css';

export const APIKeysTable = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);
  const { apiKeys, apiKeysStatus, isFirstLoading } = useAppSelector((store) => store.apiKeys);

  useEffect(() => {
    if (user && apiKeysStatus === 'idle') {
      dispatch(fetchAPIKeys(user.id));
    }
  }, [user]);

  if (apiKeysStatus === 'pending' && isFirstLoading) {
    return <APIKeysTableSkelet />;
  }

  if (!apiKeys || !apiKeys.length) {
    return <div className={s.noKeys}>{`You don't have any API Keys..`}</div>;
  }

  return (
    <ul className={s.table}>
      {apiKeys.map((userAPIKey) => (
        <APIKey key={nanoid()} apiKey={userAPIKey} />
      ))}
    </ul>
  );
};
