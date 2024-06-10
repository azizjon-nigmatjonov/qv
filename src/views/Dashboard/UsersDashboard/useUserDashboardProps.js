import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useDashboardUsers } from '../../../services/dashboard/useDashboardUsers'
import { BOSH_PRORAB_ROLE_ID, REPUBLIC_APPARAT_ROLE_ID } from '../../../settings/constants'

export const useUserDashboardProps = () => {
  const { userId, roleId } = useSelector((state) => state.auth)

  const { pathname } = useLocation()

  const [year, setYear] = useState(2022)
  const [month, setMonth] = useState(new Date().getMonth() - 1)
  const [day, setDay] = useState()

  const { id, taskId } = useParams()

  const eventTypes = [
    {
      color: '#0E73F6',
      value: 'Inspektor',
    },
    {
      color: '#F8C51B',
      value: 'Texnik nazoratchi',
    },
    {
      color: '#1AC19D',
      value: 'Ichki nazoratchi',
    },
    {
      color: '#A23FEE',
      value: 'Mualliflik nazorati',
    },
  ]

  const isForeman = roleId === BOSH_PRORAB_ROLE_ID || roleId === REPUBLIC_APPARAT_ROLE_ID

  const { userDashboard, userDashboardByDay, objectUsers, objectUsersByDay } = useDashboardUsers({
    userDashboardParams: {
      year,
      month,
      user_id: userId,
    },
    userDashboardProps: {
      enabled: !isForeman,
    },

    userDashboardByDayParams: {
      year,
      month,
      day,
      user_id: userId,
    },
    userDashboardByDayProps: {
      enabled: year && month && !!day && userId && !isForeman,
    },

    objectUsersParams: {
      year,
      month,
      object_id: id,
    },
    objectUsersProps: {
      enabled: isForeman,
    },

    objectUsersByDayParams: {
      year,
      month,
      day,
      object_id: id,
    },
    objectUsersByDayProps: {
      enabled: isForeman,
    },
  })

  return {
    year,
    setYear,
    month,
    setMonth,
    userDashboard,
    setDay,
    day,
    data: isForeman
      ? objectUsers.data?.datas?.map((data) => ({ date: data?.date, events: data?.role }))
      : userDashboard.data?.days?.map((day) => ({
          date: day?.date,
          events: day?.count_expiret_regulations,
        })),
    isDataLoading: isForeman ? objectUsers.isLoading : userDashboard.isLoading,
    objects: isForeman ? objectUsersByDay.data?.users : userDashboardByDay.data?.objects,
    isObjectsLoading: isForeman ? objectUsersByDay.isLoading : userDashboardByDay.isLoading,
    objectsDate: isForeman ? objectUsersByDay.data?.date : userDashboardByDay.data?.date,
    isForeman,
    taskId,
    eventTypes,
    pathname,
  }
}
