import clsx from 'clsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ErrorLabel } from './components/ErrorLabel/ErrorLabel';
import { FormProps } from './types/types';
import { forwardRef, Ref } from 'react';
import s from './Form.module.css';

const Form = forwardRef(
  <S extends z.ZodType<any, any>>(
    {
      schema,
      onSubmit,
      setInputsError,
      formErrorMessage,
      submitText,
      initialValues,
      addClass,
      children,
      ...props
    }: FormProps<S>,
    ref: Ref<HTMLFormElement>
  ) => {
    const ctx = useForm<z.infer<S>>({
      mode: 'onChange',
      reValidateMode: 'onChange',
      resolver: schema ? zodResolver(schema) : undefined,
      defaultValues: initialValues,
    });

    const handleSubmit = ctx.handleSubmit(
      async (values) => {
        await onSubmit(values).then(() => setInputsError(null));
      },
      async (inputErrors) => {
        setInputsError(inputErrors);
      }
    );

    return (
      <FormProvider {...ctx}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={clsx([s.form, { [addClass as string]: addClass }])}
          {...props}
        >
          {children}
          {submitText ? (
            <div className={s.buttonContainer}>
              <button type='submit' className={s.submitButton}>
                {submitText}
              </button>
              <ErrorLabel errorMessage={formErrorMessage} />
            </div>
          ) : null}
        </form>
      </FormProvider>
    );
  }
);

export default Form;
