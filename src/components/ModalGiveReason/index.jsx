import { Modal } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { BtnFiled } from '../Buttons/BtnFilled'
import { useForm } from 'react-hook-form'
import { FileUpload } from '../Upload/FileUpload'
import CustomDayPicker from '../CustomDayPicker'

function ModalGiveReason({
  isOpen,
  deadline,
  setDeadline,
  modalKey,
  handleClose,
  maxDate,
  minDate,
  type = 'reason',
  title,
  fn,
  btnText = 'Yuborish',
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      images: [],
    },
  })

  const onSubmit = (data) => fn(data)

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="w-2/5 bg-white rounded-md p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex justify-center items-center mb-4">
            <span className="text-2xl font-semibold">{title}</span>
            <span className="absolute top-1 right-4 cursor-pointer" onClick={handleClose}>
              <CloseOutlinedIcon />
            </span>
          </div>
          <div className="mb-4">
            <textarea
              {...register('reason_text', {
                required: { value: modalKey === 'reject', message: "To'ldirilishi shart" },
              })}
              rows={4}
              placeholder="Izoh ... "
              className="border p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary overflow-hidden"
            />
            {errors?.reason_text && (
              <div className="text-sm mt-1 text-red-400 font-medium">{errors.reason_text.message}</div>
            )}
          </div>
          {type === 'reason' ? (
            <FileUpload
              showSmallPreview
              widthFull
              watch={watch}
              nameFile="file"
              nameImage="images"
              getValues={getValues}
              setValue={setValue}
              shape="rectangle"
            />
          ) : (
            modalKey === 'approve' && (
              <CustomDayPicker minDate={minDate} maxDate={maxDate} date={deadline} setDate={setDeadline} />
            )
          )}
          <BtnFiled className="w-full mt-4" type="submit">
            {btnText}
          </BtnFiled>
        </form>
      </div>
    </Modal>
  )
}

export default ModalGiveReason
