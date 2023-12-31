import { ButtonHTMLAttributes, ReactNode } from "react";

import classes from './Button.module.css'

const ButtonVariants = {
  filled: classes.filled,
  subtle: classes.subtle,
  outline: classes.outline,
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof ButtonVariants;
  children?: ReactNode
}

export const Button = ({ className, variant = 'filled', children, ...props }: Props) => {

  return (
    <button
    className={`${classes.button} ${variant ? ButtonVariants[variant] : ''} ${className}`}
    {...props}>
      {children}
    </button>
  )
}