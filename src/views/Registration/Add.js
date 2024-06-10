import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Slider from 'react-slick'

import Stepper from '../../components/Stepper'
import { BtnFiled, Header } from '../../components'
import ConfirmModal from '../../components/ConfirmModal'
import useRegistration from '../../services/useRegistration'
import FirstStep from './Steps/FirstStep'
import SecondStep from './Steps/SecondStep'
import ThirdStep from './Steps/ThirdStep'
import FourthStep from './Steps/FourthStep'
import FifthStep from './Steps/FifthStep'
import {
  ADMINISTRATIVE_ADMINISTRATOR_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  REGISTARTION_ARCHIEVE_STATUS_ID,
  REGISTRATION_CHECKED_STATUS_ID,
  REGISTRATION_SENT_STATUS_ID,
  REPUBLIC_APPARAT_ROLE_ID,
} from '../../settings/constants'
import { useObject, useUser } from '../../services'
import { EyeIcon } from '../../assets/icons'
import priceFormatter from '../../utils/priceFormatter'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import toast from 'react-hot-toast'
import { useRegistrationById } from '../../services/registration'
import { useGetLinearObjectById, usePatchLinearObject } from '../../services/linear-objects'
import { permissions } from '../../settings/permissions'
import { format } from 'date-fns'
import dateFormatter from '../../utils/dateFormatter'
import ShowFifthStep from './ShowFifthStep'

