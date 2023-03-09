import { bt_Bot } from '@prisma/client';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { TBotFilters, TView } from '../../types/types';
import { getUsdByPeriod } from '../../utils/getUsdByPeriod';
import { Bot } from '../Bot/Bot';
import { getTotallyEarnedOverPeriod } from '../../utils/getTotallyEarnedOverPeriod';
import { BOTS_PER_PAGE } from '../../utils/constants';
import s from './BotsStatistic.module.css';
import { BotFilterBar } from '../BotFilterBar/BotFilterBar';

interface BotsStatisticProps {
  bots: bt_Bot[];
}

export const BotsStatistic = ({ bots }: BotsStatisticProps) => {
  const [filters, setFilters] = useState<TBotFilters>({
    period: 'all',
    progressSymbol: '$',
    tradingType: 'spot',
    status: 'active',
  });

  const [view, setView] = useState<TView>('light');
  const [statsPage, setStatsPage] = useState(0);

  const earnedOverPeriod = getTotallyEarnedOverPeriod(bots, filters.period);

  const sortedBots = bots
    .filter((bot) =>
      filters.status === 'active' ? !bot.state_isArchived && !bot.state_isPaused : true
    )
    .sort(
      (bot: bt_Bot, nextBot: bt_Bot) =>
        getUsdByPeriod(nextBot, filters.period) - getUsdByPeriod(bot, filters.period)
    );
  // refactor - array prototype func
  const botsToDisplay = sortedBots.slice(
    statsPage * BOTS_PER_PAGE,
    (statsPage + 1) * BOTS_PER_PAGE
  );

  const handleChangeFilters = (newFilters: TBotFilters) => {
    setFilters(newFilters);
    setStatsPage(0);
  };

  const handleChangeView = (newView: TView) => {
    setView(newView);
  };

  const maxPageNumber = Math.round(sortedBots.length / BOTS_PER_PAGE) - 1;

  const handleChangeStatsPage = (direction: 'increase' | 'decrease') => {
    if (direction === 'decrease' && statsPage === 0) return;
    if (direction === 'increase' && statsPage === maxPageNumber) return;

    const newPageNumber = direction === 'increase' ? statsPage + 1 : statsPage - 1;
    setStatsPage(newPageNumber);
  };

  return (
    <>
      <BotFilterBar
        view={view}
        filters={filters}
        earnedOverPeriod={earnedOverPeriod}
        onFiltersChange={handleChangeFilters}
        onViewChange={handleChangeView}
        onStatsPageChange={handleChangeStatsPage}
      />

      <ul className={s.table}>
        {botsToDisplay.map((bot) => (
          <Bot key={nanoid()} bot={bot} options={filters} />
        ))}
      </ul>
    </>
  );
};
