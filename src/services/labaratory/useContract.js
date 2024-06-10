import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'
const apiUrl = process.env.REACT_APP_BASE_URL_ADMIN + '/'

const createBlock = (data) => request.post(`${apiUrl}contract`, data).then((res) => res.data)
const getContractList = (params) => request.get(`${apiUrl}contract`, { params }).then((res) => res.data)
const getContractById = (id) => request.get(`${apiUrl}contract/${id}`).then((res) => res.data)
const sendToDepartments = (data) => request.post(`${apiUrl}contract-action`, data).then((res) => res.data)
const contractAction = (data) => request.patch(`${apiUrl}contract-action`, data).then((res) => res.data)
const getContractAction = (id) => request.get(`${apiUrl}contract-action/${id}`).then((res) => res.data)
const getContractorData = (id) => request.get(`${apiUrl}contract/region/${id}`).then((res) => res.data)
const getArchiveContracts = (params) => request.get(`${apiUrl}contract/archive`, { params }).then((res) => res.data)
const rejectContract = (data) => request.put(`${apiUrl}contract/reject`, data).then((res) => res.data)

const defaultQueryProps = {
  enabled: false,
}
export const useContract = ({
  id,
  limit,
  offset,
  status_of,
  start_date,
  is_inspection,
  end_date,
  search,
  contract_number,
  region_id,
  district_id,
  role_id,
  createMutationProps,
  contractActionMutationProps,
  contractRejectMutationProps,
  getContractorDataProps = defaultQueryProps,
  getContractActionProps = defaultQueryProps,
  sendContractToDepartmentsActionMutationProps,
  getContractListParams = defaultQueryProps,
  getContractByIdParams = defaultQueryProps,
  getArchiveContractsParams = defaultQueryProps,
}) => {
  const contractListQuery = useQuery(
    [
      serviceActionTypes.GET_LABORATORY_CONTRACTS,
      contract_number,
      limit,
      search,
      region_id,
      district_id,
      role_id,
      offset,
      start_date,
      end_date,
      status_of,
      is_inspection,
    ],
    () =>
      getContractList({
        limit,
        search,
        region_id,
        district_id,
        offset,
        role_id,
        contract_number,
        start_date,
        is_inspection,
        end_date,
        status_of,
      }),
    getContractListParams
  )
  const contractByIdQuery = useQuery(
    [serviceActionTypes.GET_LABORATORY_CONTRACT_BY_ID, id],
    () => getContractById(id),
    getContractByIdParams
  )
  const contractActionQuery = useQuery(
    [serviceActionTypes.GET_LABORATORY_CONTRACT_ACTION, id],
    () => getContractAction(id),
    getContractActionProps
  )
  const contractorData = useQuery(
    [serviceActionTypes.GET_LABORATORY_CONTRACTOR_DATA, region_id],
    () => getContractorData(region_id),
    getContractorDataProps
  )
  const archiveContractsQuery = useQuery(
    [
      serviceActionTypes.GET_LABORATORY_ARCHIVE_CONTRACTS,
      contract_number,
      limit,
      region_id,
      role_id,
      offset,
      start_date,
      end_date,
    ],
    () => getArchiveContracts({ limit, search, region_id, offset, role_id, contract_number, start_date, end_date }),
    getArchiveContractsParams
  )
  const sendContractToDepartmentsActionMutation = useMutation(
    sendToDepartments,
    sendContractToDepartmentsActionMutationProps
  )
  const contractActionMutation = useMutation(contractAction, contractActionMutationProps)
  const createMutation = useMutation(createBlock, createMutationProps)
  const contractRejectMutation = useMutation(rejectContract, contractRejectMutationProps)
  return {
    contractorData,
    createMutation,
    contractByIdQuery,
    contractListQuery,
    sendContractToDepartmentsActionMutation,
    contractActionMutation,
    contractActionQuery,
    archiveContractsQuery,
    contractRejectMutation,
  }
}
