import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ReactInputMask from 'react-input-mask'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import VerificationInput from 'react-verification-input'
import * as yup from 'yup'

import { BtnFiled, Input, Select } from '../../../components'
import CustomPhoneInput from '../../../components/CustomPhoneInput'
import { useYupValidationResolver } from '../../../hooks/useYupValidationResolver'
import { useObject, useUser } from '../../../services'
import { validations } from '../../../validations'
import { useDistrict } from '../../../services'
import { useRef } from 'react'
const MobileProrabAdd = () => {
  const { userId, regionId, districtId } = useSelector((state) => state.auth)
  const { id, passport_number } = useParams()
  const navigate = useNavigate()
  const [userExists, setUserExists] = useState(false)
  const [showOtp, setshowOtp] = useState(false)
  const [values, setValues] = useState({})
  const [code, setCode] = useState('')
  const params = useParams()
  const { state } = useLocation()

  const schema = yup.object({
    pinfl: validations.pinfl,
    nps: validations.pinfl,
    name: validations.string,
    middle_name: validations.string,
    surname: validations.string,
    passport_number: validations.string,
    district_id: validations.select,
    phone: validations.phone,
  })

  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pinfl: '',
      nps: '',
      name: '',
      middle_name: '',
      district_id: '',
      surname: '',
      passport_number: '',
      phone: '',
    },
    resolver: useYupValidationResolver(schema),
  })

  const { objectParticipantsMutation } = useObject({
    craeteObjectParticipantsProps: {
      onSuccess: () => {
        navigate(`/m/objects/${id}`)
        toast.success('Prorab muvafaqqiyatli yaratildi')
      },
    },
  })
  const { userByPassport } = useUser({
    passport_number: passport_number,
    userByPassportProps: {
      enabled: true,
      onSuccess: (res) => {
        if (res.data?.is_exist) {
          //inputlarni disabled qib qoyishim kerak
        }
      },
    },
  })
  console.log('userByPassport', userByPassport)
  const { userCheckUserVerification, checkUserPinQuery } = useUser({
    phone: watch('phone'),
    checkUserVerificationProps: {
      enabled: watch('phone').length === 9,
    },
    pin: watch('pinfl'),
    checkUserPinProps: {
      enabled: !watch('pinfl').match('_') && watch('pinfl').length === 14 && !userByPassport.data?.is_exist,
    },
  })

  const { districts } = useDistrict({
    regionId: state?.regionId,
  })

  useEffect(() => {
    if (userByPassport?.data?.is_exist) {
      setUserExists(true)
      const body = {
        ...userByPassport?.data,
        district_id: { label: userByPassport?.data?.district?.uz_name, value: userByPassport?.data?.district.id },
        phone:
          userByPassport?.data?.phone?.length > 12
            ? userByPassport?.data?.phone?.slice(4)
            : userByPassport?.data?.phone?.slice(3),
      }
      reset(body)
    }
  }, [userByPassport?.data, reset, districts.data?.districts])
  const { user, userCreateCodeMutation, userPhoneVerificationMutation, createMutation } = useUser({
    id: userId,
    userPhoneVerificationProps: {
      onSuccess: (data) => {
        if (data.data?.data?.is_exist) {
          createMutation.mutate({
            ...values,
            active: 1,
            diplom: '',
            expires_at: `${new Date().getFullYear() + 1}-${new Date().getMonth() + 1}-01`,
            objective: '',
            organization_name: user.data?.organization_name,
            login: passport_number,
            passport_number,
            password: '1234567',
            district_id: values.district_id?.value,
            status: true,
            phone: '+998' + values.phone,
            role_id: '5e4fe86a-adc5-4535-b586-264061cafcb5',
            client_type_id: '090b5de7-c9f3-4fcb-926a-9cdb0d090665',
            region_id: regionId,
            status_id: '30165510-1d9d-4d6e-bcc5-6246af0cbc22',
            project_id: 'e04766bc-3228-4cd9-bd22-09e3fa27a6be',
            company_id: '50e3b335-aeeb-40df-b5ef-641d4f236134',
            user_type_id: 'bd534c9a-f73e-46fd-b407-7742ec97caf0',
            client_platform_id: '7d4a4c38-dd84-4902-b744-0488b80a4c01',
          })
        } else {
          toast.error('OTP kod xato')
        }
      },
    },
    createMutationProps: {
      onSuccess: (data) => {
        objectParticipantsMutation.mutate({
          object_id: id,
          role_id: data?.role_id,
          status: true,
          user_id: data?.id,
        })
      },
    },
    userCreateCodeProps: {
      onSuccess: () => {
        setshowOtp(true)
        toast.success('Kiritilgan telefon raqamiga kod yuborildi')
      },
    },
  })

  const onSubmit = (data) => {
    if (userExists) {
      objectParticipantsMutation.mutate({
        object_id: id,
        role_id: userByPassport?.data?.role_id,
        status: true,
        user_id: userByPassport?.data?.id,
      })
    } else {
      userCreateCodeMutation.mutate({
        phone: '+998' + data.phone,
      })
      submitButtonRef.current?.blur()
      setValues({ ...data })
    }
  }

  const canContinue = userCheckUserVerification.isLoading || userCheckUserVerification.isFetching
  // ||    userCheckUserVerification.data?.data?.isExist

  useEffect(() => {
    const serie = passport_number?.slice(0, 2)
    const number = passport_number?.slice(2)
    setValue('passport_number', serie + ' ' + number)
  }, [passport_number, setValue])

  const submitButtonRef = useRef()

  return (
    <div className="p-4 mobile-header-calc">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        {showOtp ? (
          <div className="mt-[56px] flex flex-col justify-between h-5/6">
            <div>
              <span className="input-label mb-2">SMS kodni kiriting</span>
              <VerificationInput
                onChange={(e) => setCode(e)}
                length={4}
                validChars="0-9"
                classNames={{
                  container: 'w-[260px] gap-3',
                  character:
                    'rounded-md border-none bg-white text-[17px] leading-[22px] font-semibold flex justify-center items-center w-[56px] h-[56px]',
                  characterInactive: 'character--inactive',
                  characterSelected: 'character--selected',
                }}
              />
            </div>
            <div>
              <BtnFiled
                disabled={!(code?.length === 4 && !user.isLoading)}
                className="w-full h-12"
                type="button"
                onClick={() =>
                  userPhoneVerificationMutation.mutate({
                    phone: userCreateCodeMutation.data.data.phone,
                    code,
                  })
                }
              >
                Login parol yuborish
              </BtnFiled>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-md">
              <p className="p-4 border-b leading-[26px] font-bold">Shaxsiy ma'lumotlar</p>
              <div className="p-4">
                <span className="input-label">PINFL</span>
                <Controller
                  control={control}
                  name="pinfl"
                  errors={errors}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <ReactInputMask
                      className={`px-5 text-sm border transition-all duration-500 rounded-md hover:border-primary focus-within:border-primary w-full h-10 ${
                        error ? 'border-red-400' : 'border-borderColor'
                      }`}
                      mask="99999999999999"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.pinfl && <p className="text-red-600 text-[12px]">{errors.pinfl.message}</p>}
                {checkUserPinQuery.data?.data?.data?.is_exists && (
                  <p className="text-red-600 text-[12px]">Bu PINFL egasi tizimda mavjud. Boshqa PINFL kiriting.</p>
                )}
                <span className="input-label mt-4">Familiyasi</span>
                <Input widthFull errors={errors} register={register} name="surname" />
                <span className="input-label mt-4">Ism</span>
                <Input widthFull errors={errors} register={register} name="name" />
                <span className="input-label mt-4">Otasining ismi</span>
                <Input widthFull errors={errors} register={register} name="middle_name" />
                <span className="input-label mt-4">Tuman</span>
                <Select
                  options={districts?.data?.districts?.map((item) => ({
                    label: item.uz_name,
                    value: item.id,
                  }))}
                  errors={errors}
                  name="district_id"
                  control={control}
                />
                <span className="input-label mt-4">INPS</span>
                <Controller
                  control={control}
                  name="nps"
                  errors={errors}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <ReactInputMask
                      className={`px-5 text-sm border transition-all duration-500 rounded-md hover:border-primary focus-within:border-primary w-full h-10 ${
                        error ? 'border-red-400' : 'border-borderColor'
                      }`}
                      mask="99999999999999"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.nps && <p className="text-red-600 text-[12px]">{errors.nps.message}</p>}
                <span className="input-label mt-4">Passport raqami</span>
                <Input widthFull register={register} name="passport_number" disabled errors={errors} />
                <span className="input-label mt-4">Telefon raqami</span>
                <CustomPhoneInput control={control} errors={errors} />
                {/* {userCheckUserVerification.data?.data?.isExist && (
                  <span className="text-red-500 text-xs">Bunday telefon raqam mavjud.</span>
                )} */}
              </div>
            </div>
            <div className="mt-6">
              <BtnFiled color="" className="mb-3 w-full h-12 bg-[#F766591A] text-[#F76659]">
                Bekor qilish
              </BtnFiled>
              <BtnFiled
                disabled={canContinue || checkUserPinQuery.data?.data?.data?.is_exists}
                ref={submitButtonRef}
                className="w-full h-12"
                type="submit"
              >
                Davom etish
              </BtnFiled>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default MobileProrabAdd
