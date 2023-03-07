import { useTheme } from 'next-themes';
import { Icon } from '@/components/Icon/Icon';
import s from './SwitchButton.module.css';

export const SwitchThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <button className={s.button} onClick={handleChange}>
      {theme === 'dark' ? (
        <Icon name='moon' className={s.icon} />
      ) : (
        <Icon name='sun' className={s.icon} />
      )}
    </button>
  );
};
