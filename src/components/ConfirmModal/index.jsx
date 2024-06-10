import { Modal } from '@mui/material'
import { ExplationMarkIcon } from '../../assets/icons'
import { BtnFiled } from '../Buttons/BtnFilled'

export default function ConfirmModal({
  isOpen,
  title,
  handleClose,
  fn,
  fn2,
  oneButton = false,
  mobileView = false,
  icon,
  iconColor,
  isDisabled = false,
  yesNo = false,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className={`text-center rounded-xl bg-white p-8 ${mobileView ? 'w-5/6' : 'w-2/5'}`}>
        <div className="flex justify-center">
          {icon ? icon : <ExplationMarkIcon color={iconColor || '#2365eb'} className="text-center" />}
        </div>
        <p className={`leading-[28px] font-semibold ${mobileView ? 'text-base mb-4 mt-3' : 'text-lg mb-6 mt-4'}`}>
          {title}
        </p>
        {oneButton ? (
          <BtnFiled disabled={isDisabled} className="w-full h-[48px]" onClick={fn2}>
            Davom etish
          </BtnFiled>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <div
              className="text-base leading-5 font-semibold w-1/2 py-[14.5px] bg-[#E5E9EB] rounded-[8px] hover:bg-gray-300 duration-300 cursor-pointer"
              onClick={handleClose || fn2}
            >
              {yesNo ? 'Yoq' : 'Bekor qilish'}
            </div>
            <div
              className={`text-base text-white leading-5 font-semibold w-1/2 py-[14.5px] rounded-[8px] duration-300 cursor-pointer ${
                iconColor ? `bg-[${iconColor}] hover:bg-red-500` : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={fn}
            >
              {yesNo ? 'Ha' : 'Tasdiqlash'}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
