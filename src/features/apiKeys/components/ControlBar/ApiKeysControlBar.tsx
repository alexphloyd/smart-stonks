import { CreateAPIKeyForm } from '../forms/CreateAPIKeyForm/CreateAPIKeyForm';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from 'src/components/Icon/Icon';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { openCreateAPIKeyForm } from '../../slice/apiKeysSlice';
import s from './ApiKeysContolBar.module.css';

export const APIKeysControlBar = () => {
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);
  const isFormVisible = useAppSelector((store) => store.apiKeys.isCreateAPIKeyFormVisible);

  const handleOpenForm = () => {
    dispatch(openCreateAPIKeyForm());
  };

  const handleSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <main className={s.mainContainer}>
      <section className={s.labelContainer}>
        <div>
          <span className={s.label}>API Keys</span>
          <a
            href='https://www.binance.com/en/support/faq/how-to-create-api-360002502072'
            target='_blank'
            rel='noreferrer'
            className={s.binanceLink}
          >
            Create a Key on Binance
          </a>
        </div>
        {isFormVisible ? (
          <button className={s.addButton} onClick={handleSubmit}>
            <Icon name='check' className={s.confirmButtonIcon} />
          </button>
        ) : (
          <button className={s.addButton} onClick={handleOpenForm}>
            <Icon name='plus' className={s.addButtonIcon} />
          </button>
        )}
      </section>
      <AnimatePresence>
        {isFormVisible ? (
          <motion.section
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            exit={{ height: 0 }}
            className={s.activeAddKeyBarContainer}
          >
            {isFormVisible ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className={s.activeAddKeyBar}
              >
                <CreateAPIKeyForm ref={formRef} />
              </motion.div>
            ) : null}
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  );
};
