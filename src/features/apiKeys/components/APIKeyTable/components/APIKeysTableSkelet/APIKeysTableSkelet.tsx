import { APIKeySkelet } from '../../../Key/components/APIKeySkelet/APIKeySkelet';
import s from '../../APIKeysTable.module.css';

export const APIKeysTableSkelet = () => {
  return (
    <ul className={s.table}>
      <APIKeySkelet />
      <APIKeySkelet />
      <APIKeySkelet />
      <APIKeySkelet />
      <APIKeySkelet />
      <APIKeySkelet />
    </ul>
  );
};
