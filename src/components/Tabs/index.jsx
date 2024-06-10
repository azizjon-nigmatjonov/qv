import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { permissions } from '../../settings/permissions'
import { useSelector } from 'react-redux'

export function Tabs({ elements }) {
  const { roleId } = useSelector((state) => state.auth)
  return (
    <div className="flex gap-[20px] items-center w-[30%] mobile:overflow-x-scroll tablet:overflow-x-visible">
      {elements?.map(
        (item) =>
          item &&
          (item.permission ? permissions[roleId].includes(item.permission) : true) && (
            <NavLink end to={item.path} key={item.key}>
              {({ isActive }) => (
                <div className="relative">
                  <div className="px-1 py-4">
                    <div className="text-[14px] leading-[24px] font-[500] text-secondary">
                      <span className={`${isActive ? 'text-primary' : 'text-secondary'} whitespace-nowrap`}>
                        {item.title}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="underline"
                          className="absolute h-[4px] w-full right-0 bottom-0 bg-primary"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </NavLink>
          )
      )}
    </div>
  )
}
