import clsx from 'clsx';
import { useAppSelector, useAppDispatch } from '@/store/hooks/hooks';
import { toggleMobileMenu } from 'src/store/slices/mobileMenuSlice';
import s from './AnchorMenuButton.module.css';

export const AnchorMenuButton = () => {
  const mobileMenu = useAppSelector((store) => store.mobileMenu);
  const dispatch = useAppDispatch();

  return (
    <div className={s.container}>
      <div
        className={clsx(s.anchor, mobileMenu === 'open' && s._active)}
        onClick={() => dispatch(toggleMobileMenu())}
      >
        <span />
      </div>
    </div>
  );
};
