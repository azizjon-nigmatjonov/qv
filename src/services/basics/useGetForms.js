import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getFormList = (params) =>
  request.get(`${process.env.REACT_APP_URL_ANALYTICS}/form1-list`, { params }).then((res) => res.data)
const getFormList2 = (params) =>
  request.get(`${process.env.REACT_APP_URL_ANALYTICS}/form2-list`, { params }).then((res) => res.data)
const getFormExcel = (params) =>
  request.get(`${process.env.REACT_APP_URL_ANALYTICS}/form-excel`, { params }).then((res) => res.data)

export const useGetFormTables = ({
  id,
  formTableProps = { enabled: false },
  formTableParams,
  formTable2Props = { enabled: false },
  formTable2Params,
  formExcelProps = { enabled: false },
  formExcelParams,
}) => {
  const getFormTableQuery = useQuery(
    [serviceActionTypes.GET_FORM_TABLE_1, formTableParams],
    () => getFormList(formTableParams),
    formTableProps
  )
  const getFormTable2Query = useQuery(
    [serviceActionTypes.GET_FORM_TABLE_2, formTable2Params],
    () => getFormList2(formTable2Params),
    formTable2Props
  )
  const getFormExcelQuery = useQuery(
    [serviceActionTypes.GET_FORM_EXCEL, formExcelParams],
    () => getFormExcel(formExcelParams),
    formExcelProps
  )
  return {
    getFormTableQuery,
    getFormTable2Query,
    getFormExcelQuery
  }
}
