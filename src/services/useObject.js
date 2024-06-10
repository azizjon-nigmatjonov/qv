import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getDifficultyCategories = () => request.get('/object/difficulty-category').then((res) => res.data.data)
const getConstructionTypes = () => request.get('/object/construction-type').then((res) => res.data.data)
const getObjectStatus = (params) => request.get('/object/object-status', { params }).then((res) => res.data.data)
const getListObjects = (params) => request.get('/get-list-objects', { params }).then((res) => res.data.data)

const getObjects = (params) => request.get('/object', { params }).then((res) => res.data.data)
const getObjectOne = (id) => request.get(`/object/${id}`).then((res) => res.data.data)
const getInspectorStats = (params) => request.get('/inspector-statistics', { params }).then((res) => res.data.data)
const createObject = (data) => request.post('/object', data)
const getObjectPhotoReports = (params) => request.get('/object/photo-reports', { params }).then((res) => res.data.data)
const getUserHistoryByObjectId = (params) =>
  request.get(`/object/${params.id}/history-users`, { params }).then((res) => res.data.data)
const createObjectPhotoReport = (data) => request.post('/object/photo-reports', data)
const updateObject = (data) => request.patch('/object/object-status-log', data)
const updateOldObject = (data) => request.patch('/old-object', data)
const craeteObjectParticipants = (data) => request.post('/object/participants', data)
const updateOrganizationSummary = (data) => request.patch('/object/protocol', data)
const createObjectLog = (data) => request.post('/object/log', data)
const getObjectLog = (params) => request.get(`/object/${params.id}/object-log`).then((res) => res.data.data)
const checkObjectTaskId = (taskId) => request.get(`/task_id?task_id=${taskId}`).then((res) => res.data.data)
const updateObjectTaskId = (data) => request.patch('/object/task-id', data)
const updateRegulationAct = (data) => request.post('/object/regulation/act', data)
const defaultQueryProps = {
  enabled: false,
}

