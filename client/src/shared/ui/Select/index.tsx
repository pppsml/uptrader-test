import { SelectHTMLAttributes, useId } from "react"

import classes from './Select.module.css'

type Option = {
  text: string;
  value: string | number;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
}

export const Select = ({ label, id, className, options = [], ...rest }: Props) => {

  const inputId = id || useId()

  return (
    <div>
      {label && <label className={classes.label} htmlFor={inputId}>{label}</label>}
      <select
      id={inputId}
      className={`${classes.input} ${className ?? ''}`}
      {...rest}>
        {options.map(({ text, value }) => (
          <option key={`${text}-${value}`} value={value}>{text}</option>
        ))}
      </select>
    </div>
  )
}