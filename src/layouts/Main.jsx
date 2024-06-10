import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from '../components'

export default function Main({ children }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  return (
    <div className="flex bg-[#F1F1F1] h-screen">
      <Sidebar open={open} setOpen={setOpen} />
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
        }}
        className={`h-screen fixed right-0`}
      />
      <div
        className="duration-300"
        style={{
          width: `calc(100vw - ${open ? '316px' : '56px'})`,
          overflow: pathname.includes('/m/') ? 'auto' : 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}
