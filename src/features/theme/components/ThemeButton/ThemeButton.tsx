import { useTheme } from 'next-themes';
import { Icon } from '@/components/Icon/Icon';
import { useState, useEffect } from 'react';
import s from './ThemeButton.module.css';

export const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button className={s.button} onClick={handleChange}>
      {theme === 'dark' ? (
        <Icon name='sun' className={s.icon} />
      ) : (
        <Icon name='moon' className={s.icon} />
      )}
    </button>
  );
};
