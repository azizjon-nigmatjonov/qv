import { useQuery } from 'react-query'
import { serviceActionTypes } from '../../settings/constants'
import { request } from '../http-client'

const getUserDashboard = (params) => request.get('/user/dashboard', { params }).then((res) => res.data.data)
const getUserDashboardByDay = (params) => request.get('/user/dashboard-day', { params }).then((res) => res.data.data)
const getObjectUsers = (params) => request.get('/object/users/dashboard', { params }).then((res) => res.data.data)
const getObjectUsersByDay = (params) =>
  request.get('/object/users/dashboard-day', { params }).then((res) => res.data.data)

export const useDashboardUsers = ({
  userDashboardProps = { enabled: false },
  userDashboardParams,
  userDashboardByDayParams,
  userDashboardByDayProps = { enabled: false },
  objectUsersParams,
  objectUsersProps = { enabled: false },
  objectUsersByDayParams,
  objectUsersByDayProps = { enabled: false },
}) => {
  const userDashboard = useQuery(
    [serviceActionTypes.GET_USER_DASHBOARD, userDashboardParams],
    () => getUserDashboard(userDashboardParams),
    userDashboardProps
  )

  const userDashboardByDay = useQuery(
    [serviceActionTypes.GET_USER_DASHBOARD_DAY, userDashboardByDayParams],
    () => getUserDashboardByDay(userDashboardByDayParams),
    userDashboardByDayProps
  )

  const objectUsers = useQuery(
    [serviceActionTypes.GET_OBJECT_USERS, objectUsersParams],
    () => getObjectUsers(objectUsersParams),
    objectUsersProps
  )

  const objectUsersByDay = useQuery(
    [serviceActionTypes.GET_OBJECT_USERS, objectUsersByDayParams],
    () => getObjectUsersByDay(objectUsersByDayParams),
    objectUsersByDayProps
  )

  return {
    userDashboard,
    userDashboardByDay,
    objectUsers,
    objectUsersByDay,
  }
}
