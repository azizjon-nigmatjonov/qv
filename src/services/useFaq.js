import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getFaqList = (params) => request.get('/common_question', { params }).then((res) => res.data.data)
const getFaqById = (id) => request.get(`/common_question/${id}`).then((res) => res.data.data)
const updateFaqStatus = (data) => request.patch('/common-question-status', data)
const createFaq = (data) => request.post('/common_question', data)
const updateFaq = (data) => request.patch('/common_question', data)
const deleteFaq = (data) => request.delete(`/common_question/${data.id}`)

const useFaq = ({ id, limit, offset, status, department_id, updataFaqProps, createFaqProps, deleteFaqProps }) => {
  const faqList = useQuery(
    [serviceActionTypes.GET_FAQ_LIST, offset, department_id, status],
    () => getFaqList({ limit, offset, department_id, status }),
    {
      enabled: !!department_id || !!offset,
    }
  )
  const faqById = useQuery([serviceActionTypes.GET_FAQ_BY_ID, id], () => getFaqById(id), { enabled: !!id })

  const updateFaqStatusMutation = useMutation(updateFaqStatus, updataFaqProps)
  const updateFaqMutation = useMutation(updateFaq, updataFaqProps)
  const createFaqMutation = useMutation(createFaq, createFaqProps)
  const deleteFaqMutation = useMutation(deleteFaq, deleteFaqProps)

  return {
    faqById,
    faqList,
    updateFaqStatusMutation,
    createFaqMutation,
    updateFaqMutation,
    deleteFaqMutation,
  }
}

export default useFaq
