import s from './ErrorLabel.module.css';

interface ErrorLabelProps {
  errorMessage?: string;
}

export const ErrorLabel = ({ errorMessage }: ErrorLabelProps) => {
  if (!errorMessage) return null;

  return <span className={s.errorLabel}>{errorMessage}</span>;
};
