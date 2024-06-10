import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useClaim } from '../../../services/claim'
import {
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  TASHKILOTLAR,
} from '../../../settings/constants'
import { permissions } from '../../../settings/permissions'

export const useOperatorSteppersProps = () => {
  const { roleId } = useSelector((state) => state.auth)
  const { pathname } = useLocation()
  const { id } = useParams()
  const isUserFromOrganization = TASHKILOTLAR.includes(roleId)
  console.log(isUserFromOrganization)

  const sliderRef = useRef(null)

  const [current, setCurrent] = useState(1)
  const [activeTab, setActiveTab] = useState(0)

  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const steps = [
    { id: 1, text: "Arizachi haqida ma'lumot" },
    { id: 2, text: "Obyekt haqida ma'lumot" },
    { id: 3, text: 'Tashkilot' },
    { id: 4, text: 'Inspektor xulosasi' },
  ]

  const isAdmin = permissions[roleId].includes('OPERATOR/APPLICATION/LIST/ADMIN')
  const isHistory = pathname.includes('history')

  const isInspectionBoss = [
    INSPEKSIYA_BOSHLIGI_ROLE_ID,
    INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
    INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  ].some((inspection) => inspection === roleId)

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

  const tabElements = [
    { key: 0, title: "Yozma ko'rsatmalar", count: '' },
    { key: 1, title: 'Arxiv', count: '' },
  ]
  const { getClaimByIdQuery } = useClaim({
    getClaimByIdQueryProps: {
      enabled: !!id,
      onSuccess: (data) => {
        reset(
          data?.data?.applicant_type !== 'individual'
            ? {
                organization_name: data?.data?.customer_name,
                stir: data?.data?.applicant?.stir,
                legal_opf: data?.data?.organization_type,
                legal_entity_address: data?.data?.applicant?.address,
                legal_entity_phone_number: data?.data?.applicant?.phone_number,
                legal_entity_email: data?.data?.applicant?.email,
                cadastral_number: data?.data?.kadastar_number,
                object_type: data?.data?.object_info?.object_type,
                build_type: data?.data?.object_info?.building_type,
                build_document_name: data?.data?.object_info?.building_name,
                building_address: data?.data?.object_info?.building_address,
                region: data?.data?.object_info?.region,
                district: data?.data?.object_info?.district,
                building_date: data?.data?.object_info?.officials_order,
                design_stir: data?.data?.object_info?.organization_stir,
                object_passport: data?.data?.object_info?.passport,
                number_date_resignation_district_hokim: data?.data?.object_info?.number_date_resignation_district_hokim,
                type_object: data?.data?.object_info?.type_object,
                tin_project_organization: data?.data?.object_info?.tin_project_organization,
                comment: claimData?.comment,
              }
            : {
                full_name: data?.data?.customer_name,
                passport_number: data?.data?.applicant?.passport_serial,
                ind_pinfl: data?.data?.applicant?.pinfl,
                permit_address: data?.data?.applicant?.address,
                phone: data?.data?.applicant?.phone_number,
                email: data?.data?.applicant?.email,
                cadastral_number: data?.data?.kadastar_number,
                object_type: data?.data?.object_info?.object_type,
                build_type: data?.data?.object_info?.building_type,
                build_document_name: data?.data?.object_info?.building_name,
                building_address: data?.data?.object_info?.building_address,
                region: data?.data?.object_info?.region,
                district: data?.data?.object_info?.district,
                building_date: data?.data?.object_info?.officials_order,
                design_stir: data?.data?.object_info?.organization_stir,
                object_passport: data?.data?.object_info?.passport,
                type_object: data?.data?.object_info?.type_object,
                number_date_resignation_district_hokim: data?.data?.object_info?.number_date_resignation_district_hokim,
                tin_project_organization: data?.data?.object_info?.tin_project_organization,
                ind_passport: data?.data?.object_info?.ind_passport,
              }
        )
      },
    },
    id,
  })

  const claimData = getClaimByIdQuery.data?.data
  const claimStatus = getClaimByIdQuery?.data?.data?.status

  const showThirdStep =
    isHistory && (claimData?.reject_step === '1' || claimData?.reject_step === '2')
      ? false
      : (pathname.includes('inspector') || isAdmin || isInspectionBoss || claimStatus !== 'new' || isHistory) &&
        claimStatus !== 'ministry'
  const showFourthStep =
    (isHistory && (claimData?.reject_step === '1' || claimData?.reject_step === '2')) ||
    (claimStatus !== 'checked' && claimData?.reject_step === '3')
      ? false
      : isHistory && isUserFromOrganization
      ? false
      : (isInspectionBoss || claimStatus === 'checked' || claimStatus === 'inspection' || isHistory) &&
        claimStatus !== 'ministry'
  const isJuridic = claimData?.applicant_type !== 'individual'

  const scrollToPrev = () => {
    setCurrent((p) => p - 1)
    window.scrollTo({ top: 0 })
    sliderRef.current.slickPrev()
  }
  const scrollToNext = () => {
    setCurrent((p) => p + 1)
    window.scrollTo({ top: 0 })
    sliderRef.current.slickNext()
  }
  const scrollToEl = (step) => {
    setCurrent(step)
    window.scrollTo({ top: 0 })
    sliderRef.current.slickGoTo(step - 1)
  }
  const scrollToPassedEl = (step) => {
    window.scrollTo({ top: 0 })
    sliderRef.current.slickGoTo(step - 1)
  }

  const getSteps = () => (showFourthStep ? steps : showThirdStep ? steps.slice(0, 3) : steps.slice(0, 2))
  useEffect(() => {
    if (claimStatus && claimStatus !== 'new') {
      if (showFourthStep) scrollToEl(4)
      else if (showThirdStep && !isAdmin) scrollToEl(3)
    }
  }, [showThirdStep, isAdmin, showFourthStep, claimStatus])

  const isMonitored = claimData?.is_monitored

  return {
    title: claimData?.mygov_id,
    getSteps,
    current,
    scrollToNext,
    scrollToPrev,
    scrollToEl,
    scrollToPassedEl,
    settings,
    sliderRef,
    isJuridic,
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    tabElements,
    activeTab,
    setActiveTab,
    showThirdStep,
    isAdmin,
    showFourthStep,
    claimData,
    claimStatus,
    getValues,
    inspector: claimData?.inspector,
    inspectorComment: claimData?.inspector_comment,
    blocks: claimData?.blocks,
    isInspectionBoss,
    isMonitored,
    roleId,
    getClaimByIdQuery,
    isHistory,
    errors,
  }
}
