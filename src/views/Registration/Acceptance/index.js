import { useEffect, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'

import { Header } from '../../../components'
import Stepper from '../../../components/Stepper'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FirstStep from './FirstStep'
import { useForm } from 'react-hook-form'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import useAcceptance from '../../../services/useAcceptance'
import { useParams } from 'react-router-dom'
import { ACCEPTANCE_NEW_ID } from '../../../settings/constants'
import { useSelector } from 'react-redux'

const RegistrationAcceptance = () => {
  const sliderRef = useRef(null)
  const { id } = useParams()
  const { userId } = useSelector((state) => state.auth)
  const { register, setValue, getValues } = useForm()

  const [current, setCurrent] = useState(1)

  const { acceptance } = useAcceptance({ id })

  const steps = [
    { id: 1, text: "Arizachi haqida ma'lumot" },
    { id: 2, text: "Bino va inshootlar haqida ma'lumot" },
    { id: 3, text: 'Tashkilot' },
  ]

  const scrollToNext = () => {
    setCurrent((p) => p + 1)
    sliderRef.current.slickNext()
  }

  const scrollToEl = (step) => {
    setCurrent(step)
    sliderRef.current.slickGoTo(step - 1)
  }

  const isAcceptedAcceptance = useMemo(() => {
    if (acceptance.data) {
      const item = acceptance.data?.organizations?.find((org) => org.organization_user.user_id === userId)
      return item?.is_accepted
    }
  }, [acceptance.data])

  useEffect(() => {
    if (acceptance.data) {
      const data = acceptance.data.response
      setValue('full_name', data?.ind_name)
      setValue('passport_number', data?.ind_passport)
      setValue('pinfl', data?.tin_project_organization)
      setValue('address', data?.ind_address)
      setValue('phone', data?.ind_phone)
      setValue('email', data?.ind_email)

      setValue('building_type', data?.building_type)
      setValue('type_object', data?.type_object)
      setValue('building_cadastral', data?.building_cadastral)
      setValue('building_name', data?.building_name)
      setValue('building_address', data?.building_address)
      setValue('region', data?.region)
      setValue('district', data?.district)
      setValue('tin_project_organization', data?.tin_project_organization)
      setValue('number_date_resignation_district_hokim', data?.number_date_resignation_district_hokim)
      setValue('cadastral_passport_object', data?.cadastral_passport_object)
      setValue('extract_register_object', data?.extract_register_object)
    }
  }, [acceptance.data, setValue])

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

  return (
    <div className="h-screen">
      <Header title={acceptance.data?.response?.building_cadastral} backLink={-1} />
      <div className="sidebar-header-calc">
        <div className="bg-white rounded-md p-6 mb-4">
          <Stepper
            steps={
              acceptance.data?.status_id !== ACCEPTANCE_NEW_ID && !isAcceptedAcceptance ? steps : steps.slice(0, 2)
            }
            current={current}
            scrollToEl={scrollToEl}
          />
        </div>
        <Slider {...settings} ref={sliderRef}>
          <FirstStep register={register} scrollToNext={scrollToNext} />
          <SecondStep
            id={id}
            getValues={getValues}
            acceptance={acceptance}
            register={register}
            scrollToEl={scrollToEl}
          />
          {acceptance.data?.status_id !== ACCEPTANCE_NEW_ID && !isAcceptedAcceptance && (
            <ThirdStep acceptance={acceptance} current={current} id={id} />
          )}
        </Slider>
      </div>
    </div>
  )
}

export default RegistrationAcceptance
