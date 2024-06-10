import { Modal } from '@mui/material'
import { Controller } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { BtnFiled } from '../Buttons/BtnFilled'

const ModalPassportNumber = ({
  hasObject,
  isOpen,
  handleClose,
  title,
  control,
  errors,
  handleSubmit,
  onSubmit,
  isBoshProrab,
  isExistedUser,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="w-full h-full flex justify-center items-center p-4"
    >
      <div className="w-full outline-none p-4 bg-white rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-[24px] leading-[30px] font-semibold text-center">{title}</div>
          <span className="input-label">Pasport raqami</span>
          <Controller
            control={control}
            name="passport_number"
            errors={errors}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ReactInputMask
                className={`px-5 uppercase text-sm border transition-all duration-500 rounded-md hover:border-primary focus-within:border-primary w-full h-10 ${
                  error ? 'border-red-400' : 'border-borderColor'
                }`}
                mask="aa 9999999"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors?.passport_number && <p className="text-red-600 text-[12px]">{errors.passport_number.message}</p>}
          {hasObject && !errors?.passport_number && (
            <p className="text-red-600 text-[12px]">Bu prorab boshqa obyektga biriktirilgan</p>
          )}
          {!isBoshProrab && !errors?.passport_number && (
            <p className="text-red-600 text-[12px]">Bu foydalanuvchi prorab emas</p>
          )}
          <BtnFiled className="w-full mt-4" type="submit">
            Davom etish
          </BtnFiled>
        </form>
      </div>
    </Modal>
  )
}

export default ModalPassportNumber
