import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getDocuments = (objectId, params) =>
  request
    .get(`/object/${objectId}/object-doc`, {
      params,
    })
    .then((res) => res.data.data)
const getDocumentOne = (id) => request.get(`/object/object-doc/${id}`).then((res) => res.data.data)
const getActProtocol = (params) => request.get('act-protocol', { params }).then((res) => res.data.data)
const createDocument = (data) => {
  request.post('/object/object-doc', data)
}
const actLabById = (id) => request.get(`/act-lab/${id}`).then((res) => res.data.data)
const protocolById = (id) => request.get(`/protocol/${id}`).then((res) => res.data)
const updateDocArchive = (data) => request.patch('/object-doc-achive', data)
const createActSample = (data) => request.post('/act-lab', data)
const actsForProtocol = (params) => request.get('/act-for-protocol', { params }).then((res) => res.data.data)
const createProtocol = (data) => request.post('/protocol', data)
const getExpertizaFile = (num) => request.get(`https://ekspertiza.mc.uz/ru/reestr/res-ekspertiza?id=${num}`).then((res) => res)
const defaultQueryProps = {
  enabled: false,
}

export const useDocument = ({
  expertizaNum,
  expertizaFileProps = defaultQueryProps,
  id,
  offset = 1,
  limit = 10,
  act_id,
  protocol_id,
  is_achived,
  createMutationProps,
  documentsQueryProps = defaultQueryProps,
  actProtocolsQueryProps = defaultQueryProps,
  actLabByIdQueryParams = defaultQueryProps,
  protocolByIdProps = defaultQueryProps,
  actsForProtocolQueryProps = defaultQueryProps,
  createActSamplingProps,
  updateDocArchiveProps,
  createProtocolProps,
  objectId,
} = {}) => {
  const documents = useQuery(
    [serviceActionTypes.GET_DOCUMENTS, offset, limit, objectId, is_achived],
    () => getDocuments(objectId, { offset, limit, is_achived }),
    { ...documentsQueryProps, keepPreviousData: true, enabled: !!objectId }
  )
  const actProtocols = useQuery(
    [serviceActionTypes.GET_ACT_PROTOCOL, offset, limit, objectId],
    () => getActProtocol({ offset, limit, object_id: objectId }),
    { ...actProtocolsQueryProps, keepPreviousData: true }
  )
  const actLabByIdQuery = useQuery(
    [serviceActionTypes.GET_ACT_LAB_BY_ID, id],
    () => actLabById(act_id),
    actLabByIdQueryParams
  )
  const protocolByIdQuery = useQuery(
    [serviceActionTypes.GET_PROTOCOL_LAB_BY_ID],
    () => protocolById(protocol_id),
    protocolByIdProps
  )
  const actsForProtocolQuery = useQuery(
    [serviceActionTypes.GET_ACTS_FOR_PROTOCOL, objectId],
    () => actsForProtocol({ object_id: objectId }),
    actsForProtocolQueryProps
  )
  const expertizaFileQuery = useQuery(
    [serviceActionTypes.GET_EXPERTIZA_FILE, expertizaNum],
    () => getExpertizaFile(expertizaNum),
    expertizaFileProps
  )
  const createMutation = useMutation(createDocument, {
    ...createMutationProps,
  })
  const createActSampling = useMutation(createActSample, createActSamplingProps)
  const createProtocolMutation = useMutation(createProtocol, createProtocolProps)
  const updateDocArchiveMutation = useMutation(updateDocArchive, updateDocArchiveProps)

  const document = useQuery([serviceActionTypes.GET_DOCUMENT, id], () => getDocumentOne(id), {
    enabled: !!id,
  })

  return {
    documents,
    actProtocols,
    createActSampling,
    createProtocolMutation,
    actsForProtocolQuery,
    document,
    createMutation,
    updateDocArchiveMutation,
    actLabByIdQuery,
    protocolByIdQuery,
    expertizaFileQuery
  }
}
