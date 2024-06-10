import { changeLanguage } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import DeleteIcon from '@mui/icons-material/Delete'

import ProfilePhoto from '../../assets/images/profile.png'
import { BtnFiled, BtnOutlined, Card, FileUpload, Header, Input, Select } from '../../components'
import ConfirmModal from '../../components/ConfirmModal'
import { logout } from '../../redux/actions/authActions'
import { useUser } from '../../services'
import {
  KADRLAR_BOLIMI_BOSHLIGI_ROLE_ID,
  KADRLAR_BOLIMI_BOSH_MUTAXASSIS_ROLE_ID,
  KADRLAR_BOLIMI_YETAKCHI_MUTAXASSIS_ROLE_ID,
} from '../../settings/constants'
import requestPhotoUpload from '../../services/requestPhotoUpload'
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel'
import { LeftFromSystemIcon, PhotoSvg, SaveIcon } from '../../assets/icons'
import { request } from '../../services/http-client'
import MobileSkleton from '../../components/MobileSkleton'
import CustomPhoneInput from '../../components/CustomPhoneInput'
import languageOptions from '../../settings/languageOptions'
import AbsentForm from '../../forms/Employee/AbsentForm'
import ChangesModalTable from '../../components/ChangesModalTable'
import { absentHead, positionHead } from '../../forms/Employee/tableData'
import { permissions } from '../../settings/permissions'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import { validations } from '../../validations'

