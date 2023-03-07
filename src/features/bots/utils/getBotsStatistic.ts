import { SS } from '@/shared/ss-sdk';

export default async function getBotsStatistic() {
  // const bots = await db.bt_Bot.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     type: true,
  //     stats_lastTradeDate: true,
  //     userId: true,
  //     symbol: true,
  //     leverage: true,
  //     pnl_firstTrade: true,
  //     pnl_earnedUsdByCells: true,
  //     pnl_earnedUsdByTrades: true,
  //     pnl_earnedUsd_last1h: true,
  //     pnl_earnedUsd_last3h: true,
  //     pnl_earnedUsd_last8h: true,
  //     pnl_earnedUsd_last24h: true,
  //     pnl_earnedUsd_last7d: true,
  //     pnl_earnedUsd_last31d: true,

  //     pnl_finished_total: true,
  //     pnl_finished_24h: true,
  //     pnl_finished_31d: true,
  //     pnl_deposit_actual: true,

  //     stats_filledOrders: true,
  //     stats_lastFinishedCyclaDate: true,
  //     stats_currentlyPlaced: true,
  //     ordersCount: true,

  //     prog_liqPrice: true,
  //     prog_currentPrice: true,
  //     prog_takeProfitPrice: true,
  //     prog_lastOrderPrice: true,

  //     state_isPaused: true,
  //     state_isArchived: true,
  //   },
  // });

  // code for DEV
  const sdk = new SS('');
  const bots = sdk.getPublicStats();
  // code for DEV

  return bots;
}
