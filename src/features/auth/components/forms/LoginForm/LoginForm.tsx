import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { UserAuthenticate } from '@/features/auth/types/validations';
import { login } from '@/features/auth/slice/thunks/login';
import { resetAuthError } from '@/features/auth/slice/authSlice';
import { TUserAuthenticatePayload } from '@/features/auth/types/types';
import Form from 'src/components/Form/Form';
import LabeledTextField from 'src/components/textFields/LabeledTextField/LabeledTextField';
import s from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const authError = useAppSelector((store) => store.auth.error);
  const [inputErrors, setInputErrors] = useState<object | null>(null);
  const formError = !inputErrors && authError?.type === 'login' ? authError?.message : undefined;

  const handleSetInputErrors = (values: object | null) => setInputErrors(values);

  const handleLogin = async (userCredentials: TUserAuthenticatePayload) => {
    dispatch(login(userCredentials));
  };

  useEffect(() => {
    dispatch(resetAuthError());
  }, []);

  return (
    <div className={s.container}>
      <h3 className={s.label}>Smart-Stonks Login</h3>

      <Form
        submitText='Login'
        schema={UserAuthenticate}
        onSubmit={handleLogin}
        setInputsError={handleSetInputErrors}
        formErrorMessage={formError}
        addClass='mt-6'
      >
        <LabeledTextField
          name='email'
          label='Email'
          placeholder='example@gmail.com'
          errors={inputErrors}
          addClass={'mb-9'}
        />
        <LabeledTextField
          name='password'
          label='Password'
          type='password'
          placeholder='•••••••••••'
          errors={inputErrors}
          addClass={'mb-4'}
        />
      </Form>
    </div>
  );
};
