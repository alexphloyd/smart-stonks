import { ReactNode } from 'react'
import s from './Container.module.css'

interface ContainerProps {
  children: ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <header className={s.mainContainer}>
      <div className={s.childContainer}>{children}</div>
    </header>
  )
}