export const useObject = ({
  id,
  start_date,
  object_type,
  sector_id,
  sector_ids,
  category_id,
  end_date,
  offset = 1,
  limit = 250,
  difficulty_category_id,
  district = undefined,
  region_id = undefined,
  user_id = undefined,
  status_id = undefined,
  search = undefined,
  searchInspector = undefined,
  searchTexnikNazoratchi = undefined,
  searchLoyihachi = undefined,
  searchIchkiNazoratchi = undefined,
  customerSearch = undefined,
  task_id = undefined,
  role_id,
  cadastral_number,
  updateObjectTaskIdProps,
  inspectorStatsProps = defaultQueryProps,
  showParicipantHistory = false,
  createMutationProps,
  updateMutationProps,
  updateOldObjectMutationProps = defaultQueryProps,
  updateRegulationActMutationProps,
  updateOrganizationSummaryMutationProps = defaultQueryProps,
  objectPhotoReportsProps = defaultQueryProps,
  objectsQueryProps = defaultQueryProps,
  difficultyCategoriesQueryProps = defaultQueryProps,
  constructionTypesQueryProps = defaultQueryProps,
  objectStatusQueryProps = defaultQueryProps,
  craeteObjectParticipantsProps = defaultQueryProps,
  objectLogMutationProps,
  checkObjectTaskIdQueryProps = defaultQueryProps,
  objectLogQueryProps = defaultQueryProps,
  getListObjectsQueryParams,
  getListObjectsQueryProps = defaultQueryProps,
  getListByDistrictParams,
  getListByDistrictProps = defaultQueryProps,
} = {}) => {
  const difficultyCategories = useQuery(
    [serviceActionTypes.GET_DIFFICULTY_CATEGORIES],
    getDifficultyCategories,
    difficultyCategoriesQueryProps
  )

  const constructionTypes = useQuery(
    [serviceActionTypes.GET_CONSTRUCTION_TYPES],
    getConstructionTypes,
    constructionTypesQueryProps
  )
  const objectPhotoReports = useQuery(
    [serviceActionTypes.GET_OBJECT_PHOTO_REPORTS, id],
    () => getObjectPhotoReports({ object_id: id }),
    objectPhotoReportsProps
  )
  const userHistoryByObjectId = useQuery(
    [serviceActionTypes.GET_USER_HISTORY_BY_OBJECT_ID, id, showParicipantHistory],
    () => getUserHistoryByObjectId({ id }),
    { enabled: !!id && showParicipantHistory }
  )
  const checkObjectTaskIdQuery = useQuery(
    [serviceActionTypes.CHECK_OBJECT_TASK_ID, task_id],
    () => checkObjectTaskId(task_id),
    checkObjectTaskIdQueryProps
  )
  const objectParticipantsMutation = useMutation(craeteObjectParticipants, craeteObjectParticipantsProps)
  const createMutationPhotoReport = useMutation(createObjectPhotoReport, {
    ...createMutationProps,
  })

  const status = useQuery([serviceActionTypes.GET_OBJECT_STATUS, role_id], () => getObjectStatus({ role_id }), {
    ...objectStatusQueryProps,
  })

  const createMutation = useMutation(createObject, {
    ...createMutationProps,
  })

  const updateMutation = useMutation(updateObject, {
    ...updateMutationProps,
    onError: (e) => {},
  })

  const updateOldObjectMutation = useMutation(updateOldObject, {
    updateOldObjectMutationProps,
    onError: (e) => {},
  })
  const updateOrganizationSummaryMutation = useMutation(updateOrganizationSummary, {
    ...updateOrganizationSummaryMutationProps,
  })
  const updateObjectTaskIdMutation = useMutation(updateObjectTaskId, {
    ...updateObjectTaskIdProps,
  })
  const updateRegulationActMutation = useMutation(updateRegulationAct, {
    ...updateRegulationActMutationProps,
  })

  const createObjectLogMutation = useMutation(createObjectLog, {
    ...objectLogMutationProps,
  })

  const objectLog = useQuery([serviceActionTypes.GET_LOG_OBJECT], () => getObjectLog({ id }), {
    ...objectLogQueryProps,
  })

  const getListObjectsQuery = useQuery(
    [serviceActionTypes.GET_LIST_OBJECTS, getListObjectsQueryParams],
    () => getListObjects(getListObjectsQueryParams),
    getListObjectsQueryProps
  )

  const getListByDistrict = useQuery(
    [serviceActionTypes.GET_LIST_OBJECTS_BY_DISTRICT, getListByDistrictParams],
    () => getListObjects(getListByDistrictParams),
    getListByDistrictProps
  )

  const objects = useQuery(
    [
      serviceActionTypes.GET_OBJECTS,
      offset,
      limit,
      start_date,
      end_date,
      search,
      searchLoyihachi,
      task_id,
      district,
      user_id,
      region_id,
      status_id,
      searchIchkiNazoratchi,
      searchInspector,
      searchTexnikNazoratchi,
      customerSearch,
      object_type,
      sector_id,
      category_id,
      difficulty_category_id
    ],
    () =>
      getObjects({
        offset,
        limit,
        search,
        task_id,
        district,
        user_id,
        region_id,
        status_id,
        object_type,
        sector_id,
        sector_ids,
        category_id,
        difficulty_category_id,
        'start-date': start_date,
        'end-date': end_date,
        cadastral_number,
        'search-loyihachi': searchLoyihachi,
        'search-ichki-nazoratchi': searchIchkiNazoratchi,
        'search-customer': customerSearch,
        'search-inspector': searchInspector,
        'search-texnik-nazoratchi': searchTexnikNazoratchi,
      }),
    { ...objectsQueryProps, keepPreviousData: true }
  )

  const object = useQuery([serviceActionTypes.GET_OBJECT, id], () => getObjectOne(id), {
    enabled: !!id,
  })

  const inspectorStats = useQuery(
    [serviceActionTypes.GET_INSPECTOR_STATS, role_id, offset, limit],
    () => getInspectorStats({ role_id, offset, limit }),
    inspectorStatsProps
  )

  return {
    difficultyCategories,
    constructionTypes,
    status,
    createMutation,
    objects,
    userHistoryByObjectId,
    object,
    objectParticipantsMutation,
    inspectorStats,
    createMutationPhotoReport,
    updateRegulationActMutation,
    objectPhotoReports,
    updateMutation,
    updateObjectTaskIdMutation,
    createObjectLogMutation,
    objectLog,
    updateOldObjectMutation,
    updateOrganizationSummaryMutation,
    checkObjectTaskIdQuery,
    getListObjectsQuery,
    getListByDistrict,
  }
}