export default function Profile() {
  const imgInputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation('common')
  const { roleId, userId, accessToken, accessTokenOneId } = useSelector((state) => state.auth)

  const [imageUrl, setImageUrl] = useState('')
  const [modalKey, setModalKey] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(false)
  const [isOpenChangesModal, setIsOpenChangesModal] = useState(false)
  const [changesTable, setChangesTable] = useState({})
  const [absentRange, setAbsentRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      key: 'selection',
    },
  ])
  const [tableKey, setTableKey] = useState('')

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleOpenChangesModal = () => setIsOpenChangesModal(true)
  const handleCloseChangesModal = () => setIsOpenChangesModal(false)

  const isKadrlar =
    roleId === KADRLAR_BOLIMI_BOSHLIGI_ROLE_ID ||
    roleId === KADRLAR_BOLIMI_BOSH_MUTAXASSIS_ROLE_ID ||
    roleId === KADRLAR_BOLIMI_YETAKCHI_MUTAXASSIS_ROLE_ID

  const showFiles = permissions[roleId]?.includes('PROFILE/FILES')
  const profileExpanded = permissions[roleId]?.includes('PROFILE/EXPANDED')

  const schema = yup.object({
    phone: validations.phone,
    lang: validations.select,
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      lang: {
        label: "O'zbekcha",
        value: 'uz',
      },
      phone: '',
    },
    resolver: useYupValidationResolver(schema),
  })

  const {
    updateUserMutation,
    user,
    userRoleLogs,
    userStatuses,
    userStatusLogs,
    deleteUserMutation,
    deleteUserPhotoMutation,
  } = useUser({
    deleteUserPhotoProps: {
      onSuccess: () => {
        user.refetch()
        handleClose()
      },
    },
    id: userId,
    userStatusesProps: {
      enabled: profileExpanded,
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

  useEffect(() => {
    if (tableKey === 'absent') {
      setChangesTable({
        title: "Ishga kelmaganlik haqida ma'lumotlar tarixi",
        body: userStatusLogs.data?.user_status_logs,
        isLoading: userStatusLogs.isLoading,
        head: absentHead,
      })
    }
    if (tableKey === 'role') {
      setChangesTable({
        title: "Lavozim oshganligi haqida ma'lumotlar tarixi",
        body: userRoleLogs.data?.user_role_list,
        isLoading: userRoleLogs.isLoading,
        head: positionHead,
      })
    }
  }, [userStatusLogs.data, userRoleLogs.data, tableKey])

  useEffect(() => {
    if (user.data) {
      const {
        nps,
        name,
        phone,
        address,
        middle_name,
        surname,
        role_name,
        role_id,
        photo_url,
        organization_name,
        objective,
        diplom,
        login,
        district,
        client_type_name,
      } = user.data

      setValue('name', `${name}`)
      setValue('middle_name', `${middle_name ?? ''}`)
      setValue('surname', `${surname ?? ''}`)
      setValue('phone', `${phone?.length === 13 ? phone?.slice(4) : phone?.slice(3)}`)
      setValue('address', `${address ?? ''}`)
      setImageUrl(photo_url)
      setValue('organization_name', organization_name)
      setValue('role_id', [
        {
          label: role_name,
          value: role_id,
        },
      ])
      setValue('nps', nps)
      setValue('diplom', diplom)
      setValue('objective', objective)
      setValue('login', login)
    }
  }, [user.data, setValue])

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
    if (watch('lang')?.value) {
      changeLanguage(watch('lang').value)
    }
  }, [watch('lang')])

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

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <Header
          title={t('personal.cabinet')}
          backLink={-1}
          rightElement={
            <div className="flex items-center gap-[12px]">
              <BtnOutlined onClick={() => navigate(-1)} color="red">
                Bekor qilish
              </BtnOutlined>
              <BtnFiled
                color="blue"
                leftIcon={<SaveIcon />}
                disabled={updateUserMutation.isLoading}
                type="submit"
                isLoading={updateUserMutation.isLoading}
              >
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        {user.isLoading ? (
          <div className="flex gap-4 p-4">
            <div className="w-full">
              <MobileSkleton />
            </div>
            <div className="w-full">
              <MobileSkleton rows={profileExpanded ? 4 : 1} />
            </div>
          </div>
        ) : (
          <div className="sidebar-header-calc p-4 grid grid-cols-12 gap-4">
            <Card
              title={t('overall.info')}
              className="col-span-6 overflow-visible h-fit"
              bodyClassName="flex flex-col gap-4"
              rightElement={
                <BtnFiled
                  onClick={() => {
                    setModalKey('logout')
                    handleOpen()
                  }}
                  color="red"
                  leftIcon={<LeftFromSystemIcon />}
                >
                  {t('left.from.system')}
                </BtnFiled>
              }
            >
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 relative w-[128px]">
                  <div className="relative overflow-hidden">
                    <img
                      src={imageUrl ? `${process.env.REACT_APP_CDN_IMAGE_URL}/${imageUrl}` : ProfilePhoto}
                      alt="profile"
                      className="w-32 h-32 rounded-full mb-2"
                    />
                    {user.data?.photo_url && (
                      <div
                        className="absolute z-10 bg-red-500 w-6 h-6 text-sm rounded-full top-1 left-1 flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setModalKey('photo')
                          handleOpen()
                        }}
                      >
                        <DeleteIcon htmlColor="white" fontSize="inherit" />
                      </div>
                    )}
                  </div>

                  <div
                    className="text-blue-400 cursor-pointer text-sm leading-6"
                    onClick={() => imgInputRef.current.click()}
                  >
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
                <div className="col-span-9 ml-10">
                  {isKadrlar && (
                    <div className="mb-4">
                      <span className="input-label mb-px">PINFL</span>
                      <Input widthFull defaultValue="65198498132136" register={register} name="pinfl" />
                    </div>
                  )}
                  <div className="mb-4">
                    <span className="input-label mb-px">Familiyasi</span>
                    <Input widthFull disabled register={register} name="surname" />
                  </div>
                  <div className="mb-4">
                    <span className="input-label mb-px">Ismi</span>
                    <Input widthFull disabled register={register} name="name" />
                  </div>
                  <div className="mb-4">
                    <span className="input-label mb-px">Otasining ismi</span>
                    <Input widthFull disabled register={register} name="middle_name" />
                  </div>
                  <div className="mb-4">
                    <span className="input-label mb-px">Manzil</span>
                    <Input widthFull register={register} name="address" disabled />
                  </div>
                  <div className="mb-4">
                    <span className="input-label mb-px">Ish joyi</span>
                    <Input widthFull disabled register={register} name="organization_name" />
                  </div>
                  <div className="mb-4">
                    <span className="input-label mb-px">Lavozim</span>
                    <Select name="role_id" control={control} options={[]} disabled />
                  </div>
                  <div className="mb-4">
                    <span className="input-label mb-px">INPS</span>
                    <Input widthFull register={register} name="nps" disabled />
                  </div>
                  {showFiles && (
                    <>
                      <div className="mb-4">
                        <span className="input-label mb-px">Passport</span>
                        <FileUpload
                          disabled
                          shape="input"
                          register={register}
                          setValue={setValue}
                          nameFile="passport"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
            <div className="col-span-6">
              <Card className="h-fit overflow-visible mb-4" title={t('settings')}>
                <div className="mb-4">
                  <span className="input-label mb-px">Telefon</span>
                  <CustomPhoneInput control={control} errors={errors} />
                </div>
                <div className="mb-4">
                  <span className="input-label mb-px">Tizim tili</span>
                  <Select control={control} name="lang" errors={errors} options={languageOptions} />
                </div>
                <div className="mb-4">
                  <span className="input-label mb-px">Login</span>
                  <Input widthFull register={register} name="login" disabled />
                </div>
              </Card>
              {profileExpanded && (
                <>
                  <AbsentForm
                    showBtn={false}
                    disabled
                    setAbsentRange={setAbsentRange}
                    absentRange={absentRange}
                    register={register}
                    userStatuses={userStatuses}
                    control={control}
                    setTableKey={setTableKey}
                    handleOpen={() => handleOpenChangesModal()}
                    userStatusLogs={userStatusLogs}
                  />
                </>
              )}
            </div>
            <ConfirmModal
              iconColor="#F76659"
              isOpen={isOpen}
              icon={modalKey === 'photo' ? <PhotoSvg /> : undefined}
              title={modalKey === 'photo' ? "Fotosuratni o'chirmoqchimisiz?" : 'Tizimdan chiqmoqchimisiz?'}
              handleClose={handleClose}
              fn={() => (modalKey === 'photo' ? deleteUserPhotoMutation.mutate({ id: userId }) : logoutUser())}
            />
            <ChangesModalTable
              isOpen={isOpenChangesModal}
              handleClose={handleCloseChangesModal}
              title={changesTable.title}
              isLoading={changesTable.isLoading}
              body={changesTable.body}
              head={changesTable.head}
            />
          </div>
        )}
      </form>
    </div>
  )
}
