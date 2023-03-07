import { PropsWithoutRef, ReactNode, RefObject } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

export interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: any;
}

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  schema: S;
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>;
  setInputsError: (errors: object | null) => void;
  formErrorMessage?: string;
  submitText?: string;
  initialValues?: UseFormProps<z.infer<S>>['defaultValues'];
  addClass?: string;
  children?: ReactNode;
}

export const FORM_ERROR = 'FORM_ERROR';
