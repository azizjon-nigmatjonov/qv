import { Modal } from '@mui/material'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { useUser } from '../../services'
import { BtnFiled } from '../Buttons/BtnFilled'
import * as yup from 'yup'
import { validations } from '../../validations'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { Link, useNavigate } from 'react-router-dom'

const CheckUserPassport = ({ isOpen, handleClose, id }) => {
  const navigate = useNavigate()

  const [isExistedUser, setIsExistedUser] = useState(false)

  const schema = yup.object({
    passport_number: validations.passport_number,
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      passport_number: '',
    },
    resolver: useYupValidationResolver(schema),
  })

  const { userCheckByPassport } = useUser({
    passport_number: watch('passport_number')?.toUpperCase().split(' ').join(''),
    checkUserByPassportProps: {
      enabled: !!id,
    },
  })
  const onSubmit = (data) => {
    userCheckByPassport.refetch()
    setIsExistedUser(true)
  }

  useEffect(() => {
    if (userCheckByPassport.data?.is_exist) {
      navigate('participants/add', {
        state: {
          create: true,
          data: userCheckByPassport.data,
        },
      })
    } else if (isExistedUser) {
      setIsExistedUser(!userCheckByPassport.data?.is_exist)
    }

    return () => {
      userCheckByPassport.remove()
    }
  }, [userCheckByPassport.data?.is_exist])

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
          <div className="mb-4 text-[24px] leading-[30px] font-semibold text-center">Passport</div>
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
          <BtnFiled className="w-full mt-4" type="submit">
            Davom etish
          </BtnFiled>
          {isExistedUser && (
            <div className="mt-4">
              <span className="mb-2 block">Bunday foydalanuvchi mavjud emas</span>
              <Link
                className="text-white bg-primary h-[36px] px-3 py-[6px] text-[14px] font-[500] rounded-[6px]"
                to="/employee-add"
                state={{ create: false }}
              >
                Yangi foydalanuvchi kiritish
              </Link>
            </div>
          )}
        </form>
      </div>
    </Modal>
  )
}

export default CheckUserPassport
