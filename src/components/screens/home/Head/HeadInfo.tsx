import HomeImg from '/public/images/robotHome.png';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from 'src/components/Icon/Icon';
import { useRef } from 'react';
import s from './HeadInfo.module.css';

export const HeadInfo = () => {
  const statisticButtonRef = useRef<HTMLButtonElement>(null);
  const scrollToStatistic = () => {
    statisticButtonRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <section className={s.container}>
      <motion.div
        className={s.textContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className={s.bigLabel}>Short Info about Smart-Stonks</h2>
        <p className={s.additionalText}>
          U nas est{"'"} publi4cna9 stata, testirovanie Ha uctopu4eckux gaHHblx, a takje otkritie
          kommentapuu v{' '}
          <Link
            href='https://t.me/smartstonks'
            target={'_blank'}
            rel='noreferrer'
            className='text-yellow-400'
          >
            telege
          </Link>
          . 4to tebe ewe, sobaka, nujno?? Esli pokajete pohojee prilojenii, gaguM skidku na 6
          mesyaces aj go 50%
        </p>

        <div className={s.registerContainer}>
          <button onClick={() => {}} className={s.registerButton}>
            <Icon name='user' className={s.userIcon} />
            <span> Sign up with Email</span>
          </button>
          <div className={s.or}>or</div>
          <button className={s.readMore} onClick={scrollToStatistic} ref={statisticButtonRef}>
            <Icon name='robot' className={s.robotIcon}></Icon>
            See the results
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className={s.imageContainer}
      >
        <Image src={HomeImg} alt='light-image' width={'500'} height={'500'} />
      </motion.div>
    </section>
  );
};
