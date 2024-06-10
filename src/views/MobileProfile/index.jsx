import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { changeLanguage } from 'i18next'
import { useTranslation } from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { BtnFiled, Input, Select } from '../../components'
import ProfilePhoto from '../../assets/images/profile.png'
import { useUser } from '../../services'
import EnIcon from '../../assets/icons/En.svg'
import RuIcon from '../../assets/icons/Ru.svg'
import UzIcon from '../../assets/icons/Uzb.svg'
import ConfirmModal from '../../components/ConfirmModal'
import { PhotoSvg } from '../../assets/icons'
import { request } from '../../services/http-client'
import { logout } from '../../redux/actions/authActions'
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel'
import requestPhotoUpload from '../../services/requestPhotoUpload'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { validations } from '../../validations'
import CustomPhoneInput from '../../components/CustomPhoneInput'

const MobileProfile = () => {
  const { t } = useTranslation('common')
  const imgInputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userId, accessToken, accessTokenOneId } = useSelector((state) => state.auth)

  const { user, deleteUserPhotoMutation, updateUserMutation, deleteUserMutation } = useUser({
    id: userId,
    deleteUserPhotoProps: {
      onSuccess: () => {
        user.refetch()
        handleClose()
      },
    },
    createMutationProps: {
      onSuccess: () => {
        user.refetch()
        toast.success("Ma'lumotlar muvaffaqiyatli saqlandi", {
          duration: 3000,
        })
      },
    },
  })

  const logoutUser = () => {
    deleteUserMutation.mutate({ access_token: accessToken })
    if (accessTokenOneId) {
      request
        .post(
          `${process.env.REACT_APP_BASE_URL_ONE_ID}?grant_type=one_log_out&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET_KEY}&access_token=${accessTokenOneId}&scope=${process.env.REACT_APP_CLIENT_ID}`
        )
        .then((res) => {
          dispatch(logout())
          navigate('/login')
        })
    } else {
      dispatch(logout())
      navigate('/login')
    }
  }

  const [isOpen, setIsOpen] = useState(false)
  const [modalKey, setModalKey] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [progress, setProgress] = useState(0)
  const [showCurrentPassword, setShowCurrentPassword] = useState(true)
  const [showNewPassword, setShowNewPassword] = useState(true)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const schema = yup.object({
    phone: validations.phone,
    lang: validations.select,
  })

  const {
    register,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lang: {
        label: "O'zbekcha",
        value: 'uz',
      },
      phone: '',
      resolver: useYupValidationResolver(schema),
    },
  })

  const onSubmit = (data) =>
    updateUserMutation.mutate({
      address: data.address,
      name: data.name,
      middle_name: data.middle_name,
      surname: data.surname,
      phone: `+998${data.phone}`,
      photo_url: imageUrl,
      id: userId,
    })

  useEffect(() => {
    if (user.data) {
      const data = user.data
      setValue('full_name', `${data?.name} ${data?.middle_name} ${data?.surname}`)
      setValue('address', data?.address)
      setValue('role', data?.role_name)
      setImageUrl(user.data?.photo_url)
      setValue('phone', user.data?.phone?.slice(4))
    }
  }, [user.data, setValue])

  useEffect(() => {
    if (watch('lang')?.value) {
      changeLanguage(watch('lang').value)
    }
  }, [watch('lang')])

  const languageOptions = [
    {
      label: (
        <div className="flex gap-3 items-center">
          <span>
            <img src={UzIcon} alt="english flag" />
          </span>
          <span>O'zbekcha</span>
        </div>
      ),
      value: 'uz',
    },
    {
      label: (
        <div className="flex gap-3 items-center">
          <span>
            <img src={UzIcon} alt="uzbek flag" />
          </span>
          <span>Ўзбекча</span>
        </div>
      ),
      value: 'uz_cyrl',
    },
    {
      label: (
        <div className="flex gap-3 items-center">
          <span>
            <img src={EnIcon} alt="english flag" />
          </span>
          <span>Ingizcha</span>
        </div>
      ),
      value: 'en',
    },
    {
      label: (
        <div className="flex gap-3 items-center">
          <span>
            <img src={RuIcon} alt="english flag" />
          </span>
          <span>Русский</span>
        </div>
      ),
      value: 'ru',
    },
  ]

  return (
    <div className="px-4 py-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-4 rounded-md">
          <div className="mb-8 mx-auto relative w-[128px]">
            <div className="relative overflow-hidden">
              <img
                src={imageUrl ? `${process.env.REACT_APP_CDN_IMAGE_URL}/${imageUrl}` : ProfilePhoto}
                alt="profile"
                className="w-32 h-32 rounded-full mb-2"
              />
              {user.data?.photo_url && (
                <div
                  className="absolute z-[9px] bg-red-500 w-6 h-6 text-sm rounded-full top-1 left-1 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setModalKey('photo')
                    handleOpen()
                  }}
                >
                  <DeleteIcon htmlColor="white" fontSize="inherit" />
                </div>
              )}
            </div>

            <div className="text-blue-400 cursor-pointer text-sm leading-6" onClick={() => imgInputRef.current.click()}>
              {progress ? <LinearProgressWithLabel value={progress} /> : t('change.photo')}
            </div>
            <div className="absolute bg-red-500 top-0 left-0 w-full">
              <input
                onChange={(event) => requestPhotoUpload({ event, setProgress, onChange: setImageUrl })}
                type="file"
                ref={imgInputRef}
                hidden
              />
            </div>
          </div>
          <div>
            <span className="input-label">Ism-sharifi</span>
            <Input widthFull disabled register={register} name="full_name" />
            <span className="input-label mt-4">{t('address')}</span>
            <Input widthFull register={register} name="address" disabled />
            <span className="input-label mt-4">Ish joyi</span>
            <Input widthFull disabled register={register} name="name" />
            <span className="input-label mt-4">Lavozim</span>
            <Input widthFull disabled register={register} name="role" />
            <span className="input-label mt-4">Telefon</span>
            <CustomPhoneInput control={control} errors={errors} />
            <span className="input-label mt-4">Til</span>
            <Select control={control} name="lang" options={languageOptions} />
            <div className="relative">
              <span className="input-label mt-4">Joriy parol</span>
              <Input
                widthFull
                register={register}
                name="current_password"
                type={`${showCurrentPassword ? 'text' : 'password'}`}
              />
              <div
                className="absolute bottom-2 right-3 cursor-pointer"
                onClick={() => setShowCurrentPassword((p) => !p)}
              >
                {showCurrentPassword ? (
                  <VisibilityIcon htmlColor="#0E73F6" />
                ) : (
                  <VisibilityOffIcon htmlColor="#0E73F6" />
                )}
              </div>
            </div>
            <div className="relative">
              <span className="input-label mt-4">Yangi parol</span>
              <Input
                widthFull
                register={register}
                name="new_password"
                type={`${showNewPassword ? 'text' : 'password'}`}
              />
              <div className="absolute bottom-2 right-3 cursor-pointer" onClick={() => setShowNewPassword((p) => !p)}>
                {showNewPassword ? <VisibilityIcon htmlColor="#0E73F6" /> : <VisibilityOffIcon htmlColor="#0E73F6" />}
              </div>
            </div>
          </div>
          <div>
            <BtnFiled className="bg-[#F766591A] text-[#F76659] w-full mb-3 mt-6">Bekor qilish</BtnFiled>
            <BtnFiled
              className="w-full"
              disabled={updateUserMutation.isLoading}
              isLoading={updateUserMutation.isLoading}
              type="submit"
            >
              Saqlash
            </BtnFiled>
          </div>
          <ConfirmModal
            mobileView
            iconColor="#F76659"
            isOpen={isOpen}
            icon={modalKey === 'photo' ? <PhotoSvg /> : undefined}
            title={modalKey === 'photo' ? "Fotosuratni o'chirmoqchimisiz?" : 'Tizimdan chiqmoqchimisiz?'}
            handleClose={handleClose}
            fn={() => (modalKey === 'photo' ? deleteUserPhotoMutation.mutate({ id: userId }) : logoutUser())}
          />
        </div>
      </form>
    </div>
  )
}

export default MobileProfile
