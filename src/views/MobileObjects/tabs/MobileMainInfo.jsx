import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { ArrowDownIcon, ArrowUpIcon, BankIcon } from '../../../assets/icons'
import { BtnFiled, Card, Input, Tag } from '../../../components'
import CustomMap from '../../../components/CustomMap'
import ModalPassportNumber from '../../../components/ModalPassportNumber'
import { useObject, useUser } from '../../../services'
import phoneNumberFormatter from '../../../utils/phoneNumberFormatter'
import { validations } from '../../../validations'
import { useYupValidationResolver } from '../../../hooks/useYupValidationResolver'
import { AuthUrl, request } from '../../../services/http-client'
import { BOSH_PRORAB_ROLE_ID, ICHKI_NAZORATCHI_ROLE_ID } from '../../../settings/constants'
import dateFormatter from '../../../utils/dateFormatter'
import { useSelector } from 'react-redux'
import Accardion from '../components/Accardion'

const MobileMainInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register,reset, setValue } = useForm()

  const { roleId } = useSelector((state) => state.auth)

  const [expandeParticipantBox, setExpandedParticipantBox] = useState(false)
  const [expandeBlockBox, setExpandedBlockBox] = useState(false)
  const [shouldCallApi, setShouldCallApi] = useState(false)
  const [showParicipantHistory, setShowParicipantHistory] = useState(false)
  const [isExistedUser, setIsExistedUser] = useState(false)
  const [hasObject, setHasObject] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [passportData, setPassportData] = useState(null)
  const [isBoshProrab, setIsBoshProrab] = useState(true)
  const schema = yup.object({
    passport_number: validations.passport_number,
  })

  const {
    control: control2,
    formState: { errors: errors2 },
    watch: watch2,
    handleSubmit: handleSubmit2,
  } = useForm({
    defaultValues: {
      passport_number: '',
    },
    resolver: useYupValidationResolver(schema),
  })

  // const { userByPassport } = useUser({
  //   passport_number: watch2('passport_number').toUpperCase().split(' ').join(''),
  //   userByPassportProps: {
  //     enabled: shouldCallApi,
  //   },
  // })
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const getUserByPassport = (params) =>
    request.get(`${AuthUrl}/user-by-passport`, { params }).then((res) => res.data.data)

  const { object, userHistoryByObjectId } = useObject({ id, showParicipantHistory })

  useEffect(() => {
    if (errors2?.passport_number) {
      setShouldCallApi(false)
    }
  }, [errors2])
  useEffect(() => {
    const data = {
      ...object?.data,
      region: object?.data?.region?.uz_name,
      district: object?.data?.district?.uz_name,
    }
    reset(data)
  }, [object.data])

  const onSubmit = (data) => {
    // userByPassport.refetch()
    getUserByPassport({ 'passport-number': data.passport_number.toUpperCase().split(' ').join('') })
      .then((res) => {
        if (res?.is_exist) {
          setIsExistedUser(!!res?.is_exist)
          if (res?.role_id === BOSH_PRORAB_ROLE_ID) {
            if (!res?.hasObject) {
              navigate(`prorab-add/${watch2('passport_number').toUpperCase().split(' ').join('')}`)
            } else {
              setHasObject(!!res.hasObject)
            }
          } else {
            setIsBoshProrab(false)
          }
        } else {
          navigate(`prorab-add/${watch2('passport_number').toUpperCase().split(' ').join('')}`, {
            state: { regionId: object.data?.region?.id },
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    setShouldCallApi(true)
  }

  useEffect(() => {
    setIsExistedUser(false)
    setIsBoshProrab(true)
    setHasObject(false)
  }, [watch2('passport_number')])

  return (
    <div className="p-4 bg-[#f6f6f6] mobile-header-filter-calc">
      <Card title={object.data?.name} rightElement={<Tag value="Jarayonda" color="yellow" />}>
        <span className="input-label">Obyekt nomi</span>
        <Input widthFull disabled register={register} name="name" />
        <span className="input-label mt-4">Viloyat</span>
        <Input widthFull disabled register={register} name="region" />
        <span className="input-label mt-4">Tuman</span>
        <Input widthFull disabled register={register} name="district" />
        <span className="input-label mt-4">Manzil</span>
        <Input widthFull disabled register={register} name="address" />
        <span className="input-label mt-4">Murakkablik toifasi</span>
        <Input widthFull disabled register={register} name="difficulty_category" />
        <span className="input-label mt-4">Qurilish montaj ishlarining turi</span>
        <Input widthFull disabled register={register} name="construction_type" />
        <span className="input-label mt-4">Qurilish-montaj ishlarining qiymati</span>
        <Input widthFull disabled register={register} name="construction_cost" />
        <span className="input-label mt-4">Davlat ekspertiza organi</span>
        <Input widthFull disabled register={register} name="technical_supervisor" />
      </Card>
      <Card title="Obyekt joylashuvi" className="mt-4">
        <CustomMap />
      </Card>
      <Accardion title="Tashkilotlarning xulosasi">
        <span className="input-label">Arxitektura-shaharsozlik kengashi bayonnomasining raqami</span>
        <Input widthFull disabled register={register} name="number_protocol" />
        <span className="input-label mt-4">Arxitektura-shaharsozlik kengashi bayonnomasining sanasi</span>
        <Input widthFull disabled register={register} name="date_protocol" />
        <span className="input-label mt-4">Davlat ekspertizasi organi</span>
        <Input widthFull disabled register={register} name="name_expertise" />
        <span className="input-label mt-4">Davlat ekspertiza organining ijobiy xulosasining raqami</span>
        <Input widthFull disabled register={register} name="positive_opinion_number" />
        <span className="input-label mt-4">Davlat ekspertiza organining ijobiy xulosasining sanasi</span>
        <Input widthFull disabled register={register} name="positive_opinion_date" />
      </Accardion>
      <Accardion title="Qatnashuvchilar">
        {(showParicipantHistory ? userHistoryByObjectId.data?.users : object.data?.users)?.map((user, index) => (
          <div key={user.user_id} className={`${index === 0 ? '' : 'mt-4 border-t'}`}>
            <p className={`text-[#48535B] text-sm leading-6 mb-1.5 font-semibold ${index === 0 ? '' : 'mt-4'}`}>
              {user?.role_name}
            </p>
            <div className={'p-3 rounded-xl bg-[#F6F6F6]'}>
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="flex justify-center items-center p-2.5 bg-[#367CF41A] rounded-xl">
                  <BankIcon />
                </div>
                <span className="text-sm leading-6">{user?.organization_name}</span>
              </div>
              <div className="rounded-xl pt-4">
                <p className="text-sm leading-6">{`${user?.user_name || ''} ${user?.user_middlename || ''} ${
                  user?.user_surname || ''
                }`}</p>
                <p className="text-[#0E73F6] text-sm leading-6">{phoneNumberFormatter(user?.phone)}</p>
              </div>
            </div>
            {showParicipantHistory ? (
              <div className="flex justify-between items-center gap-2.5 mt-4">
                <div className="grow border-b-2 border-dotted"></div>
                <div>{dateFormatter(format, new Date(user?.create_at), 'dd.MM.yyyy')}</div>
                <div className="grow border-b-2 border-dotted"></div>
              </div>
            ) : null}
          </div>
        ))}
        <BtnFiled
          className="bg-blue-100 text-blue-600 w-full mt-4 py-[24px]"
          onClick={() => setShowParicipantHistory((p) => !p)}
        >
          {showParicipantHistory ? 'Yopish' : 'Qatnashuvchilar tarixi'}
        </BtnFiled>
      </Accardion>
      <Accardion title="Bloklar">
        {object.data?.blocks?.map((block, index) => (
          <div key={block.id} className={`${index === 0 ? '' : 'mt-4'}`}>
            <span className="input-label">{`№ ${block?.number}`}</span>
            <div className="border px-4 py-2 rounded-md text-sm leading-6 text-[#303940]">{block?.name}</div>
          </div>
        ))}
      </Accardion>
      {roleId === ICHKI_NAZORATCHI_ROLE_ID && (
        <BtnFiled className="w-full h-12 mt-4" onClick={handleOpen}>
          Prorab qo'shish
        </BtnFiled>
      )}
      <ModalPassportNumber
        isExistedUser={isExistedUser}
        handleSubmit={handleSubmit2}
        isBoshProrab={isBoshProrab}
        onSubmit={onSubmit}
        handleClose={handleClose}
        hasObject={hasObject}
        isOpen={isOpen}
        title="Pasport"
        control={control2}
        errors={errors2}
      />
    </div>
  )
}

export default MobileMainInfo
