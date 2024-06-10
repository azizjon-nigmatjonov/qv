import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import { AnimatePresence, motion } from 'framer-motion'

import LogoSvg from '../assets/icons/logo.svg'
import { HamburgerIcon } from '../assets/icons'
import { logout } from '../redux/actions/authActions'
import ConfirmModal from '../components/ConfirmModal'
import { useUser } from '../services'
import MobileSidebar from '../components/Sidebar/mobileSideBar'
import useWindowSize from '../hooks/useWindowSize'

function MobileMain({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { roleName, userId, accessToken } = useSelector((state) => state.auth)

  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, deleteUserMutation } = useUser({ id: userId })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleModalOpen = () => setIsOpen(true)
  const handleModalClose = () => setIsOpen(false)

  useEffect(() => {
    if (!roleName) {
      navigate('/login')
    }
  }, [roleName, navigate])

 

  return (
    <div className="relative mobile-h-calc">
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute top-0 left-0 w-full h-full bg-[#00000080] z-[35] ${!open ? 'w-0' : ''}`}
          />
        )}
      </AnimatePresence>
      <MobileSidebar open={open} handleClose={handleClose} user={user} handleModalOpen={handleModalOpen} />

      <div className="p-[16px] flex justify-between items-center shadow-md max-h-[80px]">
        <img src={LogoSvg} alt="logo" onClick={() => navigate('m/objects')} />
        <div className="rounded-lg bg-[#F7F7F7] p-2" onClick={handleOpen}>
          <HamburgerIcon />
        </div>
      </div>
      <div className="bg-[#f6f6f6] h-full">{children}</div>
      <ConfirmModal
        mobileView
        iconColor="#F76659"
        isOpen={isOpen}
        title="Tizimdan chiqmoqchimisiz?"
        handleClose={handleModalClose}
        fn={() => {
          handleClose()
          deleteUserMutation.mutate({ access_token: accessToken })
          dispatch(logout())
          handleModalClose()
        }}
      />
    </div>
  )
}

export default MobileMain
