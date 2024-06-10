import { Modal } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { BtnFiled } from '../Buttons/BtnFilled'
import { useState } from 'react'

export const CommentModal = ({
  isOpen,
  handleClose,
  title,
  btnText,
  btnClassName,
  onSubmit,
  required = true,
  withoutComment = false,
  children = '',
}) => {
  const [value, setValue] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="w-2/5 bg-white rounded-md p-4 max-h-4/5 overflow-auto min-h-[250px] flex flex-col">
        <form
          className="flex flex-col grow"
          onSubmit={(e) => {
            e.preventDefault()
            if (required) {
              if (value.trim()) onSubmit(value)
              else setIsInvalid(true)
            } else onSubmit(value)
          }}
        >
          <div className="relative flex justify-center items-center mb-4">
            <span className="text-2xl font-semibold max-w-[530px]">{title}</span>
            <span className="absolute top-1 right-4 cursor-pointer" onClick={handleClose}>
              <CloseOutlinedIcon />
            </span>
          </div>
          <div className="mb-4">
            {!withoutComment && (
              <>
                <textarea
                  rows={4}
                  placeholder="Izoh ... "
                  className="border p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary overflow-hidden"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                    setIsInvalid(false)
                  }}
                />

                {isInvalid && (
                  <div className="text-sm mt-1 text-red-400 font-medium">Kiritilishi shart bo'lgan maydon</div>
                )}
              </>
            )}
          </div>
          {children}

          <BtnFiled className={`w-full mt-4 ${btnClassName}`} type="submit" size={withoutComment ? 'large' : ''}>
            {btnText}
          </BtnFiled>
        </form>
      </div>
    </Modal>
  )
}