const RegistrationAdd = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { pathname, state } = useLocation()
  const { userId, regionId, roleId } = useSelector((state) => state.auth)
  const [registrationUsersData, setRegistrationUsersData] = useState([])
  const sliderRef = useRef(null)
  const [current, setCurrent] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(1) // don't pay attention to this it is just for api request
  const [activeRoleId, setActiveRoleId] = useState(0)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const steps = [
    { id: 1, text: "Arizachi haqida ma'lumot" },
    { id: 2, text: "Obyekt haqida ma'lumot" },
    { id: 3, text: "Nazorat haqida ma'lumot" },
    { id: 4, text: "Mas'ul shaxslar" },
    { id: 5, text: 'Xulosa' },
  ]

  const {
    register,
    control,
    formState: { errors },
    getValues,
    reset,
    setError,
  } = useForm()

  const isLinear = state?.isLinear || pathname.includes('linear')

  const { registration } = useRegistrationById({
    registrationProps: {
      enabled: id && !isLinear,
      // onSuccess: (res) => {
      //   const data = res.data.task.users.map((el) => ({
      //     pinfl: el.head_pinfl,
      //     passport: el.passpnm_data_series,
      //   }))
      //   registrationUsersMutation.mutate(data)
      // },
    },
    id,
  })

  const { getLinearObjectByIdQuery } = useGetLinearObjectById({
    getLinearObjectByIdQueryProps: {
      enabled: id && isLinear,
    },
    id,
  })

  const { updateMutation } = useRegistration({
    updateMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
    id,
  })

  const { users, registrationUsersMutation } = useUser({
    role_id: INSPEKTOR_BOSH_ROLE_ID + ',' + INSPEKTOR_PRASTOY_ROLE_ID + ',' + INSPEKTOR_YETAKCHI_ROLE_ID,
    statusId: '30165510-1d9d-4d6e-bcc5-6246af0cbc22',
    region_id: regionId,
    // district_id: districtId,
    offset: 1,
    limit: 1000,
    usersProps: {
      enabled: current === 4,
    },
    registrationUsersProps: {
      onSuccess: (res) => {
        setRegistrationUsersData(res.data?.data?.datas)
      },
    },
  })
  useEffect(() => {
    let data = []
    if (currentSlide === 4) {
      if (isLinear) {
        console.log(getLinearObjectByIdQuery.data?.task?.info_supervisory)
        data = getLinearObjectByIdQuery.data?.task?.info_supervisory?.map((el) => ({
          pinfl: el?.head_pinfl,
          passport: el?.passpnm_data_series,
        }))
      } else
        data = registration.data?.task?.users?.map((el) => ({
          pinfl: el?.head_pinfl,
          passport: el?.passpnm_data_series,
        }))
    }
    registrationUsersMutation.mutate({ datas: data })
  }, [currentSlide, registration.data?.task?.users, getLinearObjectByIdQuery.data?.task?.info_supervisory])

  const isReRegistration =
    (pathname.includes('history') && +registration.data?.task?.notification_type === 2) ||
    (pathname.includes('history') && +getLinearObjectByIdQuery.data?.task?.notification_type === 2)

  useEffect(() => {
    if (roleId === REPUBLIC_APPARAT_ROLE_ID && !isReRegistration) scrollToEl(5)
    else if (roleId === REPUBLIC_APPARAT_ROLE_ID && isReRegistration) scrollToEl(4)
    if (
      (registration.data?.status_id === REGISTRATION_CHECKED_STATUS_ID &&
        !pathname.includes('history') &&
        registration.data?.task?.task?.status !== 'not_active') ||
      (getLinearObjectByIdQuery.data?.status_id === REGISTRATION_CHECKED_STATUS_ID &&
        !pathname.includes('history') &&
        getLinearObjectByIdQuery.data?.task?.task?.status !== 'not_active')
    ) {
      scrollToEl(5)
    } else if (pathname.includes('notifications')) scrollToEl(5)
  }, [registration.data, getLinearObjectByIdQuery.data, pathname])

  useEffect(() => {
    if (registration.data?.task || getLinearObjectByIdQuery.data?.task) {
      const data = registration.data?.task || getLinearObjectByIdQuery.data?.task
      // ariza beruvchi fields
      // jismoniy
      reset({
        ...data,
        full_name: data?.full_name || data?.ind_fullname || '',
        passport_number: data?.passport_number || data?.ind_passport || '',
        permit_address: data?.permit_address || data?.ind_address || '',
        phone: data?.phone || data?.ind_phone || '',
        email: data?.email || data?.ind_email || '',
        name_building: data?.name_building || data?.object_name || '',
        region_id: data?.region_id || data?.region || '',
        district_id: data?.district_id || data?.district || '',
        category_object_dictionary: data?.category_object_dictionary || data?.object_category || '',
        description: registration.data?.inspector_commit || getLinearObjectByIdQuery.data?.inspector_commit || '',
        price_supervision_service: priceFormatter(data?.price_supervision_service),
        requisite: registration.data?.requisite || getLinearObjectByIdQuery.data?.requisite || '',
        object_status_id: registration.data?.object_status_id || getLinearObjectByIdQuery.data?.object_status_id || '',
        rejection_comment:
          registration.data?.rejection_comment || getLinearObjectByIdQuery.data?.rejection_comment || '',
        org_name: registration.data?.org_name || getLinearObjectByIdQuery.data?.org_name,
        org_inn: registration.data?.org_inn || getLinearObjectByIdQuery.data?.org_inn,
        user_fullname: registration.data?.person_fio || getLinearObjectByIdQuery.data?.person_fio,
        user_jshshir: registration.data?.person_inn || getLinearObjectByIdQuery.data?.person_inn,
        user_role: registration.data?.person_role || getLinearObjectByIdQuery.data?.person_role,
        clause: `MJTKning ${registration.data?.clause || getLinearObjectByIdQuery.data?.clause}-moddasi ${
          registration.data?.clause_substance || getLinearObjectByIdQuery.data?.clause_substance
        }-bandi`,
        clause_sum: registration.data?.clause_sum || getLinearObjectByIdQuery.data?.clause_sum,
        clause_date: dateFormatter(
          format,
          new Date(registration.data?.clause_date || getLinearObjectByIdQuery.data?.clause_date),
          'dd.MM.yyyy'
        ),
      })
    }
  }, [registration.data, getLinearObjectByIdQuery.data, activeRoleId, reset])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
    adaptiveHeight: true,
  }

  const controlFiles = [
    { id: 1, title: 'Qurilish laboratoriyasining mavjudligini tasdiqlovchi hujjat', key: 'confirming_laboratory' },
    {
      id: 2,
      title:
        "Buyurtmachining texnik nazorati, loyihalash tashkilotining mualliflik nazorati va pudratchining ichki nazorati tayinlash to'g'risidagi buyruq yoki shartnomaning nusxalari.",
      key: 'contract_file',
    },
    {
      id: 3,
      title: 'Buyurtmachining texnik nazorati mutaxassislarining sertifikatlari',
      key: 'specialists_certificates',
    },
    {
      id: 4,
      title: 'Qurilishni tashkil etish va ishlarni bajarishning tasdiqlangan loyihalari',
      key: 'organization_projects',
    },
  ]

  const scrollToPrev = () => {
    setCurrent((p) => p - 1)
    setCurrentSlide((p) => p - 1)
    window.scrollTo({ top: 0 })
    sliderRef.current.slickPrev()
  }
  const scrollToNext = () => {
    setCurrent((p) => p + 1)
    setCurrentSlide((p) => p + 1)
    window.scrollTo({ top: 0 })
    sliderRef.current.slickNext()
  }
  const scrollToEl = (step) => {
    setCurrent(step)
    setCurrentSlide(step)
    window.scrollTo({ top: 0 })
    sliderRef.current.slickGoTo(step - 1)
  }
  const scrollToPassedEl = (step) => {
    window.scrollTo({ top: 0 })
    setCurrentSlide(step)
    sliderRef.current.slickGoTo(step - 1)
  }

  const { linearObjectMutationMutation } = usePatchLinearObject({
    linearObjectMutationMutationProps: {
      onSuccess: () => {
        toast.success('Muvaffaqiyatli yuborildi')
        navigate(-1)
      },
    },
  })
  const onSubmit = (selectedUser) => {
    if (pathname.includes('linear')) {
      linearObjectMutationMutation.mutate({
        id: getLinearObjectByIdQuery.data?.id,
        inspector_id: selectedUser.value,
        is_accepted: false,
        status_id: REGISTRATION_SENT_STATUS_ID,
        user_id: userId,
      })
    } else {
      updateMutation.mutate({
        id: registration.data?.id,
        status_id: REGISTRATION_SENT_STATUS_ID,
        inspector_id: selectedUser.value,
        is_accepted: false,
        user_id: userId,
      })
    }
  }

  // const [canCheckUserId, setCanCheckUserId] = useState(false)

  const { checkObjectTaskIdQuery } = useObject({
    task_id: pathname.includes('linear')
      ? getLinearObjectByIdQuery.data?.task?.task_number
      : registration.data?.task?.task_number,
    checkObjectTaskIdQueryProps: {
      enabled: !!registration.data?.task?.task_number || !!getLinearObjectByIdQuery.data?.task?.task_number,
    },
  })
  const onSubmitAcceptReject = (comment) =>
    pathname.includes('linear')
      ? linearObjectMutationMutation.mutate({
          id: getLinearObjectByIdQuery.data?.id,
          is_accepted: false,
          rejection_comment: comment,
          user_id: userId,
          inspector_images: getLinearObjectByIdQuery.data?.inspector_images,
        })
      : updateMutation.mutate({
          id: registration.data?.id,
          is_accepted: false,
          rejection_comment: comment,
          user_id: userId,
          inspector_images: registration.data?.inspector_images,
        })

  const rejectionComment = !pathname.includes('linear')
    ? registration.data?.rejection_comment
    : getLinearObjectByIdQuery.data?.rejection_comment

  const inspectorComment = !pathname.includes('linear')
    ? registration.data?.inspector_commit
    : getLinearObjectByIdQuery.data?.inspector_commit

  const onSubmitAccept = () => {
    if (
      checkObjectTaskIdQuery.data?.exists &&
      (registration.data?.status === 'Qayta rasmiylashtirish' ||
        getLinearObjectByIdQuery.data?.status === 'Qayta rasmiylashtirish')
    ) {
      ;(pathname.includes('linear') ? linearObjectMutationMutation : updateMutation).mutate({
        id: pathname.includes('linear') ? getLinearObjectByIdQuery.data?.id : registration.data?.id,
        is_accepted: true,
        user_id: userId,
        inspector_images: pathname.includes('linear')
          ? getLinearObjectByIdQuery.data?.inspector_images
          : registration.data?.inspector_images,
      })
    } else if (
      !checkObjectTaskIdQuery.data?.exists &&
      (registration.data?.status === 'Qayta rasmiylashtirish' ||
        getLinearObjectByIdQuery.data?.status === 'Qayta rasmiylashtirish')
    ) {
      toast.error("Bunday eski ariza raqami tizimda mavjud emas! Shu sababli qabul qilib bo'lmaydi")
    } else {
      ;(pathname.includes('linear') ? linearObjectMutationMutation : updateMutation).mutate({
        is_accepted: true,
        user_id: userId,
        id: pathname.includes('linear') ? getLinearObjectByIdQuery.data?.id : registration.data?.id,
        inspector_images: pathname.includes('linear')
          ? getLinearObjectByIdQuery.data?.inspector_images
          : registration.data?.inspector_images,
      })
    }
  }

  const getSteps = () => {
    if (roleId === ADMINISTRATIVE_ADMINISTRATOR_ROLE_ID) return steps
    if (isReRegistration) return steps.slice(0, 4)
    else {
      return ((pathname.includes('linear')
        ? getLinearObjectByIdQuery.data?.status_id
        : registration.data?.status_id) === REGISTARTION_ARCHIEVE_STATUS_ID ||
        (pathname.includes('linear') ? getLinearObjectByIdQuery.data?.status_id : registration.data?.status_id) ===
          REGISTRATION_CHECKED_STATUS_ID) &&
        (pathname.includes('linear')
          ? getLinearObjectByIdQuery.data?.status_id
          : registration.data?.task?.task?.status) !== 'not_active'
        ? steps
        : steps.slice(0, 4)
    }
  }

  return (
    <div className="h-screen">
      <Header
        title={
          registration.data?.task?.application_number ||
          `Ariza raqami: ${getLinearObjectByIdQuery.data?.task?.task?.id || registration.data?.task?.task?.id}`
        }
        rightElement={
          pathname.includes('history') &&
          !permissions[roleId].includes('ADMINISTRATIVE/HISTORY') && (
            <BtnFiled leftIcon={<EyeIcon color="#fff" />} onClick={() => navigate('/inspectors')}>
              Obyektni ko&apos;rish
            </BtnFiled>
          )
        }
        backLink={-1}
      />
      <div className="sidebar-header-calc overflow-y-scroll">
        <div className="bg-white rounded-md p-6 mb-4">
          <Stepper steps={getSteps()} current={current} scrollToEl={scrollToPassedEl} />
        </div>
        <div className="h-fit overflow-hidden">
          <Slider className="overflow-auto" {...settings} ref={sliderRef}>
            <FirstStep
              registration={!pathname.includes('linear') ? registration : getLinearObjectByIdQuery}
              isYuridik={
                !pathname.includes('linear')
                  ? registration.data?.task.user_type?.toLowerCase() === 'j'
                  : getLinearObjectByIdQuery.data?.task.user_type?.toLowerCase() === 'j'
              }
              isAccepted={
                !pathname.includes('linear')
                  ? registration.data?.is_accepted
                  : getLinearObjectByIdQuery.data?.is_accepted
              }
              isHistory={pathname.includes('history')}
              scrollToNext={scrollToNext}
              register={register}
            />
            <SecondStep
              scrollToPrev={scrollToPrev}
              scrollToNext={scrollToNext}
              register={register}
              getValues={getValues}
              isLinear={isLinear}
              setError={setError}
              errors={errors}
            />
            <ThirdStep
              scrollToPrev={scrollToPrev}
              scrollToNext={scrollToNext}
              controlFiles={controlFiles}
              data={!pathname.includes('linear') ? registration.data?.task : getLinearObjectByIdQuery.data?.task}
            />
            <FourthStep
              isAdministration={roleId === ADMINISTRATIVE_ADMINISTRATOR_ROLE_ID}
              activeRoleId={activeRoleId}
              errors={errors}
              control={control}
              pathname={pathname}
              registrationUsersData={registrationUsersData}
              scrollToNext={scrollToNext}
              scrollToPrev={scrollToPrev}
              register={register}
              statusId={
                !pathname.includes('linear') ? registration.data?.status_id : getLinearObjectByIdQuery.data?.status_id
              }
              usersOption={users.data?.users}
              scrollToEl={scrollToEl}
              onSubmit={onSubmit}
              current={current}
              onSubmitAccept={onSubmitAccept}
              isDisabled={updateMutation.isLoading}
              setActiveRoleId={setActiveRoleId}
              rejectionComment={rejectionComment}
              inspectorComment={inspectorComment}
              showComments={
                <ShowFifthStep
                  registration={registration}
                  getLinearObjectByIdQuery={getLinearObjectByIdQuery}
                  updateMutation={updateMutation}
                  linearObjectMutationMutation={linearObjectMutationMutation}
                  register={register}
                  scrollToEl={scrollToEl}
                  handleOpen={handleOpen}
                  onSubmitAccept={onSubmitAccept}
                  onSubmitAcceptReject={onSubmitAcceptReject}
                />
              }
              users={isLinear ? getLinearObjectByIdQuery.data?.task?.info_supervisory : registration.data?.task?.users}
              registration={isLinear ? getLinearObjectByIdQuery : registration}
              onSubmitAcceptReject={onSubmitAcceptReject}
              showInspectorSelect={isReRegistration}
              isLinear={isLinear}
            />
            <ShowFifthStep
              registration={registration}
              getLinearObjectByIdQuery={getLinearObjectByIdQuery}
              updateMutation={updateMutation}
              linearObjectMutationMutation={linearObjectMutationMutation}
              register={register}
              scrollToEl={scrollToEl}
              handleOpen={handleOpen}
              onSubmitAccept={onSubmitAccept}
              onSubmitAcceptReject={onSubmitAcceptReject}
            />
          </Slider>
        </div>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        title="Ushbu obyektni bekor qilasizmi?"
        handleClose={handleClose}
        fn={() => onSubmitAcceptReject()}
      />
    </div>
  )
}

export default RegistrationAdd
