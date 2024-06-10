import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../../../components'
import { useDistrict } from '../../../services'
import { useTestTypes } from '../../../services/labaratory'
import { useContract } from '../../../services/labaratory/useContract'
import dateFormatter from '../../../utils/dateFormatter'
import phoneNumberFormatter from '../../../utils/phoneNumberFormatter'
import AllInformation from '../../Application/ApplicationInformation/AllInformation'
import LabaratoryApplicationContext from './context'
import * as yup from 'yup'
import LabaratoryForm from './Form'
import { validations } from '../../../validations'
import { useYupValidationResolver } from '../../../hooks/useYupValidationResolver'
import { toast } from 'react-hot-toast'

export default function LabaratoryApplicationAdd() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { regionId, userId, name: labarantName } = useSelector((state) => state.auth)
  const [deletedSmetas, setDeletedSmetas] = useState([])
  const scheme = yup.object({
    contracted_date: validations.mixed,
    contract_deadline: validations.mixed,
    customer: yup.object().shape({
      firm_name: validations.string,
      firm_address: validations.string,
      firm_accaunt_number: validations.string,
      firm_bank_name: validations.string,
      firm_bank_code: validations.string,
      firm_stir: validations.string,
      firm_ifud: validations.string,
      firm_phone: validations.string,
      firm_boss_name: validations.string,
      obj_name_address: validations.string,
    }),
    overal_sum_in_words: validations.string,
    smetas: yup
      .array()
      .of(
        yup.object().shape({
          amount: validations.number,
          test_type: validations.select,
        })
      )
      .compact()
      .required('Smetalar kiritilmagan'),
  })
  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(scheme),
    defaultValues: {
      calculate_without_transport_cost: false,
    },
  })
  const { contractorData } = useContract({
    region_id: regionId,
    getContractorDataProps: {
      enabled: !!regionId && !id,
      onSuccess: (res) => {
        setValue('performer', res.data)
      },
    },
  })
  const { contractByIdQuery } = useContract({
    id,
    getContractByIdParams: {
      enabled: !!id,
      onSuccess: (res) => {
        const body = {
          ...res.data,
          customer: {
            district: {
              value: res.data.district_id,
              label: res.data.district_name,
            },
            ...res.data,
          },
          performer: {
            ...res.data,
          },
          smetas: res.data.smetas.map((item) => ({
            ...item,
            smetaId: item.id,
            test_type: { value: item.test_type_id, label: item.test_type_name },
            tax: {
              tax_stavka: item.tax_stavka || 15,
              tax_summa: item.tax_summa,
            },
          })),
        }
        reset(body)
      },
    },
  })
  const { createMutation } = useContract({
    createMutationProps: {
      onSuccess: (res) => {
        navigate(`/labaratory/confirm/${res?.data?.id}`)
      },
      onError: (err) => {
        console.log('error')
      },
    },
  })
  const { districts } = useDistrict({ regionId })
  const { getTestTypesQuery } = useTestTypes({
    getTestTypesParams: {
      limit: 1000,
      offset: 0,
    },
  })
  function onSubmit(data) {
    const body = {
      ...data.customer,
      id,
      region_id: regionId,
      district_id: data.customer.district.value,
      delete_smetas: deletedSmetas,
      created_by: userId,
      //replace any symbol except numbers and +
      firm_phone: data.customer.firm_phone.replace(/[^\d+]/g, ''),
      status_id: '94403daf-5350-4088-8cac-09186bbf6965', //"yangi" status
      calculate_without_transport_cost: data.calculate_without_transport_cost,
      contracted_date: dateFormatter(format, data.contracted_date, 'yyyy-MM-dd'),
      contract_deadline: dateFormatter(format, data.contract_deadline, 'yyyy-MM-dd'),
      overal_sum_in_words: data.overal_sum_in_words,
      post_smetas: data.smetas
        ?.filter((el) => el?.newData)
        .map((el) => ({ test_type_id: el.test_type?.value, amount: parseInt(el.amount) })),
      contract_price_numbers: parseFloat(data.contract_price_numbers),
      smetas: data.smetas
        ?.filter((el) => !el?.newData)
        .map((el) => ({
          id: el.smetaId,
          test_type_id: el.test_type?.value,
          amount: parseInt(el.amount),
        })),
    }
    delete body.district

    if (data?.smetas?.length > 0) {
      createMutation.mutate(body)
    } else {
      toast.error('Smetalar kiritilmagan')
    }
  }
  useEffect(() => {
    setValue('user_name', labarantName)
  }, [])
  return (
    <>
      <LabaratoryApplicationContext.Provider
        value={{
          register,
          onSubmit,
          districts: districts?.data?.districts?.map((el) => ({ value: el.id, label: el.uz_name })),
          handleSubmit,
          testTypes: getTestTypesQuery.data?.data?.test_types,
          setDeletedSmetas,
          control,
          headTitle: id ? 'O`zgartirish' : 'Qo`shish',
          setValue,
        }}
      >
        <LabaratoryForm />
      </LabaratoryApplicationContext.Provider>
    </>
  )
}
