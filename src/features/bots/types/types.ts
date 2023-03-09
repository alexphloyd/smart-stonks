export interface TBotFilters {
  period: TBotPeriodValues
  progressSymbol: TBotProgressSymbol
  tradingType: TBotTradingType
  status: TBotStatus
}

export type TBotPeriodValues = '1h' | '3h' | '24h' | '7d' | '31d' | 'all'

export type TBotProgressSymbol = '$' | '%'

export type TBotTradingType = 'futures' | 'spot'

export type TBotStatus = 'active' | 'all'

export type TView = 'light' | 'pro'
