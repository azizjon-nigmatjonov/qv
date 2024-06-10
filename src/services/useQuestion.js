import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

const getQuestions = (params) =>
  request
    .get('/question', {
      params,
    })
    .then((res) => res.data.data)
const getQuestion = (params) => request.get(`/question/${params.id}`).then((res) => res.data.data)
const createQuestion = (data) => request.post('/question', data)
const updateQuestion = (data) => request.patch('/question', data)
const deleteQuestion = (data) => request.delete(`/question/${data.id}`, data)
const updateQuestionSnip = (data) => request.patch('/question-snip', data)
const updateQuestionRoleStatus = (data) => request.patch('/question-role-status', data)
const getQuestionRoles = (params) => request.get('/question-role-status', { params }).then((res) => res.data.data)

const defaultQueryProps = {
  enabled: false,
}

export const useQuestion = ({
  updataQuestionProps,
  createQuestionProps,
  deleteQuestionProps,
  updateQuestionRoleStatusProps,
  questionRolesProps = defaultQueryProps,
  offset = 1,
  role_ids,
  status,
  limit = 10,
  id,
  questionsQueryProps = defaultQueryProps,
  final_question,
} = {}) => {
  const questions = useQuery(
    [serviceActionTypes.GET_QUESTIONS, offset, limit, final_question, role_ids, status],
    () => getQuestions({ offset, limit, final_question, role_ids, status }),
    {
      ...questionsQueryProps,
    }
  )
  const question = useQuery([serviceActionTypes.GET_QUESTION, id], () => getQuestion({ id }), {
    enabled: !!id,
  })
  const questionRoles = useQuery(
    [serviceActionTypes.GET_QUESTION_ROLES, offset, limit],
    () => getQuestionRoles({ offset, limit }),
    questionRolesProps
  )

  const updateQuestionMutation = useMutation(updateQuestion, updataQuestionProps)
  const updateQuestionSnipMutation = useMutation(updateQuestionSnip, createQuestionProps)
  const updateQuestionRoleStatusMutation = useMutation(updateQuestionRoleStatus, updateQuestionRoleStatusProps)
  const createQuestionMutation = useMutation(createQuestion, createQuestionProps)
  const deleteQuestionMutation = useMutation(deleteQuestion, deleteQuestionProps)

  return {
    question,
    questions,
    deleteQuestionMutation,
    updateQuestionMutation,
    createQuestionMutation,
    questionRoles,
    updateQuestionSnipMutation,
    updateQuestionRoleStatusMutation,
  }
}
