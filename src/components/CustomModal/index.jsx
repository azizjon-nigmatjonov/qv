import React from 'react'

export default function CustomModal({ open = false, onClose, children, bottomElements }) {
  return open ? (
    <div
      onClick={() => onClose()}
      className="fixed w-full h-full bg-[#47474787] flex align-middle justify-center top-0 left-0 overflow-auto z-[31]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-w-30 min-h-30 bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] touch-none"
      >
        {children}
        {!!bottomElements && <div className="border-t py-[10px] px-3">{bottomElements}</div>}
      </div>
    </div>
  ) : null
}
