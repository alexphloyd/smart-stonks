import {
  TBotPeriodValues,
  TBotProgressSymbol,
  TBotTradingType,
  TBotStatus,
  TView,
} from '../types/types'

export const ALL_FILTERS = {
  periods: ['1h', '3h', '24h', '7d', '31d', 'all'] as TBotPeriodValues[],
  progressSymbols: ['%', '$'] as TBotProgressSymbol[],
  tradingType: ['futures', 'spot'] as TBotTradingType[],
  statuses: ['all', 'active'] as TBotStatus[],
}

export const EARN_PERIODS = {
  '1h': 'in the last hour',
  '3h': 'in the last 3 hours',
  '24h': 'in the last 24 hours',
  '7d': 'in the last 7 days',
  '31d': 'in the last month',
  all: 'totally earned',
}

export const STATISTIC_VIEWS: TView[] = ['light', 'pro']

export const BOTS_PER_PAGE = 18
