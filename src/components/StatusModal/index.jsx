import { Modal } from '@mui/material'
import { ExplationMarkIcon } from '../../assets/icons'
import { BtnFiled } from '../Buttons/BtnFilled'
import { CheckCircleIcon } from '../../assets/icons'
import { CancelOutlined } from '@mui/icons-material'
import WarningIcon from '@mui/icons-material/Warning'
import { BtnOutlined } from '../Buttons/BtnOutlined'

export default function StatusModal({
  isOpen,
  title,
  handleClose,
  handleClickOk = () => handleClose(),
  mobileView = false,
  status, //success, error, warning
  icon,
  iconColor,
  cancelable = false,
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
          {icon ? (
            icon
          ) : status === 'success' ? (
            <CheckCircleIcon />
          ) : status === 'error' ? (
            <CancelOutlined color="error" fontSize="large" sx={{ width: 88, height: 88 }} />
          ) : status === 'warning' ? (
            <WarningIcon color="warning" fontSize="large" sx={{ width: 88, height: 88 }} />
          ) : (
            <ExplationMarkIcon color={iconColor || '#2365eb'} className="text-center" />
          )}
        </div>
        <p className={`leading-[28px] font-semibold ${mobileView ? 'text-base mb-4 mt-3' : 'text-lg mb-6 mt-4'}`}>
          {title}
        </p>
        <div className=" w-full flex justify-center gap-4">
          {cancelable && (
            <BtnOutlined
              className="w-1/3 h-[48px] bg-[#E5E9EB] outline-none focus:outline-none"
              leftIcon=""
              onClick={() => handleClose()}
            >
              Yo`q
            </BtnOutlined>
          )}
          <BtnFiled className={`${cancelable ? 'w-1/3' : 'w-1/2 m-auto'} h-[48px]`} onClick={() => handleClickOk()}>
            Ha
          </BtnFiled>
        </div>
      </div>
    </Modal>
  )
}
