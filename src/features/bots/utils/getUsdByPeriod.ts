import { bt_Bot } from '@prisma/client';
import { TBotPeriodValues } from '../types/types';

export function getUsdByPeriod(bot: bt_Bot, period: TBotPeriodValues) {
  if (period === 'all') {
    return bot.pnl_earnedUsdByCells || 0;
  }
  const path = `pnl_earnedUsd_last${period}` as keyof bt_Bot;

  return (bot[path] as number) || (0 as number);
}
