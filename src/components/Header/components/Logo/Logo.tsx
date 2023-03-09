import Link from 'next/link';
import Image from 'next/image';
import LogoPng from '/public/logo.png';
import s from './Logo.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/store/hooks/hooks';
import useWindowSize from '@/hooks/useWindowSize';

export const Logo = () => {
  const mobileMenu = useAppSelector((store) => store.mobileMenu);
  const windowSize = useWindowSize();

  return (
    <section className={s.section}>
      <Link href={'/'} legacyBehavior>
        <div className={s.logo}>
          <div className={s.img}>
            <Image src={LogoPng} alt='logo' width={29} height={29} />
          </div>
          {windowSize.width < 769 ? (
            <AnimatePresence>
              {mobileMenu === 'closed' ? (
                <motion.a
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={s.label}
                >
                  Smart-Stonks
                </motion.a>
              ) : null}
            </AnimatePresence>
          ) : (
            <span className={s.label}>Smart-Stonks</span>
          )}
        </div>
      </Link>
    </section>
  );
};
