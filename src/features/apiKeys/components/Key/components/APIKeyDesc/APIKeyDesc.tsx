import { Icon } from '@/components/Icon/Icon';
import s from './APIKeyDesc.module.css';

interface APIKeyDescProps {
  label: string;
  botsQuantity: number;
}

export const APIKeyDesc = ({ label, botsQuantity }: APIKeyDescProps) => {
  return (
    <div className={s.container}>
      <div>
        <Icon name='key' className={s.keyIcon} />
        {label}
      </div>
      <div className={s.botsQuantity}>
        <Icon name='robot' className={s.robotIcon} />
        {botsQuantity}
      </div>
    </div>
  );
};
