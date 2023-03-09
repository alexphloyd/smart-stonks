import clsx from 'clsx';
import { forwardRef, PropsWithoutRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from './components/Label/Label';
import { ValidationIcon } from './components/ValidationIcon';
import s from './LabeledTextFiled.module.css';

interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  name: string;
  errors: object | null;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  isInputValid?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  inputSize?: 'small' | 'large';
  maxWidth?: string;
  addClass?: string;
}

export default forwardRef<HTMLInputElement, LabeledTextFieldProps>(function LabeledTextField(
  {
    name,
    errors,
    disabled,
    placeholder,
    isInputValid,
    label,
    inputSize = 'large',
    maxWidth = '400px',
    addClass,
    ...props
  },
  ref
) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext();
  const isValidationIconVisible = typeof isInputValid === 'boolean';
  const isError = isInputError(name, errors);

  return (
    <div className={clsx([s.container, { [addClass as string]: addClass }])} style={{ maxWidth }}>
      <Label isError={isError} inputName={name} label={label} formErrors={errors} />
      <div className={s.inputBox}>
        <input
          className={clsx({
            [s.input as any]: !isError,
            [s.errorInput as any]: isError,
            [s.inputWithValidationIcon as any]: isValidationIconVisible,
            [s.smallPlaceHolder as any]: inputSize === 'small',
          })}
          style={{ height: inputSize === 'large' ? '48px' : '35px' }}
          disabled={isSubmitting || disabled}
          placeholder={placeholder}
          {...register(name)}
          {...props}
        />
        <ValidationIcon
          isValidationIconVisible={isValidationIconVisible}
          isInputValid={isInputValid}
        />
      </div>
    </div>
  );
});

const isInputError = (inputName: string, errors: object | null | undefined) => {
  if (errors) {
    let isError = false;
    for (const key of Object.keys(errors)) {
      key === inputName ? (isError = true) : null;
    }
    return isError;
  }

  return false;
};
