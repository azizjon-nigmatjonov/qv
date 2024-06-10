import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getLaboratoryRequisiteList = () => request.get('/labaratory').then((res) => res.data)
const getLaboratoryRequisitePut = (params) => request.put('/labaratory', params)
const laboratoryRequisitePost = (params) => request.post('/labaratory', params)
const getLaboratory = (id) => request.get(`/labaratory/${id}`).then((res) => res.data)

export const useLaboratoryRequisite = ({
  laboratoryRequisitesProps = { enabled: false },
  id,
  laboratoryRequisiteProps = { enabled: false },
  laboratoryRequisitePutProps,
  laboratoryRequisitePostProps,
}) => {
  const laboratoryRequisites = useQuery(
    [serviceActionTypes.GET_LABORATORY_REQUISITES],
    () => getLaboratoryRequisiteList(),
    laboratoryRequisitesProps
  )
  const laboratoryRequisite = useQuery(
    [serviceActionTypes.GET_LABORATORY_REQUISITE, id],
    () => getLaboratory(id),
    laboratoryRequisiteProps
  )

  const laboratoryRequisitePut = useMutation(getLaboratoryRequisitePut, laboratoryRequisitePutProps)
  const laboratoryRequisitePostMutation = useMutation(laboratoryRequisitePost, laboratoryRequisitePostProps)
  return { laboratoryRequisites, laboratoryRequisite, laboratoryRequisitePut, laboratoryRequisitePostMutation }
}
