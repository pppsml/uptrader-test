import { forwardRef, InputHTMLAttributes, useId } from "react"


import classes from './Input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({
  label,
  className,
  id,
  ...rest
}: Props,
  ref
) => {
  const inputId = id || useId()
  

  return (
    <div>

      {label
      && <label
      className={classes.label}
      htmlFor={inputId}>
        {label}
      </label>}

      <input
      ref={ref}
      id={inputId}
      className={`${classes.input} ${className ?? ''}`}
      {...rest} />
    </div>
  )
})