import { memo } from "react"

import { File } from "../../model"

import classes from './FileLink.module.css'

interface Props {
  file: File
}

export const FileLink = memo(({ file }: Props) => {

  return (
    <a style={{ display: 'block' }} className={classes.filelink} href='#' download={file.uri}>
      {file.filename}
    </a>
  )
})