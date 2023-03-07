import { bt_Bot } from '@prisma/client';
import { HeadInfo } from 'src/components/screens/home/Head/HeadInfo';
import { Statistic } from 'src/components/screens/home/Statistic/Statistic';
import getBotsStatistic from 'src/features/bots/utils/getBotsStatistic';

interface HomeProps {
  bots: bt_Bot[];
}
export default function Home({ bots }: HomeProps) {
  return (
    <>
      <HeadInfo />
      <Statistic bots={bots} />
    </>
  );
}

export async function getStaticProps() {
  const bots = await getBotsStatistic();

  return {
    props: { bots },
    revalidate: 30 * 60000,
  };
}
