import { TextareaHTMLAttributes, useId } from "react";

import classes from './Textarea.module.css'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = ({ label, className, id, ...props }: Props) => {
  const inputId = id || useId()

  return (
    <div>
      {label && <label className={classes.label} htmlFor={inputId}>{label}</label>}
      <textarea 
      id={inputId}
      className={`${classes.textarea} ${className ?? ''}`}
      {...props} />
    </div>
  )
}