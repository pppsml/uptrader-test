import { useCallback, useState } from 'react'

export const useDisclosure = (
  initialState: boolean = false,
  callbacks?: {
    onOpen?(): void,
    onClose?(): void,
  }
) => {
  const { onOpen, onClose } = callbacks || {}
  const [ opened, setOpened ] = useState<boolean>(initialState)

  const open = useCallback(() => {
    setOpened(prev => {
      if (!prev) {
        onOpen?.()
        return true
      }

      return prev
    })
  }, [onOpen])

  const close = useCallback(() => {
    setOpened(prev => {
      if (prev) {
        onClose?.()
        return false
      }

      return prev
    })
  }, [onClose])

  const toggle = useCallback(() => {
    opened ? close() : open()
  }, [close, open, opened])

  return [ opened, { open, close, toggle } ] as const
}