import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props extends PropsWithChildren {
  rootId: string;
}

export const Portal = ({ rootId, children }: Props) => {
  const [ isMounted, setIsMounted ] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>()

  useEffect(() => {
    setIsMounted(true)
    containerRef.current = document.querySelector<HTMLDivElement>(`#${rootId}`)

    return () => setIsMounted(false)
  }, [])

  return (
    isMounted && !!containerRef.current ? createPortal(children, containerRef.current) : null
  )
}