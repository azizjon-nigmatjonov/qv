import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getFormList = (params) => request.get('/form', { params }).then((res) => res.data)
const getForm = (id) => request.get(`/form/${id}`).then((res) => res.data)

export const useGetForms = ({
  limit,
  offset,
  id,
  type_id,
  formsProps = { enabled: false },
  getFormProps = { enabled: false },
}) => {
  const getFormListQuery = useQuery(
    [serviceActionTypes.GET_BASICS_LIST, limit, offset, type_id],
    () => getFormList({ limit, offset, type_id }),
    formsProps
  )
  const getFormQuery = useQuery([serviceActionTypes.GET_FORM, id], () => getForm(id), getFormProps)
  return {
    getFormQuery,
    getFormListQuery,
  }
}
