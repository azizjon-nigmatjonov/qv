import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import {
  ADMINISTRATIVE_ADMINISTRATOR_ROLE_ID,
  REGISTARTION_ARCHIEVE_STATUS_ID,
  REGISTRATION_CHECKED_STATUS_ID,
  REPUBLIC_APPARAT_ROLE_ID,
} from '../../settings/constants'
import FifthStep from './Steps/FifthStep'

const ShowFifthStep = memo(function ShowFifthStep({
  registration,
  getLinearObjectByIdQuery,
  updateMutation,
  linearObjectMutationMutation,
  register,
  scrollToEl,
  handleOpen,
  onSubmitAccept,
  onSubmitAcceptReject,
}) {
  const { pathname, state } = useLocation()
  const { id } = useParams()
  const { roleId, userId } = useSelector((state) => state.auth)
  const isReRegistration =
    (pathname.includes('history') && +registration.data?.task?.notification_type === 2) ||
    (pathname.includes('history') && +getLinearObjectByIdQuery.data?.task?.notification_type === 2)
  const isLinear = state?.isLinear || pathname.includes('linear')

  if (isReRegistration) return null
  if (roleId === ADMINISTRATIVE_ADMINISTRATOR_ROLE_ID || roleId === REPUBLIC_APPARAT_ROLE_ID) {
    return (
      <FifthStep
        administrativeId={
          !isLinear ? registration.data?.administrative_id : getLinearObjectByIdQuery.data?.administrative_id
        }
        id={id}
        isLinear={isLinear}
        userId={userId}
        roleId={roleId}
        administrativeStatusId={
          !isLinear
            ? registration.data?.administrative_status_id
            : getLinearObjectByIdQuery.data?.administrative_status_id
        }
        registration={isLinear ? getLinearObjectByIdQuery : registration}
        isDisabled={updateMutation.isLoading || linearObjectMutationMutation.isLoading}
        register={register}
        scrollToEl={scrollToEl}
        pathname={pathname}
        handleOpen={handleOpen}
        onSubmitAccept={onSubmitAccept}
        onSubmitAcceptReject={onSubmitAcceptReject}
        statusId={isLinear ? getLinearObjectByIdQuery.data?.status_id : registration.data?.status_id}
        taskId={isLinear ? getLinearObjectByIdQuery.data?.task?.task?.id : registration.data?.task?.task?.id}
      />
    )
  } else {
    return ((pathname.includes('linear') ? getLinearObjectByIdQuery.data?.status_id : registration.data?.status_id) ===
      REGISTARTION_ARCHIEVE_STATUS_ID ||
      (pathname.includes('linear') ? getLinearObjectByIdQuery.data?.status_id : registration.data?.status_id) ===
        REGISTRATION_CHECKED_STATUS_ID) &&
      (pathname.includes('linear')
        ? getLinearObjectByIdQuery.data?.status_id
        : registration.data?.task?.task?.status) !== 'not_active' ? (
      <FifthStep
        roleId={roleId}
        registration={pathname.includes('linear') ? getLinearObjectByIdQuery : registration}
        isDisabled={updateMutation.isLoading || linearObjectMutationMutation.isLoading}
        canCancel={
          registration.data?.object_status_id === 'Qurilish ishlari qisman boshlangan yoki yakunlangan' ||
          getLinearObjectByIdQuery.data?.object_status_id === 'Qurilish ishlari qisman boshlangan yoki yakunlangan'
        }
        register={register}
        scrollToEl={scrollToEl}
        pathname={pathname}
        handleOpen={handleOpen}
        onSubmitAccept={onSubmitAccept}
        onSubmitAcceptReject={onSubmitAcceptReject}
        statusId={pathname.includes('linear') ? getLinearObjectByIdQuery.data?.status_id : registration.data?.status_id}
      />
    ) : null
  }
})
export default ShowFifthStep
