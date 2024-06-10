import { Send } from '@mui/icons-material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { CancelIcon, RightArrowIcon } from '../../../../../assets/icons'
import { BtnFiled, BtnOutlined, Card, StatusTag } from '../../../../../components'
import { CommentModal } from '../../../../../components/CommentModal/CommentModal'
import { FormObjectInfo } from '../../../../../components/FormObjectInfo'
import { hoc } from '../../../../../utils/hoc'
import { useSecondStepProps } from './useSecondStepProps'

const ButtonPermission = ({
  isAdmin,
  showFourthStep,
  showThirdStep,
  claimStatus,
  children,
  pathname,
  isSubmitted,
  showCount,
  isUserFromOrganization,
  isHistory,
}) => {
  console.log(isHistory && showThirdStep)
  console.log(isAdmin || showFourthStep || pathname.includes('inspector') || showThirdStep || isSubmitted)
  if (isHistory && showThirdStep) return children.slice(2)
  if (claimStatus === 'new') return children.slice(0, showCount)
  if (showThirdStep) return children.slice(2)
  else if (claimStatus !== 'new' && !showFourthStep) return []
  else if (!isAdmin) return children.slice(0, 3)
}

export const SecondStep = hoc(
  useSecondStepProps,
  ({
    register,
    isDisabled,
    scrollToNext,
    claimStatus,
    handleClose,
    handleMinistryConfirm,
    handleGasnConfirm,
    isAdmin,
    showFourthStep,
    showThirdStep,
    files,
    taskId,
    handleOpenDepartment,
    handleCloseDepartment,
    isDepartmentOpen,
    id,
    statusFailed,
    statusMinistry,
    handleAcceptOpen,
    isHandleAcceptCloseOpen,
    handleAcceptClose,
    handleAccept,
    pathname,
    isSubmitted,
    handleRejectClaimStatus,
    isRejectOpen,
    handleCloseRejectedModal,
    handleOpenRejectedModal,
    passportLink,
    isHistory,
    comment,
    rejectStep,
    claimData,
    showComment,
    isUserFromOrganization,
    isInspectionBoss,
  }) => {
    return (
      <div className="w-full">
        <Card
          title="Obyekt haqida ma'lumot"
          className="w-1/2"
          rightElement={(!showThirdStep || !showFourthStep) && isHistory && <StatusTag title={claimData?.status} />}
        >
          <FormObjectInfo
            register={register}
            files={files}
            taskId={taskId}
            passportLink={passportLink}
            comment={comment}
            showComment={showComment}
          />
          <div className="flex justify-end mt-4">
            <div className="flex gap-3">
              <>
                {/* <BtnOutlined color="red" leftIcon={<CancelIcon />} onClick={handleOpenRejectedModal}>
                  Bekor qilish
                </BtnOutlined> */}
                {claimStatus === 'new' && !isUserFromOrganization && !isInspectionBoss && (
                  <>
                    <BtnOutlined onClick={handleOpenDepartment} color="blue" leftIcon={<Send color="primary" />}>
                      Qurilish boshqarmasiga jo'natish
                    </BtnOutlined>
                    <BtnFiled leftIcon={<CheckOutlinedIcon />} disabled={isDisabled} onClick={handleAcceptOpen}>
                      Qabul qilish
                    </BtnFiled>
                  </>
                )}
                {(showThirdStep || showFourthStep) && (
                  <BtnFiled rightIcon={<RightArrowIcon color="white" />} onClick={scrollToNext}>
                    Keyingisi
                  </BtnFiled>
                )}
              </>
            </div>
          </div>
        </Card>
        {/* <ConfirmModal
          title="Tasdiqlaysizmi"
          isOpen={isOpen}
          handleClose={handleClose}
          fn={() => handleConfirm(statusFailed, id)}
        /> */}
        {/* <ConfirmModal
          title="Qabul qilishni tasdiqlaysizmi"
          isOpen={isHandleAcceptCloseOpen}
          handleClose={handleAcceptClose}
          fn={() => handleAccept()}
        /> */}
        {/* <ConfirmModal
          title="Qurilish boshqarmasiga jo'natishni tasdiqlaysizmi?"
          isOpen={isDepartmentOpen}
          handleClose={handleCloseDepartment}
          fn={() => handleConfirm(statusMinistry, id)}
        /> */}
        <CommentModal
          onSubmit={(comment) => handleMinistryConfirm(comment, taskId)}
          isOpen={isDepartmentOpen}
          handleClose={handleCloseDepartment}
          btnText="Yuborish"
          title="Qurilish boshqarmasiga jo'natish. Izoh kiriting"
        />
        <CommentModal
          onSubmit={(comment) => {
            handleGasnConfirm(comment, taskId)
            handleAcceptClose()
          }}
          isOpen={isHandleAcceptCloseOpen}
          handleClose={handleAcceptClose}
          btnText="Yuborish"
          title="Qabul qilish. Izoh kiriting"
        />
        <CommentModal
          onSubmit={(comment) => handleRejectClaimStatus(comment)}
          isOpen={isRejectOpen}
          handleClose={handleCloseRejectedModal}
          btnText="Yuborish"
          btnClassName="bg-red-400 text-white"
          title="Bekor qilish. Izoh kiriting"
        />
      </div>
    )
  }
)
