import clsx from 'clsx';
import { SelectLangButton } from 'src/features/multiLang/components/SelectLangButton/SelectLangButton';
import { ThemeButton } from '@/features/theme/components/ThemeButton/ThemeButton';
import { UserAuthInfo } from 'src/features/auth/components/UserAuthInfo/UserAuthInfo';
import { AnchorMenuButton } from './components/AnchorMenuButton/AnchorMenuButton';
import { Container } from './components/Container/Container';
import { Logo } from './components/Logo/Logo';
import { Menu } from './components/Menu/Menu';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import s from './Header.module.css';

export const Header = () => {
  return (
    <>
      <Container>
        <section className={s.sectionContainer}>
          <Logo />
          <Menu />
        </section>

        <section className={clsx(s.sectionContainer, s.settings)}>
          <UserAuthInfo />

          <SelectLangButton />
          <span className='horizontaLine' />
          <ThemeButton />
        </section>

        <AnchorMenuButton />
      </Container>

      <MobileMenu />
    </>
  );
};
