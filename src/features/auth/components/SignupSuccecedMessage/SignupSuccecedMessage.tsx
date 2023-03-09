import Link from 'next/link';
import s from './SignupSuccecedMessage.module.css';

export const SignupSuccecedMessage = () => {
  return (
    <div className={s.container}>
      <p>Signup succeced</p>
      <Link href='/auth/signin' className={s.loginLink}>
        Please, Log In to Your account
      </Link>
    </div>
  );
};
