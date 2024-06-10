import { useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '../../../assets/icons'
import { IconButton } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

export default function Accardion({ children, title }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="mt-4 bg-white rounded-md">
      <div className=" py-[14px] px-4 text-[18px] font-semibold border-b flex justify-between items-center">
        <span>{title}</span>
        <IconButton onClick={() => setExpanded((p) => !p)} size="small" sx={{ width: 24, height: 24, padding: 0 }}>
          {expanded ? (
            <ArrowUpIcon className="w-8 h-8" color="#6E8BB7" />
          ) : (
            <ArrowDownIcon className="w-8 h-8" color="#6E8BB7" />
          )}
        </IconButton>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="p-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'initial' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
