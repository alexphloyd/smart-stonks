import s from './Label.module.css'

interface InputLabelProps {
  isError: boolean
  inputName: string
  label?: string
  formErrors: object | null | undefined
}

export const Label = ({ isError, inputName, label, formErrors }: InputLabelProps) => {
  if (!isError && label) {
    return <span className={s.plainLabel}>{label}</span>
  }

  if (formErrors) {
    let errorText = ''
    for (const [key, value] of Object.entries(formErrors)) {
      if (key === inputName) {
        errorText = value.message
      }
    }

    return <span className={s.errorLabel}>{errorText}</span>
  }

  return null
}
