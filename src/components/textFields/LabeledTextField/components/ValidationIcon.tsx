interface ValidationIconProps {
  isValidationIconVisible: boolean
  isInputValid: boolean | undefined
}

export const ValidationIcon = ({ isValidationIconVisible, isInputValid }: ValidationIconProps) => {
  if (!isValidationIconVisible) return null

  return isInputValid ? (
    <div className='absolute right-[12px] top-[10px] opacity-[80%] text-[18px]'>{'✔'}</div>
  ) : (
    <div className='absolute right-[10px] top-[12px] opacity-[60%]'>{'❌'}</div>
  )
}
