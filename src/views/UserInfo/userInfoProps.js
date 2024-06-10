import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { AuthUrl, request } from '../../services/http-client'

export const useUserInfoProps = () => {
  const { pathname } = useLocation()
  const id = pathname?.split('/').at(-1)

  const getUser = (id) => request.get(`${AuthUrl}/user/${id}`).then((res) => res.data.data)
  const user = useQuery(['GET_USER_INFO', id], () => getUser(id), {
    enabled: !!id,
  })

  return {
    user: user.data,
  }
}
