import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { devJournalUrl, request } from './http-client'

export const createJournal = (data) => request.post('/create-journal-author', data).then((res) => res.data)
export const getAuthorJournals = (params) => request.get('/journal-author', { params }).then((res) => res.data.data)
export const updateAuthorJournal = (data) => request.patch('/journal-author', data).then((res) => res.data.data)
export const getJournalList = (params) =>
  request.get(`${devJournalUrl}/journal`, { params }).then((res) => res.data.data)
export const getRelatedJournals = (params) =>
  request.get(`${devJournalUrl}/journal-relations`, { params }).then((res) => res.data.data)
export const postRelatedJournals = (data) =>
  request.post(`${devJournalUrl}/journal-relations`, data).then((res) => res.data)

export const getJournalData = (params, journale_name) =>
  request.get(`${devJournalUrl}/journal-struct`, { params }).then((res) => res.data.data)

export const createJournalData = (data, journal_name) =>
  request.post(`${devJournalUrl}/journal-struct`, data).then((res) => res.data)

export const uuid = () => request.get(`${devJournalUrl}/uuid`).then((res) => res.data.data)

export const useJournal = ({
  createMutationProps,
  updateMutationProps,
  authorJournalParams,
  journalQueryParams,
  relatedJournalQueryParams,
  journalDataQueryParams,
  journalDataMutationParams,
  postRelatedJournalsMutationParams,
}) => {
  const createMutation = useMutation(createJournal, createMutationProps)
  const authorJournals = useQuery(
    [serviceActionTypes.GET_AUTHOR_JOURNALS, authorJournalParams],
    () => getAuthorJournals(authorJournalParams),
    {
      enabled: !!authorJournalParams?.object_id,
    }
  )
  const updateMutation = useMutation(updateAuthorJournal, updateMutationProps)
  const journals = useQuery(
    [serviceActionTypes.GET_JOURNALS, journalQueryParams],
    () => getJournalList(journalQueryParams),
    {
      enabled: !!journalQueryParams?.object_id,
    }
  )
  const relatedJournals = useQuery(
    [serviceActionTypes.GET_RELATED_JOURNALS, relatedJournalQueryParams],
    () => getRelatedJournals(relatedJournalQueryParams),
    {
      enabled: !!relatedJournalQueryParams?.object_id,
    }
  )
  const postRelatedJournalsMutation = useMutation(postRelatedJournals, postRelatedJournalsMutationParams)
  const journalData = useQuery(
    [serviceActionTypes.GET_JOURNAL_DATA, journalDataQueryParams],
    () => getJournalData(journalDataQueryParams),
    {
      enabled: !!journalDataQueryParams?.object_id && !!journalDataQueryParams?.tab_name,
    }
  )
  const journalDataMutation = useMutation((e) => createJournalData(e), journalDataMutationParams)
  return {
    journalData,
    relatedJournals,
    journals,
    createMutation,
    authorJournals,
    updateMutation,
    journalDataMutation,
    postRelatedJournalsMutation,
  }
}
