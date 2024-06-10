import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import phoneNumberFormatter from '../../utils/phoneNumberFormatter'
import ProfilePhoto from '../../assets/images/profile.png'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import HelpIcon from '@mui/icons-material/Help'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import ArchiveIcon from '@mui/icons-material/Archive'
import { routes } from '../../routes'
import { permissions } from '../../settings/permissions'
import { useSelector } from 'react-redux'
import { v4 } from 'uuid'

export default function MobileSidebar({ open, handleClose, user, handleModalOpen }) {
  const { roleId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const mobileSidebarItems = [
    {
      title: 'Obyektlar',
      path: 'm/objects',
      icon: <HomeWorkIcon htmlColor="#367CF4" />,
    },
    {
      title: 'Arxiv',
      path: 'm/objects-archieve',
      icon: <ArchiveIcon htmlColor="#367CF4" />,
    },
    {
      title: 'F.A.Q',
      path: 'm/faq',
      icon: <HelpIcon htmlColor="#367CF4" />,
    },
  ]
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%', zIndex: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-4/5  bg-white z-[36] pt-[52px] px-3 h-[100vh]"
        >
          <div
            className="flex items-center gap-3 mb-9"
            onClick={() => {
              navigate('m/profile')
              handleClose()
            }}
          >
            <img src={ProfilePhoto} alt="profile" className="rounded-full" width={56} height={56} />
            <div>
              <p className="text-[15px] text-[#1A2024] leading-5 font-semibold mb-0.5">
                {user.data?.surname} {user.data?.name} {user.data?.middle_name}
              </p>
              <p className="text-[15px] text-[#6E7C87] leading-5 font-semibold">
                {phoneNumberFormatter(user.data?.phone)}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between grow">
            {routes
              .filter((route) => !route.bottomElement)
              .map(
                (route) =>
                  (route.permission === 'all' ? true : permissions[roleId]?.includes(route.permission)) &&
                  route.mobile &&
                  !route.hide && (
                    <NavLink key={route.path + 'mobile-sidebar' + v4()} to={route.path} onClick={() => handleClose()}>
                      {({ isActive }) => (
                        <div
                          key={route.path + v4()}
                          className={`flex items-center gap-3 ${isActive ? 'text-primary' : 'text-secondary'}`}
                        >
                          <span className="px-2">{route.icon(isActive ? '#0E73F6' : '#6E8BB7')}</span>
                          <p className="grow text-sm leading-6 border-b py-5 font-semibold">{route.title}</p>
                        </div>
                      )}
                    </NavLink>
                  )
              )}
          </div>
          <div className="flex items-center absolute bottom-[80px] sm:bottom-8 w-[93%]" onClick={handleModalOpen}>
            <span className="px-2">
              <ExitToAppOutlinedIcon />
            </span>
            <p className="grow text-sm leading-6 border-b py-5 font-semibold">Tizimdan chiqish</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
