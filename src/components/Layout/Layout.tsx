import Head from 'next/head';
import { ReactNode } from 'react';
import { Header } from '../Header/Header';
import s from './Layout.module.css';

interface LayoutProps {
  title?: string;
  children?: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title || 'Smart-Stonks'}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={s.layout}>
        <Header />

        <div className={s.container}>
          <main className={s.main}>{children}</main>
          <footer className={s.footer}>Smart-Stonks @ 2023 DTX Team</footer>
        </div>
      </div>
    </>
  );
}
