import s from './AccessDenied.module.css';

export const AccessDenied = () => {
  return (
    <main className={s.container}>
      <p>Access Denied</p>
      <span>{`You don't have permission to access on this Page.`}</span>
    </main>
  );
};
