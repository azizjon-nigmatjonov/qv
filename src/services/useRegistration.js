import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import { serviceActionTypes } from '../settings/constants'
import { request } from './http-client'

// const getRegistrations = () => request.get('/registration').then((res) => res.data.data)
const getRegistration = (params) => request.get(`/registration/${params.id}`, { params }).then((res) => res.data.data)
const getRegistrationList = (params, isLinear) =>
  request.get(`/registration${isLinear ? '-linear' : ''}-log`, { params }).then((res) => res.data.data)
const updateRegistration = (data) => request.patch('/registration', data)
const getCompanies = (params) => request.get('/companies', { params }).then((res) => res.data.data)

const defaultQueryProps = {
  enabled: false,
}

const useRegistration = ({
  id,
  search,
  limit,
  offset,
  region_id,
  updateMutationProps,
  cadastral_number,
  is_registration,
  is_history,
  isLinear = false,
  registrationListProps = defaultQueryProps,
}) => {
  const updateMutation = useMutation(updateRegistration, {
    ...updateMutationProps,
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

  const companies = {}
  // const companies = useQuery([serviceActionTypes.GET_COMPANIES, region_id], () => getCompanies({ region_id }), {
  //   enabled: !!region_id,
  // })

  const registrationList = useQuery(
    [
      serviceActionTypes.GET_REGISTRATION_LIST,
      { offset, limit, is_history, search, region_id, is_registration, cadastral_number },
    ],
    () =>
      getRegistrationList(
        {
          offset,
          limit,
          is_history,
          search,
          region_id,
          is_accepted: false,
          is_registration,
          cadastral_number,
        },
        isLinear
      ),
    registrationListProps
  )

  return {
    registrationList,
    updateMutation,
    companies,
  }
}

export default useRegistration
