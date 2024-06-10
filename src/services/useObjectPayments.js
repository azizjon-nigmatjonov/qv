import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getpayments = (params) => request.get(`/object/payment`, { params }).then((res) => res.data)
const deletePayment = (data) => request.delete(`/object/payment/${data.id}`, { data })
const postPayment = (data) => request.post(`/object/payment`, data)
const getpaymentsById = (id) => request.get(`/object/payment/${id}`).then((res) => res.data)
const putPayment = (data) => request.put(`/object/payment`, data)
const defaulrQuery = {
  enabled: false,
}
export const useObjectPayment = ({
  id,
  payment_id,
  limit,
  offset,
  object_id,
  paymentByIdParams = defaulrQuery,
  objectPaymentsParams = defaulrQuery,
  deletePaymentMutationProps,
  createPaymentMutationProps,
  updatePaymentMutationProps,
}) => {
  const objectPayments = useQuery(
    [serviceActionTypes.GET_OBJECT_PAYMENT, limit, offset, object_id],
    () => getpayments({ limit, offset, object_id }),
    objectPaymentsParams
  )
  const updatePaymentMutation = useMutation(putPayment, updatePaymentMutationProps)
  const deletePaymentMutation = useMutation(deletePayment, deletePaymentMutationProps)
  const paymentById = useQuery(
    [serviceActionTypes.GET_OBJECT_PAYMENT_BY_ID, payment_id],
    () => getpaymentsById(payment_id),
    paymentByIdParams
  )
  const createPaymentMutation = useMutation(postPayment, createPaymentMutationProps)

  return { objectPayments, createPaymentMutation, deletePaymentMutation, paymentById, updatePaymentMutation }
}
