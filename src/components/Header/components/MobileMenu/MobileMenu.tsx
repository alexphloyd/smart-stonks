import clsx from 'clsx';
import Link from 'next/link';
import { ThemeButton } from '@/features/theme/components/ThemeButton/ThemeButton';
import { SelectLangButton } from 'src/features/multiLang/components/SelectLangButton/SelectLangButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { closeMobileMenu } from 'src/store/slices/mobileMenuSlice';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { UserAuthInfo } from 'src/features/auth/components/UserAuthInfo/UserAuthInfo';
import { Suspense } from 'react';
import { UserAuthInfoSkelet } from 'src/features/auth/components/UserAuthInfo/skelets/UserAuthInfoSkelet';
import s from './MobileMenu.module.css';

export const MobileMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);
  const mobileMenu = useAppSelector((store) => store.mobileMenu);

  return (
    <div className={clsx(s.container, mobileMenu === 'open' && s._active)}>
      <AnimatePresence>
        {mobileMenu === 'open' && (
          <motion.div
            variants={ANIMATION_SETTINGS}
            initial='initial'
            animate='animate'
            exit='exit'
            className={s.settings}
          >
            <SelectLangButton />
            <span />
            <ThemeButton />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={s.list}>
        {/* user bots dashboard  */}
        {user ? (
          <Link href={'/'} legacyBehavior>
            <span className={s.item} onClick={() => dispatch(closeMobileMenu())}>
              Home
            </span>
          </Link>
        ) : null}

        {user ? (
          <Link href={'/apiKeys'} legacyBehavior>
            <span className={s.item} onClick={() => dispatch(closeMobileMenu())}>
              API Keys
            </span>
          </Link>
        ) : null}

        <Link href={'/'} legacyBehavior>
          <span className={s.item} onClick={() => dispatch(closeMobileMenu())}>
            Stats
          </span>
        </Link>

        <Link href={'/'} legacyBehavior>
          <span className={s.item} onClick={() => dispatch(closeMobileMenu())}>
            Contact Us
          </span>
        </Link>
      </nav>

      <footer className={s.userAuthInfo}>
        <Suspense fallback={<UserAuthInfoSkelet />}>
          <UserAuthInfo />
        </Suspense>
      </footer>
    </div>
  );
};

const ANIMATION_SETTINGS: Variants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: { delay: 0.45, duration: 0.2 },
  },
  exit: {
    scale: 0,
    opacity: 0,
    x: '40%',
  },
};
