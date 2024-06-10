import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { devAuthUrl, request } from '../http-client'

const getpayments = (params) => request.get(`/labaratory/payment`, { params }).then((res) => res.data)
const getpaymentById = (id) => request.get(`/labaratory/payment/${id}`).then((res) => res.data)
const postPayment = (data) => request.post(`/labaratory/payment`, data)
const deletePayment = (data) => request.delete(`/labaratory/payment/${data.id}`, {data})
const defaulrQuery = {
  enabled: false,
}
const putPayment = (data) => request.put(`/labaratory/payment`, data)
export const useLabaratoryPayment = ({
  id,
  payment_id,
  limit,
  offset,
  contract_id,
  labaratoryPaymentsParams = defaulrQuery,
  deletePaymentMutationProps,
  createPaymentMutationProps,
  paymentByIdParams = defaulrQuery,
  updatePaymentMutationProps,
}) => {
  const labaratoryPayments = useQuery(
    [serviceActionTypes.GET_LABARATORY_PAYMENTS, limit, offset, contract_id],
    () => getpayments({ limit, offset, contract_id }),
    labaratoryPaymentsParams
  )
  const updatePaymentMutation = useMutation(putPayment, updatePaymentMutationProps)
  const paymentById = useQuery(
    [serviceActionTypes.GET_LABARATORY_PAYMENT_BY_ID, payment_id],
    () => getpaymentById(payment_id),
    paymentByIdParams
  )
  const deletePaymentMutation = useMutation(deletePayment, deletePaymentMutationProps)

  const createPaymentMutation = useMutation(postPayment, createPaymentMutationProps)

  return { labaratoryPayments, createPaymentMutation, deletePaymentMutation, paymentById, updatePaymentMutation }
}
