-- CreateEnum
CREATE TYPE "BalanceMovementType" AS ENUM ('Currency', 'Stock');

-- CreateEnum
CREATE TYPE "bt_db_TxType" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "bt_DepsStatus" AS ENUM ('ACTIVE', 'WAITING');

-- CreateEnum
CREATE TYPE "bt_LogLevel" AS ENUM ('ERROR', 'LOG');

-- CreateEnum
CREATE TYPE "bt_BotOrderType" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "bt_Exchange" AS ENUM ('BINANCE');

-- CreateEnum
CREATE TYPE "bt_ExchangeMarket" AS ENUM ('SPOT', 'FUTURES');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "pg_Token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "sentTo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "isCrypto" BOOLEAN,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "loadedAt" TIMESTAMP(3),
    "lastFrameDate" TIMESTAMP(3),

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Frame" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "stockId" INTEGER NOT NULL,
    "open" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "close" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "low" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "high" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "volume" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Frame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletMovement" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "walletId" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WalletMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletId" INTEGER,
    "movementType" "BalanceMovementType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "stockId" INTEGER,
    "currencyId" INTEGER,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addFundsOpId" INTEGER,
    "buySellOpId" INTEGER,
    "userId" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddFundsOp" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AddFundsOp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuySellOp" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rubPrice" DOUBLE PRECISION DEFAULT 0,
    "isProcessed" BOOLEAN DEFAULT false,

    CONSTRAINT "BuySellOp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "stockId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("stockId")
);

