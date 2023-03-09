import clsx from 'clsx';
import { DepositProgressVeritcal } from './components/DepositProgressVertical';
import { BotDesc } from './components/BotDesc';
import { TimeElapsed } from './components/TimeElapsed';
import { getUsdByPeriod } from '../../utils/getUsdByPeriod';
import { TBotFilters } from '../../types/types';
import s from './Bot.module.css';
import { bt_Bot } from '@prisma/client';

export interface BotProps {
  bot: bt_Bot;
  options: TBotFilters;
}

export const Bot = ({ bot, options }: BotProps) => {
  const progressSymbol = options.progressSymbol;

  let earnedOverPeriod = getUsdByPeriod(bot, options.period);
  if (progressSymbol == '%') {
    earnedOverPeriod /= bot.pnl_deposit_actual! / 100;
  }

  const botProgress = progressSymbol + earnedOverPeriod?.toFixed(2);

  return (
    <div className={s.container}>
      <DepositProgressVeritcal
        botType={bot.type}
        depositActual={bot.pnl_deposit_actual!}
        earnedUsdByCells={bot.pnl_earnedUsdByCells!}
      />
      <BotDesc
        depositActual={bot.pnl_deposit_actual}
        id={bot.id}
        leverage={bot.leverage}
        symbol={bot.symbol}
        isArchived={bot.state_isArchived!}
        isPaused={bot.state_isPaused!}
      />

      <section className={s.progress}>
        <div className={clsx(s.botProgress, earnedOverPeriod == 0 && 'text-gray-400')}>
          {botProgress}
        </div>

        <div className={s.timeElapsed}>
          <TimeElapsed date={bot.stats_lastFinishedCyclaDate!} />
        </div>
      </section>
    </div>
  );
};
