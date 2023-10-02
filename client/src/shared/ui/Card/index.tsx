import { ReactNode } from "react"

import classes from './Card.module.css'

interface Props {
  children: ReactNode;
}

export const Card = ({ children }: Props) => {

  return <div className={classes.card}>
    {children}
  </div>
}