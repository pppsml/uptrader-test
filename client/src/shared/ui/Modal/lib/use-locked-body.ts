import { useEffect } from 'react'

export const useLockedBody = (locked: boolean = false) => {
  useEffect(() => {
    if (!locked) {
      return
    }

    const originalOverflow = document.body.style.overflow
    const originalPadding = document.body.style.paddingRight
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth

    document.body.style.paddingRight = `${scrollBarWidth}px`
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPadding
    }
  }, [locked])
}