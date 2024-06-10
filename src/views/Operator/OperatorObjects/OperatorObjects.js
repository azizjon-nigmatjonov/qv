import { BasicLayout, BasicTable, BtnFiled, Header } from '../../../components'
import { CommentModal } from '../../../components/CommentModal/CommentModal'
import ConfirmModal from '../../../components/ConfirmModal'
import { hoc } from '../../../utils/hoc'
import { useOperatorObjectsProps } from './useOperatorObjectsProps'

export const OperatorObjects = hoc(
  useOperatorObjectsProps,
  ({
    headData,
    bodyData,
    handleConfirm,
    handleSubmit,
    handleOpenConfirm,
    handleCloseConfirm,
    isOpen,
    setIsOpen,
    isLoading,
    handleRejectClaimStatus,
    isRejectOpen,
    handleOpenReject,
    handleCloseReject,
  }) => {
    console.log(bodyData?.length)
    return (
      <div className="h-screen">
        <Header title="Obyektlar" />
        <BasicLayout
          footer={
            <div className="flex justify-end gap-x-3">
              <BtnFiled onClick={handleOpenReject} children="Rad etish" color="red" size="large" />
              {bodyData?.length > 0 && <BtnFiled onClick={handleOpenConfirm} children="Tasdiqlash" size="large" />}
            </div>
          }
        >
          <BasicTable tableScroll={true} headColumns={headData} bodyColumns={bodyData} isLoading={isLoading} />
        </BasicLayout>
        <ConfirmModal
          isOpen={isOpen}
          handleClose={handleCloseConfirm}
          title="Tasdiqlaysizmi?"
          fn={handleSubmit(handleConfirm)}
        />
        <CommentModal
          title="Rad etish izohini kiriting"
          handleClose={handleCloseReject}
          isOpen={isRejectOpen}
          required={true}
          btnText="Jo'natish"
          btnClassName="bg-[#F76659]"
          onSubmit={(comment) => handleRejectClaimStatus(comment)}
        />
      </div>
    )
  }
)
