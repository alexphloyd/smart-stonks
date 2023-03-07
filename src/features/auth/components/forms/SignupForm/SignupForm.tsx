import Form from 'src/components/Form/Form';
import LabeledTextField from 'src/components/textFields/LabeledTextField/LabeledTextField';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Signup } from '../../../types/validations';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { createNewUser } from '@/features/auth/slice/thunks/createNewUser';
import s from './SignupForm.module.css';
import { TUserAuthenticatePayload } from '@/features/auth/types/types';
import { resetAuthError } from '@/features/auth/slice/authSlice';

export const SignupForm = () => {
  const dispatch = useAppDispatch();

  const authError = useAppSelector((store) => store.auth.error);
  const [inputErrors, setInputErrors] = useState<object | null>(null);
  const formError = !inputErrors && authError?.type === 'signup' ? authError?.message : undefined;

  const passInputRef = useRef<HTMLInputElement>(null);
  const passConfirmInputRef = useRef<HTMLInputElement>(null);

  const [passState, setPassState] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const [isPassValid, setIsPassValid] = useState(false);
  const [isPassConfirmed, setIsPassConfirmed] = useState(false);

  useEffect(() => {
    passState.password.length > 7 ? setIsPassValid(true) : setIsPassValid(false);
    passState.password === passState.passwordConfirmation
      ? setIsPassConfirmed(true)
      : setIsPassConfirmed(false);
  }, [passState]);

  const handleSetInputErrors = (values: object | null) => setInputErrors(values);

  const updatePassState = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.name === 'password'
      ? setPassState({ ...passState, password: event.target.value })
      : setPassState({ ...passState, passwordConfirmation: event.target.value });
  };

  const handleCreateUser = async (userData: TUserAuthenticatePayload) => {
    dispatch(createNewUser({ email: userData.email, password: userData.password }));
  };

  useEffect(() => {
    dispatch(resetAuthError());
  }, []);

  return (
    <div className={s.container}>
      <h3 className={s.label}>Create Personal Account</h3>

      <Form
        submitText='Create Account'
        schema={Signup}
        onSubmit={handleCreateUser}
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
          ref={passInputRef}
          onChange={updatePassState}
          isInputValid={passState.password ? isPassValid : undefined}
          errors={inputErrors}
          addClass={'mb-9'}
        />
        <LabeledTextField
          name='passwordConfirmation'
          label='Confirm password'
          placeholder='Confirm password'
          type='password'
          ref={passConfirmInputRef}
          onChange={updatePassState}
          isInputValid={passState.passwordConfirmation ? isPassConfirmed : undefined}
          errors={inputErrors}
          addClass={'mb-4'}
        />
      </Form>
    </div>
  );
};