-- CreateTable
CREATE TABLE "bt_Pair" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "bt_Pair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_LoadedDay" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "pairId" INTEGER NOT NULL,

    CONSTRAINT "bt_LoadedDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_Frame2" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "pairId" INTEGER NOT NULL,
    "open" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "close" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "low" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "high" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "volume" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "bt_Frame2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BotTestResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pairname" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" JSONB NOT NULL,
    "r_isProcessed" BOOLEAN DEFAULT false,
    "r_profitYearly" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "r_maxDrawdown" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "r_activeTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "r_ordersCounts" INTEGER NOT NULL DEFAULT 0,
    "r_priceOverlap" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "botId" INTEGER,
    "gridType" TEXT,
    "log_pricesK" DOUBLE PRECISION,
    "log_ordersK" DOUBLE PRECISION,
    "simulationName" TEXT NOT NULL DEFAULT '',
    "simulationNameAuto" TEXT NOT NULL DEFAULT '',
    "ordersWeights2" TEXT,
    "priceDistances2" TEXT,

    CONSTRAINT "bt_BotTestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_ApiKey" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "exchange" "bt_Exchange" NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "bt_ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_Bot" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "apiKeyId" INTEGER NOT NULL,
    "market" "bt_ExchangeMarket" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "symbol" TEXT NOT NULL,
    "simulationId" INTEGER,
    "comment" TEXT,
    "settings" JSONB,
    "isFinishedLastCycle" BOOLEAN DEFAULT false,
    "initialDeposit" DOUBLE PRECISION NOT NULL,
    "priceOverlap" DOUBLE PRECISION NOT NULL,
    "ordersCount" INTEGER NOT NULL,
    "firstOrderShift" DOUBLE PRECISION NOT NULL,
    "regridIfShift" DOUBLE PRECISION NOT NULL,
    "martin" DOUBLE PRECISION NOT NULL,
    "targetProfit" DOUBLE PRECISION NOT NULL,
    "leverage" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "ordersWeights" TEXT NOT NULL,
    "priceDistances" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "stats_filledOrders" INTEGER,
    "stats_lastFinishedCyclaDate" TIMESTAMP(3),
    "stats_lastTradeDate" TIMESTAMP(3),
    "stats_currentlyPlaced" INTEGER,
    "prog_takeProfitPrice" DOUBLE PRECISION,
    "prog_currentPrice" DOUBLE PRECISION,
    "prog_firstOrderPrice" DOUBLE PRECISION,
    "prog_nextOrderPrice" DOUBLE PRECISION,
    "prog_lastOrderPrice" DOUBLE PRECISION,
    "prog_liqPrice" DOUBLE PRECISION,
    "prog_orderPrices" TEXT,
    "prog_prog" DOUBLE PRECISION,
    "pnl_firstTrade" TIMESTAMP(3),
    "pnl_earnedUsdByCells" DOUBLE PRECISION,
    "pnl_earnedUsdByTrades" DOUBLE PRECISION,
    "pnl_earnedUsd_last1h" DOUBLE PRECISION,
    "pnl_earnedUsd_last3h" DOUBLE PRECISION,
    "pnl_earnedUsd_last8h" DOUBLE PRECISION,
    "pnl_earnedUsd_last24h" DOUBLE PRECISION,
    "pnl_earnedUsd_last7d" DOUBLE PRECISION,
    "pnl_earnedUsd_last31d" DOUBLE PRECISION,
    "pnl_finished_total" INTEGER,
    "pnl_finished_24h" INTEGER,
    "pnl_finished_31d" INTEGER,
    "pnl_deposit_actual" DOUBLE PRECISION,
    "state_isArchived" BOOLEAN DEFAULT false,
    "state_isPaused" BOOLEAN DEFAULT false,
    "state_isTesting" BOOLEAN DEFAULT false,
    "state_isLastErrorResolved" BOOLEAN DEFAULT false,
    "state_tpOnly" BOOLEAN DEFAULT false,
    "misc_ordersWeights" TEXT,
    "partial_enabled" BOOLEAN DEFAULT false,
    "partial_activeOrdersCount" INTEGER DEFAULT 0,
    "partial_minPctOrders" DOUBLE PRECISION DEFAULT 0,
    "lock_lockedUntil" TIMESTAMP(3),
    "lock_lockedAt" TIMESTAMP(3),
    "lock_reason" TEXT,
    "notifs_disabled" BOOLEAN,
    "notifs_minProg" DOUBLE PRECISION,
    "deps_status" "bt_DepsStatus",
    "hp_tpPlaced" BOOLEAN,
    "hp_ordersPlaced" BOOLEAN,

    CONSTRAINT "bt_Bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_Wallet" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balanceInitial" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "bt_Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_db_Transaction" (
    "id" SERIAL NOT NULL,
    "txid" TEXT,
    "userId" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,
    "type" "bt_db_TxType" NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "isRvd" BOOLEAN DEFAULT false,
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "usdPriceAt" TIMESTAMP(3),
    "sumBtc" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "sumUsd" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "bt_db_Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "btc_Price" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "btc_Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BotError" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER,
    "userId" INTEGER,
    "error" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "level" "bt_LogLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bt_BotError_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BotNotification" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "short" TEXT NOT NULL,
    "full" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bt_BotNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BotOrder" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "type" "bt_BotOrderType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "exch_clientOrderId" TEXT NOT NULL,
    "exch_orderId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bt_BotOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BotTrade" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "type" "bt_BotOrderType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bt_BotTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BotTakeProfitTrade" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "tradeId" INTEGER NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bt_BotTakeProfitTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_Bot_GridOrder" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "type" "bt_BotOrderType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bt_Bot_GridOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_GlobalState" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "runningBots_isActive" BOOLEAN NOT NULL DEFAULT false,
    "runningBots_startedAt" TIMESTAMP(3),
    "runningBots_disabled" BOOLEAN,

    CONSTRAINT "bt_GlobalState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_Balance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "apikeyId" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "uPNL" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bt_Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BalanceChange" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "apikeyId" INTEGER,
    "balanceChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "uPNLChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bt_BalanceChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tg_ParsedUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "username" TEXT,
    "dates_lastMessage" TIMESTAMP(3),
    "dates_firstMessage" TIMESTAMP(3),
    "messagesCount" INTEGER,

    CONSTRAINT "tg_ParsedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_LeverageBracket" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "maintMarginRatio" DOUBLE PRECISION NOT NULL,
    "maintAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "bt_LeverageBracket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BotProfitResult" (
    "id" SERIAL NOT NULL,
    "periodD" TIMESTAMP(3) NOT NULL,
    "period" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "botId" INTEGER NOT NULL,
    "pnl_earnedUsd_1d" DOUBLE PRECISION NOT NULL,
    "pnl_earnedUsd_1w" DOUBLE PRECISION NOT NULL,
    "pnl_earnedUsd_1m" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "bt_BotProfitResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "balance_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balance_used" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bt_Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_UnitItem" (
    "id" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "botId" INTEGER NOT NULL,
    "targetId" INTEGER,
    "dep_field" TEXT,

    CONSTRAINT "bt_UnitItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_BotDep" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "cond_botId" INTEGER,
    "cond_field" TEXT,
    "cond_statement" TEXT,
    "cond_value" TEXT,

    CONSTRAINT "bt_BotDep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_db_UserDebt" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "usdEarned" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "usdDebtTtl" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "usdDebtCur" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "usdPaid" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "btc_wallet" TEXT,

    CONSTRAINT "bt_db_UserDebt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_db_Debt" (
    "id" SERIAL NOT NULL,
    "period" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "botId" INTEGER NOT NULL,
    "res_Debt" DECIMAL(65,30) NOT NULL,
    "res_Earned" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "bt_db_Debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bt_db_BtcTx" (
    "id" SERIAL NOT NULL,
    "period" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "res_amountBtc" DOUBLE PRECISION NOT NULL,
    "res_amountUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bt_db_BtcTx_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_bt_BotTobt_Unit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_handle_key" ON "Session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "Stock"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "bt_Pair_name_key" ON "bt_Pair"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bt_Frame2_pairId_date_key" ON "bt_Frame2"("pairId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "bt_ApiKey_userId_key_secret_key" ON "bt_ApiKey"("userId", "key", "secret");

-- CreateIndex
CREATE UNIQUE INDEX "bt_Wallet_address_key" ON "bt_Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "bt_Wallet_userId_key" ON "bt_Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bt_BalanceChange_id_userId_key" ON "bt_BalanceChange"("id", "userId");

-- CreateIndex
CREATE INDEX "bt_LeverageBracket_symbol_idx" ON "bt_LeverageBracket"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "bt_BotProfitResult_periodD_userId_botId_key" ON "bt_BotProfitResult"("periodD", "userId", "botId");

-- CreateIndex
CREATE UNIQUE INDEX "bt_db_UserDebt_userId_key" ON "bt_db_UserDebt"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bt_db_Debt_period_userId_botId_key" ON "bt_db_Debt"("period", "userId", "botId");

-- CreateIndex
CREATE UNIQUE INDEX "_bt_BotTobt_Unit_AB_unique" ON "_bt_BotTobt_Unit"("A", "B");

-- CreateIndex
CREATE INDEX "_bt_BotTobt_Unit_B_index" ON "_bt_BotTobt_Unit"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frame" ADD CONSTRAINT "Frame_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletMovement" ADD CONSTRAINT "WalletMovement_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_addFundsOpId_fkey" FOREIGN KEY ("addFundsOpId") REFERENCES "AddFundsOp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_buySellOpId_fkey" FOREIGN KEY ("buySellOpId") REFERENCES "BuySellOp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddFundsOp" ADD CONSTRAINT "AddFundsOp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddFundsOp" ADD CONSTRAINT "AddFundsOp_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddFundsOp" ADD CONSTRAINT "AddFundsOp_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuySellOp" ADD CONSTRAINT "BuySellOp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuySellOp" ADD CONSTRAINT "BuySellOp_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuySellOp" ADD CONSTRAINT "BuySellOp_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_LoadedDay" ADD CONSTRAINT "bt_LoadedDay_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "bt_Pair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_Frame2" ADD CONSTRAINT "bt_Frame2_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "bt_Pair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotTestResult" ADD CONSTRAINT "bt_BotTestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotTestResult" ADD CONSTRAINT "bt_BotTestResult_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_ApiKey" ADD CONSTRAINT "bt_ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_Bot" ADD CONSTRAINT "bt_Bot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_Bot" ADD CONSTRAINT "bt_Bot_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "bt_ApiKey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_Wallet" ADD CONSTRAINT "bt_Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_db_Transaction" ADD CONSTRAINT "bt_db_Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_db_Transaction" ADD CONSTRAINT "bt_db_Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "bt_Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotError" ADD CONSTRAINT "bt_BotError_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotError" ADD CONSTRAINT "bt_BotError_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotNotification" ADD CONSTRAINT "bt_BotNotification_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotOrder" ADD CONSTRAINT "bt_BotOrder_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotTrade" ADD CONSTRAINT "bt_BotTrade_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotTakeProfitTrade" ADD CONSTRAINT "bt_BotTakeProfitTrade_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotTakeProfitTrade" ADD CONSTRAINT "bt_BotTakeProfitTrade_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "bt_BotTrade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_Bot_GridOrder" ADD CONSTRAINT "bt_Bot_GridOrder_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_Balance" ADD CONSTRAINT "bt_Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_Balance" ADD CONSTRAINT "bt_Balance_apikeyId_fkey" FOREIGN KEY ("apikeyId") REFERENCES "bt_ApiKey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BalanceChange" ADD CONSTRAINT "bt_BalanceChange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BalanceChange" ADD CONSTRAINT "bt_BalanceChange_apikeyId_fkey" FOREIGN KEY ("apikeyId") REFERENCES "bt_ApiKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotProfitResult" ADD CONSTRAINT "bt_BotProfitResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotProfitResult" ADD CONSTRAINT "bt_BotProfitResult_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_Unit" ADD CONSTRAINT "bt_Unit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_UnitItem" ADD CONSTRAINT "bt_UnitItem_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "bt_Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_UnitItem" ADD CONSTRAINT "bt_UnitItem_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotDep" ADD CONSTRAINT "bt_BotDep_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_BotDep" ADD CONSTRAINT "bt_BotDep_cond_botId_fkey" FOREIGN KEY ("cond_botId") REFERENCES "bt_Bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_db_UserDebt" ADD CONSTRAINT "bt_db_UserDebt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_db_Debt" ADD CONSTRAINT "bt_db_Debt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_db_Debt" ADD CONSTRAINT "bt_db_Debt_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bt_Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bt_db_BtcTx" ADD CONSTRAINT "bt_db_BtcTx_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bt_BotTobt_Unit" ADD CONSTRAINT "_bt_BotTobt_Unit_A_fkey" FOREIGN KEY ("A") REFERENCES "bt_Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bt_BotTobt_Unit" ADD CONSTRAINT "_bt_BotTobt_Unit_B_fkey" FOREIGN KEY ("B") REFERENCES "bt_Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
