import { PropsWithChildren, ReactNode } from 'react'
import { TbX } from 'react-icons/tb'

import { useEscape, useLockedBody } from '../lib'
import { Portal } from '../../Portal'
import { Button } from '../../Button'

import classes from './Modal.module.css'

export interface ModalProps extends PropsWithChildren {
  title?: string;
  bottomContent?: ReactNode
  opened: boolean;
  close?(): void;
}

export const Modal = ({ title, bottomContent, opened, close, children }: ModalProps) => {
  useLockedBody(opened)
  useEscape(close)

  return (
    <Portal rootId='modal'>
      {
        opened && (
          <div className={classes.overlay} onClick={close}>
            <div className={classes.modal} onClick={e => e.stopPropagation()}>
              <header className={classes.modal__header}>
                <h3>{title ?? ''}</h3>
                <Button variant='subtle' onClick={close}><TbX size='70%' /></Button>
              </header>
              <main className={classes.modal__content}>
                {children}
              </main>
              <footer>
                {bottomContent}
              </footer>
            </div>
          </div>
        )
      }
    </Portal>
  )
}