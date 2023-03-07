import { bt_Bot } from '@prisma/client';
import { TBotPeriodValues } from '../types/types'

export function getTotallyEarnedOverPeriod(bots: bt_Bot[], period: TBotPeriodValues) {
  let totallyEarned = 0
  let path = '' as keyof bt_Bot

  if (period === 'all') {
    path = 'pnl_earnedUsdByCells'
  } else {
    path = `pnl_earnedUsd_last${period}`
  }

  for (let bot of bots) {
    totallyEarned += bot[path] || 0
  }

  return totallyEarned
}
