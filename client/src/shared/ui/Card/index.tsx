import { ReactNode, forwardRef, HTMLAttributes } from "react"

import classes from './Card.module.css'
interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | ReactNode[];
}

export const Card = forwardRef<HTMLDivElement, Props>(({ children, className, ...props }: Props, ref) => {

  return <div className={`${classes.card} ${className ?? ''}`} ref={ref} {...props}>
    {children}
  </div>
})