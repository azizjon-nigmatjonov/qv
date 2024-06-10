import { Modal } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useFieldArray, useForm } from 'react-hook-form'
import { BtnFiled } from '../Buttons/BtnFilled'
import { Input } from '../Input'
import { Select } from '../Select'

const ModalComment = ({ isOpen, handleClose, title, fn, btnText, required, violations, btnClassName, options }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      comments: violations?.map(() => ({ name: '' })),
    },
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'comments',
  })

  // useEffect(() => violations?.forEach(() => append({ name: '' })), [violations, append])

  const textareaStyle = {
    resize: 'none',
    overflow: 'auto',
    minHeight: '50px',
    maxHeight: '100px',
  }

  const onSubmit = (data) => fn(data)
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="w-2/5 bg-white rounded-md p-4 h-auto max-h-4/5 overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex justify-center items-center mb-4">
            <span className="text-2xl font-semibold">{title}</span>
            <span className="absolute top-1 right-4 cursor-pointer" onClick={handleClose}>
              <CloseOutlinedIcon />
            </span>
          </div>
          <div className="mb-4">
            {fields?.map((field, index) => {
              return (
                <div className="mb-2" key={index}>
                  <p className="input-label">{violations[index]?.title}</p>
                  {violations[index]?.tag === 'input' ? (
                    <Input
                      register={register}
                      required={true}
                      name={`comments.[${index}].name`}
                      type={violations[index]?.type || 'text'}
                      placeholder={violations[index]?.placeholder || 'izoh...'}
                      className="w-full"
                      wrapperClassName="w-[100%]"
                    />
                  ) : violations[index]?.tag === 'select' ? (
                    <Select options={options} isMulti={true} control={control} name={`comments.[${index}].name`} />
                  ) : (
                    <textarea
                      {...register(`comments.[${index}].name`, {
                        required: required,
                      })}
                      rows={4}
                      placeholder={violations[index]?.placeholder || 'izoh...'}
                      className="border p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary overflow-hidden"
                      style={textareaStyle}
                    />
                  )}
                </div>
              )
            })}

            {errors?.reason_text && (
              <div className="text-sm mt-1 text-red-400 font-medium">{errors.reason_text.message}</div>
            )}
          </div>

          <BtnFiled className={`w-full mt-4 ${btnClassName} `} type="submit">
            {btnText}
          </BtnFiled>
        </form>
      </div>
    </Modal>
  )
}

export default ModalComment
