import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { BtnFiled } from '../Buttons/BtnFilled'
import { CustomDatePicker } from '../CustomDatePicker'

export const DatePickerModal = ({
  open,
  onClose,
  title = 'Tashrif kunini belgilash',
  subtitle = 'Obyektga tashrif kuni tanlang',
  btnText = 'Tasdiqlash',
  fn = () => {},
  range,
  setRange,
  canClear,
  setCanClear,
  date,
  setDate,
  minDate = new Date(),
}) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose()
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="bg-white w-1/2 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between p-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <div className="w-full grid grid-cols-12 items-center gap-2 p-8 pt-0">
          <span className="input-label col-span-12">{subtitle}</span>
          <div className="col-span-12">
            <CustomDatePicker
              range={range}
              setRange={setRange}
              canClear={canClear}
              setCanClear={setCanClear}
              date={date}
              setDate={setDate}
              minDate={minDate}
            />
          </div>
          <div className="mt-4 col-span-12">
            <BtnFiled className="w-full" size="large" onClick={fn}>
              {btnText}
            </BtnFiled>
          </div>
        </div>
      </div>
    </Modal>
  )
}
