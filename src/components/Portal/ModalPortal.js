import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

export const ModalPortal = ({
  children,
  className = 'root-modal-portal',
  el = 'div',
  closeModal = () => {},
  open = false,
}) => {
  const [container] = useState(() => document.createElement(el))

  const { pathname } = useLocation()

  const rootModal = document.body.querySelector(`.${className}`)
  useEffect(() => {
    if (open) {
      container.classList.add(className)
      document.body.appendChild(container)
    } else if (document.body.contains(rootModal) && !open) {
      closeModal()
      document.body.removeChild(container)
    }

    return () => {
      if (document.body.contains(rootModal)) document.body.removeChild(container)
    }
  }, [open])

  useEffect(() => {
    if (document.body.contains(rootModal)) document.body.removeChild(container)
  }, [pathname])

  return createPortal(children, container)
}
