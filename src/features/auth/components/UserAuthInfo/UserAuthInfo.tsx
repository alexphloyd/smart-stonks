import Link from 'next/link';
import { Icon } from 'src/components/Icon/Icon';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { closeMobileMenu } from 'src/store/slices/mobileMenuSlice';
import { UserAuthInfoSkelet } from './skelets/UserAuthInfoSkelet';
import { useEffect } from 'react';
import { getUserFromSession } from '../../slice/thunks/getUserFromSession';
import { logout } from '../../slice/thunks/logout';
import s from './UserAuthInfo.module.css';

export const UserAuthInfo = () => {
  const dispatch = useAppDispatch();
  const { user, authStatus } = useAppSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getUserFromSession());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (authStatus === 'pending') return <UserAuthInfoSkelet />;

  if (!user) {
    return (
      <div className={s.container}>
        <Link href='/auth/signin' className={s.logIn} onClick={() => dispatch(closeMobileMenu())}>
          Log In
        </Link>
        <Link
          href='/auth/signup'
          className={s.register}
          onClick={() => dispatch(closeMobileMenu())}
        >
          <Icon name='robot' style={{ width: '19px', height: '20px', marginRight: '6px' }} />
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <button className={s.userName}>{user.email.split('@')[0]}</button>
      <button onClick={handleLogout} className={s.exitButton}>
        <Icon name='exit' className={s.exitIcon} />
      </button>
      <span className='horizontaLine'></span>
    </div>
  );
};
