import { useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getPdfFile = (params) => request.get(`/pdf/task_id`, { params }).then((res) => res.data)
const getLinearPdfFile = (params) => request.get(`/pdf-linear/task_id`, { params }).then((res) => res.data)
const getPdfById = (id) => request.get(`/regulation-pdf/${id}`).then((res) => res.data)

const defaultQueryProps = {
  enabled: false,
}

export const useMyGo = ({
  getPdfFileQueryParams,
  getPdfFileQueryProps = defaultQueryProps,
  getLinearPdfFileQueryProps = defaultQueryProps,
  getLinearPdfFileQueryParams,
  getPdfByIdQueryParams,
  getPdfByIdQueryProps = defaultQueryProps,
}) => {
  const getPdfFileQuery = useQuery(
    [serviceActionTypes.GET_MY_GO_PDF, getPdfFileQueryParams],
    () => getPdfFile(getPdfFileQueryParams),
    getPdfFileQueryProps
  )

  const getLinearPdfFileQuery = useQuery(
    [serviceActionTypes.GET_MY_GO_PDF_LINEAR, getLinearPdfFileQueryParams],
    () => getLinearPdfFile(getLinearPdfFileQueryParams),
    getLinearPdfFileQueryProps
  )

  const getPdfByIdQuery = useQuery(
    [serviceActionTypes.GET_MY_GO_PDF_LINEAR, getPdfByIdQueryParams],
    () => getPdfById(getPdfByIdQueryParams?.id),
    getPdfByIdQueryProps
  )

  return {
    getPdfFileQuery,
    getLinearPdfFileQuery,
    getPdfByIdQuery,
  }
}
