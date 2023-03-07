import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { fetchApiKeys } from '../../slice/thunks/fetchApiKeys';
import { ApiKey } from '../ApiKey/ApiKey';
import s from './ApiKeyList.module.css';

export const ApiKeysList = () => {
  const dispatch = useAppDispatch();
  const { apiKeys, status } = useAppSelector((store) => store.apiKeys);
  const userId = useAppSelector((store) => store.auth.user!.id);

  useEffect(() => {
    dispatch(fetchApiKeys(userId));
  }, []);

  if (!apiKeys.length) {
    return <div className={s.noKeys}>{`You don't have any API Keys..`}</div>;
  }

  return (
    <ul className={s.table}>
      {apiKeys.map((key) => (
        <ApiKey key={nanoid()} apiKey={key} />
      ))}
    </ul>
  );
};
