import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BtnFiled, BtnOutlined, Header } from '../../../../components'
import { CancelIcon, SaveIcon } from '../../../../assets/icons'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { PaymentForm } from '../../../../forms/Accounted/Payment'
import { useObjectPayment } from '../../../../services/useObjectPayments'
import dateFormatter from '../../../../utils/dateFormatter'
import { format } from 'date-fns'
import { useLabaratoryPayment } from '../../../../services/labaratory/usePayment'
import { useSelector } from 'react-redux'
import { permissions } from '../../../../settings/permissions'

function PaymentAdd() {
  const params = useParams()
  const navigate = useNavigate()
  const { roleId, userId } = useSelector((state) => state.auth)
  const { pathname } = useLocation()
  const { handleSubmit, register, reset, control, setValue } = useForm()
  console.log(params)
  const { paymentById } = useObjectPayment({
    payment_id: params.payment_id,
    paymentByIdParams: {
      enabled: !!params.payment_id && pathname.includes('inspectors'),
      onSuccess: (res) => {
        const body = {
          ...res.data,
          date: format(new Date(res.data.date_at), 'yyyy-MM-dd'),
        }
        reset(body)
      },
    },
  })
  const { paymentById: paymentByIdLabaratory } = useLabaratoryPayment({
    payment_id: params.payment_id,
    paymentByIdParams: {
      enabled: !!params.payment_id && pathname.includes('labaratory'),
      onSuccess: (res) => {
        const body = {
          ...res.data,
          date: format(new Date(res.data.date_at), 'yyyy-MM-dd'),
        }
        reset(body)
      },
    },
  })
  const { createPaymentMutation } = useObjectPayment({
    createPaymentMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })
  const { createPaymentMutation: createLabaratoryPayment } = useLabaratoryPayment({
    createPaymentMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })
  const { updatePaymentMutation } = useObjectPayment({
    updatePaymentMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })
  const { updatePaymentMutation: updateLabaratoryPayment } = useLabaratoryPayment({
    updatePaymentMutationProps: {
      onSuccess: () => {
        navigate(-1)
      },
    },
  })

  const onSubmit = (data) => {
    if (pathname.includes('labaratory')) {
      if (params.payment_id) {
        updateLabaratoryPayment.mutate({
          amount: parseFloat(data.amount),
          date: dateFormatter(format, data.date, 'yyyy-MM-dd'),
          object_id: params.id,
          id: params.payment_id,
          user_id: userId
        })
      } else {
        createLabaratoryPayment.mutate({
          amount: parseFloat(data.amount),
          date: format(data.date, 'yyyy-MM-dd'),
          contract_id: params.id,
          user_id: userId
        })
      }
    } else {
      if (params.payment_id) {
        updatePaymentMutation.mutate({
          amount: parseFloat(data.amount),
          date: dateFormatter(format, data.date, 'yyyy-MM-dd'),
          object_id: params.id,
          id: params.payment_id,
          user_id: userId
        })
      } else {
        createPaymentMutation.mutate({
          amount: parseFloat(data.amount),
          date: dateFormatter(format, data.date, 'yyyy-MM-dd'),
          object_id: params.id,
          user_id: userId
        })
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-screen">
          <Header
            title="Qo’shish"
            backLink={-1}
            rightElement={
              permissions[roleId]?.includes('PAYMENT/EDIT') && (
                <div className="flex items-center gap-[12px]">
                  <BtnOutlined leftIcon={<CancelIcon />} color="red" type="button" onClick={() => navigate(-1)}>
                    Bekor qilish
                  </BtnOutlined>
                  <BtnFiled color="blue" leftIcon={<SaveIcon />} type="submit">
                    Saqlash
                  </BtnFiled>
                </div>
              )
            }
          />
          <div className="sidebar-header-calc">
            <PaymentForm control={control} setValue={setValue} register={register} />
          </div>
        </div>
      </form>
    </>
  )
}

export default PaymentAdd
