import { useEffect } from 'react'

export const useEscape = (callback?: (event: KeyboardEvent) => unknown) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback?.(event)
      }
    }

    window.document.addEventListener('keypress', handleEscape)

    return () => window.document.removeEventListener('keypress', handleEscape)
  }, [callback])
}