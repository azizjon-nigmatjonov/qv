import { useForm } from 'react-hook-form'
import { BtnFiled, BtnOutlined, Input } from '../../components'
import * as yup from 'yup'
import { validations } from '../../validations'
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver'
import useWindowSize from '../../hooks/useWindowSize'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useUser } from '../../services'
import { useRef, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { CircularProgress, IconButton, Modal } from '@mui/material'
import Slider from 'react-slick'
import { InfoIcon } from '../../assets/icons/icons'
import whatIsJshshir from '../../assets/images/whatisJshshir.png'
import TimeCounter from './timeCounter'
import StatusModal from '../../components/StatusModal'
export default function ForgotPassword({}) {
  const validationSchema1 = yup.object().shape({
    pinfl: validations.pinfl,
  })
  const validationSchema2 = yup.object().shape({
    sms: validations.sms,
  })
  const validationSchema3 = yup.object().shape({
    newPassword: yup
      .string()
      .required("To'ldirilishi shart maydon")
      .test('len', "Kamida 6 ta belgidan iborat bo'lishi kerak", (val) => val.length >= 6)
      .matches(/^\S+$/, "Bo'sh joy qoldirib bo'lmaydi"),
    repetedPassword: validations.mixed,
  })
  const resolver1 = useYupValidationResolver(validationSchema1)
  const resolver2 = useYupValidationResolver(validationSchema2)
  const resolver3 = useYupValidationResolver(validationSchema3)
  const { width } = useWindowSize()
  const navigate = useNavigate()
  const { updateUserActivatedMutation } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepetedPassword, setShowRepetedPassword] = useState(false)
  const [jshshirInfoOpen, setJshshirInfoOpen] = useState(false)
  const [timeIsOver, setTimeIsOver] = useState(false)
  const [waitingMinutes, setWaitingMinutes] = useState(1)
  const [counterKey, setCounterKey] = useState(0)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [statusModalStatus, setStatusModalStatus] = useState('')
  const [statusModalTitle, setStatusModalTitle] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const sliderRef = useRef(null)
  const [step, setStep] = useState(1)
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    watch: watch1,
    setError: setError1,
    formState: { errors: errors1 },
  } = useForm({ resolver: resolver1 })
  const {
    register: register2,
    setError: setError2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({ resolver: resolver2 })
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    setError: setError3,
    watch: watch3,
    formState: { errors: errors3 },
  } = useForm({ resolver: resolver3 })
  function scrollNext() {
    sliderRef.current.slickNext()
    setStep(step + 1)
  }
  const { checkUserPinQuery } = useUser({
    pin: watch1('pinfl'),
    checkUserPinProps: {
      enabled: watch1('pinfl')?.length === 14,
      onSuccess: (res) => {
        if (!res.data?.data?.is_exists) {
          setError1('pinfl', { type: 'manual', message: 'Ushbu JShShIR tizimda topilmadi' })
        } else {
          let string = res.data?.data?.phone.substring(0, 3) + ' ** *** ' + res.data?.data?.phone.substring(9, 13)
          setPhoneNumber(string)
        }
      },
    },
  })
  const { userCreateCodeMutation } = useUser({
    userCreateCodeProps: {
      onSuccess: (res) => {
        setWaitingMinutes(1)
        setCounterKey(counterKey + 1)
        setTimeIsOver(false)
        setIsLoading(false)
        if (step === 1) {
          scrollNext()
        }
      },
    },
  })
  const { userPhoneVerificationMutation } = useUser({
    userPhoneVerificationProps: {
      onSuccess: (res) => {
        setIsLoading(false)
        if (res.data?.data?.is_exist) {
          scrollNext()
        } else {
          setError2('sms', { type: 'manual', message: 'Kod noto`g`ri kiritildi' })
        }
      },
    },
  })
  const { updateUserPasswordMutation } = useUser({
    updateUserPasswordMutationProps: {
      onSuccess: (res) => {
        setIsLoading(false)
        setStatusModalStatus('success')
        setStatusModalTitle('Parol muvaffaqiyatli o`zgartirildi')
        setStatusModalOpen(true)
      },
      onError: (err) => {
        setIsLoading(false)
        setStatusModalStatus('error')
        setStatusModalTitle('Parolni o`zgartirishda xatolik yuz berdi')
        setStatusModalOpen(true)
      },
    },
  })
  function onSubmit1() {
    if (!checkUserPinQuery.data?.data?.data?.is_exists) {
      setError1('pinfl', { type: 'manual', message: 'Ushbu JShShIR tizimda topilmadi' })
    } else if (errors1.pinfl) {
      return
    } else if (checkUserPinQuery.data?.data?.data?.phone) {
      setIsLoading(true)
      userCreateCodeMutation.mutate({ phone: checkUserPinQuery.data?.data?.data?.phone })
    }
  }
  function onSubmit2(data) {
    setIsLoading(true)
    userPhoneVerificationMutation.mutate({ phone: checkUserPinQuery.data?.data?.data?.phone, code: data.sms })
  }
  function onSubmit3(data) {
    if (data.newPassword !== data.repetedPassword) {
      setError3('repetedPassword', {
        type: 'manual',
        message: 'Parollar mos kelmadi',
      })
    } else {
      setIsLoading(true)
      updateUserPasswordMutation.mutate({ password: data.newPassword, pinfl: watch1('pinfl') })
    }
  }

  const handleClick =
    step === 1
      ? handleSubmit1(onSubmit1)
      : step === 2
      ? handleSubmit2(onSubmit2)
      : step === 3 && handleSubmit3(onSubmit3)

  function handleResendSms() {
    userCreateCodeMutation.mutate({ phone: checkUserPinQuery.data?.data?.data?.phone })
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    draggable: false,
    lazyLoad: true,
    slidesToScroll: 1,
    adaptiveHeight: true,
  }
  console.log(watch3('newPassword'))
  return (
    <div className={`${width < 769 ? 'w-[100vw] px-3' : 'w-[60%]'} h-full flex flex-col justify-center`}>
      <h1 className={`font-[700] ${width < 769 ? 'text-[24px] mb-5' : 'text-[48px] mb-8'}`}>Parolni tiklash</h1>
      <Slider ref={sliderRef} {...settings}>
        <form onSubmit={(e) => e.preventDefault()}>
          <p className="text-[14px] text-[#5B6871] mb-6">
            JShShIR raqamingizni kiriting, biz sizga tasdiqlash kodini yuboramiz. Ushbu kodni kiritganingizdan so'ng siz
            yangi parol o'rnatishingiz mumkin.
          </p>
          <span className="input-label">
            <span className="float-left block mt-1">JShShIR </span>
            <IconButton aria-label="info" onClick={() => setJshshirInfoOpen(true)}>
              {' '}
              <InfoIcon />{' '}
            </IconButton>
          </span>
          <div className="relative">
            <Input
              initialErrorMessageMinHeigth
              placeholder="JSHSHIR kiriting"
              widthFull
              maxLength={14}
              register={register1}
              name="pinfl"
              errors={errors1}
            />
          </div>
        </form>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex align-middle">
            <p className="text-[14px] text-[#5B6871] mb-6">
              Kod <span className="font-bold">{phoneNumber}</span> telefon raqamiga yuborildi.
            </p>
          </div>
          <span className="input-label flex justify-between align-middle">
            Tasdiqlash kodi
            <BtnFiled
              className={`${timeIsOver ? 'block' : 'hidden'} text-[#0E73F6] px-0 outline-none`}
              color="transparent"
              onClick={handleResendSms}
            >
              Qayta yuborish
            </BtnFiled>
          </span>
          <Input
            initialErrorMessageMinHeigth
            placeholder="SMS"
            widthFull
            register={register2}
            disabled={timeIsOver}
            name="sms"
            errors={errors2}
            addonAfter={
              <TimeCounter intervalMinutes={waitingMinutes} counterKey={counterKey} setIsTimeOver={setTimeIsOver} />
            }
          />
        </form>
        <form onSubmit={(e) => e.preventDefault()}>
          <span className="input-label">Yangi parolni kiriting</span>
          <div className="relative">
            <Input
              initialErrorMessageMinHeigth
              placeholder="Parolni kiriting"
              widthFull
              register={register3}
              required
              name="newPassword"
              pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              type={showPassword ? 'text' : 'password'}
              errors={errors3}
            />

            <div className={`absolute  top-2 right-3 cursor-pointer`} onClick={() => setShowPassword((p) => !p)}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <span className={`input-label ${width < 769 ? 'mt-3' : 'mt-[24px]'}`}>Yangi parolni tasdiqlang</span>
          <div className="relative">
            <Input
              initialErrorMessageMinHeigth
              placeholder="Parolni kiriting"
              widthFull
              register={register3}
              name="repetedPassword"
              type={showRepetedPassword ? 'text' : 'password'}
              errors={errors3}
            />

            <div className={`absolute top-2 right-3 cursor-pointer`} onClick={() => setShowRepetedPassword((p) => !p)}>
              {showRepetedPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <div className="flex justify-end items-end"></div>
        </form>
      </Slider>
      <BtnFiled
        rightIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
        color="blue"
        size="large"
        className={`w-full ${width < 769 ? 'mt-auto py-3 px-0' : 'mt-[32px]'}`}
        onClick={handleClick}
      >
        Davom etish
      </BtnFiled>
      <Modal
        open={jshshirInfoOpen}
        onClose={() => setJshshirInfoOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6 bg-white rounded-lg w-[90vw] md:w-auto">
          <img src={whatIsJshshir} alt="what is jshshir" />
          <BtnFiled className="w-full mt-4" onClick={() => setJshshirInfoOpen(false)}>
            Tushunarli
          </BtnFiled>
        </div>
      </Modal>
      <StatusModal
        isOpen={statusModalOpen}
        handleClose={() => {
          setStatusModalOpen(false)
          navigate('/login')
        }}
        title={statusModalTitle}
        status={statusModalStatus}
      />
    </div>
  )
}
