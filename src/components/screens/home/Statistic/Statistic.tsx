import { bt_Bot } from '@prisma/client';
import { BotsStatistic } from 'src/features/bots/components/BotsStatistic/BotsStatistic';
import s from './Statistic.module.css';

interface StatisticProps {
  bots: bt_Bot[];
}

export const Statistic = ({ bots }: StatisticProps) => {
  return (
    <div className={s.container}>
      <h5 className={s.bigLabel}>Global Stats</h5>
      <p className={s.additionalText}>
        We have an open statistic, and you are able to see the behavior of each bot.
      </p>

      <BotsStatistic bots={bots} />
    </div>
  );
};
