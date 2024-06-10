import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { request } from '../http-client'

const linearObjectMutation = (data) => request.patch('/registration-linear', data)

export const usePatchLinearObject = ({ linearObjectMutationMutationProps }) => {
  const linearObjectMutationMutation = useMutation(linearObjectMutation, {
    ...linearObjectMutationMutationProps,
    onError: (error) => {
      try {
        const message = error?.response?.data?.data?.message
        const errors = message?.split('')?.splice(36)?.join('')?.split('&&$$')
        errors?.pop()
        errors?.forEach((error) => toast.error(error))
      } catch (error) {
        console.log(error)
      }
    },
  })

  return {
    linearObjectMutationMutation,
  }
}
