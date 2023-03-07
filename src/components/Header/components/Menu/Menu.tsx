import Link from 'next/link';
import { useAppSelector } from '@/store/hooks/hooks';
import { ItemMenuSkelet } from './skelets/ItemMenuSkelet';
import s from './Menu.module.css';

export const Menu = () => {
  const { user, status } = useAppSelector((store) => store.auth);

  if (status === 'pending') {
    return (
      <nav className={s.list}>
        <ItemMenuSkelet />
        <ItemMenuSkelet />
      </nav>
    );
  }

  return (
    <nav className={s.list}>
      {/* user bots dashboard  */}
      {user ? (
        <Link href='/' className={s.item}>
          Home
        </Link>
      ) : null}

      {user ? (
        <Link href='/apiKeys' className={s.item}>
          API Keys
        </Link>
      ) : null}

      <Link href='/' className={s.item}>
        Stats
      </Link>

      <Link href='/' className={s.item}>
        Contact Us
      </Link>
    </nav>
  );
};
