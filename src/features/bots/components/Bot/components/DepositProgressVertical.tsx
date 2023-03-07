import clsx from 'clsx';
import { useTheme } from 'next-themes';

interface DepositProgressVeritcalProps {
  earnedUsdByCells: number;
  depositActual: number;
  botType: string;
}

export const DepositProgressVeritcal = ({
  botType,
  depositActual,
  earnedUsdByCells,
}: DepositProgressVeritcalProps) => {
  const { theme } = useTheme();
  const progressInPx = (60 / 100) * Math.round(((earnedUsdByCells / depositActual) * 100) % 100);

  return (
    <div className={`flex flex-col-reverse h-[60px] w-1.5 rounded-sm bg-gray-500/20`}>
      <div
        className={clsx(
          'w-1.5',
          botType == 'long' && `${theme === 'dark' ? 'bg-green-300/50' : 'bg-green-300'}`,
          botType == 'short' && `${theme === 'dark' ? 'bg-red-400/60' : 'bg-red-400/80'}`
        )}
        style={{ height: `${progressInPx}px` }}
      />
    </div>
  );
};
