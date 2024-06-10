import { useMutation } from 'react-query'
import { request } from '../http-client'

const addForm = (data) => request.post('/form', data)
const deleteForm = ({ id }) => request.delete(`/form/${id}`)
const updateForm = (data) => request.put('/form', data)
export const useAddForms = ({ addFormProps, deleteFormProps, updateFormProps }) => {
  const addFormMutation = useMutation(addForm, addFormProps)
  const deleteFormMutation = useMutation(deleteForm, deleteFormProps)
  const updateFormMutation = useMutation(updateForm, updateFormProps)
  return {
    addFormMutation,
    deleteFormMutation,
    updateFormMutation,
  }
}
