import { ReactNode } from 'react'

import classes from './Container.module.css'

interface Props {
  children?: ReactNode
}

export const Container = ({ children }: Props) => {
  return <div className={classes.container}>
    {children}
  </div>
}