import { Done } from '@mui/icons-material'
import { useRef } from 'react'
import { CancelIcon, RightArrowIcon } from '../../../../../assets/icons'
import SendIcon from '@mui/icons-material/Send'
import { BasicLayout, BasicTable, BtnFiled, BtnOutlined, Card, FileUpload, Textarea } from '../../../../../components'
import { CommentModal } from '../../../../../components/CommentModal/CommentModal'
import ConfirmModal from '../../../../../components/ConfirmModal'
import { FileView } from '../../../../../components/FileView/FileView'
import { InfoSquare } from '../../../../../components/InfoSquare'
import ModalComment from '../../../../../components/ModalComment/ModalComment'
import { OrganizationModal } from '../../../../../components/OrganizationModal'
import { hoc } from '../../../../../utils/hoc'
import { useThirdStepProps } from './useThirdStepProps'

export const ThirdStep = hoc(
  useThirdStepProps,
  ({
    headData,
    bodyData,
    handleOpenConfirm,
    handleOpenCancel,
    handleCloseConfirm,
    modalIcon,
    modalTitle,
    isOpen,
    setIsOpen,
    handleConfirm,
    isAdmin,
    register,
    showFourthStep,
    scrollToNext,
    onSubmit,
    watch,
    setValue,
    handleSubmit,
    claimStatus,
    handleSendToInspector,
    isOrganizationStatus,
    isAllAccepted,
    isInspectorStatus,
    handleOpenInspectorConfirm,
    isInspectorModalOpen,
    handleInspectorModalClose,
    inspector,
    canSendToOrganizations,
    isHistory,
    withNewStatus,
    isOrganizationModalOpen,
    handleOrganizationModalClose,
    handleOrganizationModalOpen,
    isMuallif,
    isTechnique,
    formRegister,
    onOrganizationSubmit,
    handleOrgSubmit,
    isApartment,
    isDen,
    isSes,
    isSanitar,
    handleRejectModalOpen,
    handleRejectModalClose,
    handleReject,
    isRejectModalOpen,
    errors,
    setIsAccept,
    control,
    setCertificateDate,
    setOrderDate,
    setCustomerCerDate,
    setStartDate,
    setFinishedDate,
    file,
    comment,
    isOperatorCancelOpen,
    handleOpenOperatorCancel,
    handleCloseOperatorCancel,
    handleRejectOperator,
    operatorComment,
  }) => {
    return (
      <>
        {!isAdmin ? (
          <BasicLayout
            className={isAdmin ? 'w-3/6 bg-transparent' : ''}
            footer={
              !isHistory && (
                <div className="flex justify-end">
                  {isOrganizationStatus ? (
                    isAllAccepted ? (
                      <BtnFiled onClick={handleOpenInspectorConfirm} children="Inspektorga yuborish" />
                    ) : (
                      !withNewStatus && (
                        <BtnOutlined color="red" leftIcon={<CancelIcon />} onClick={handleOpenOperatorCancel}>
                          Bekor qilish
                        </BtnOutlined>
                      )
                    )
                  ) : !isInspectorStatus ? (
                    <BtnFiled
                      onClick={showFourthStep ? scrollToNext : handleOpenConfirm}
                      children={showFourthStep ? 'Keyingisi' : "Tashkilotlarga jo'natish"}
                      disabled={showFourthStep ? false : canSendToOrganizations}
                      rightIcon={showFourthStep ? <RightArrowIcon color="white" /> : <SendIcon fill="white" />}
                    />
                  ) : null}
                </div>
              )
            }
          >
            {claimStatus === 'inspector' && (
              <InfoSquare
                title1="Inspektor"
                title2={inspector?.district}
                subtitle1={inspector?.full_name}
                subtitle2={inspector?.phone}
                className="mb-3"
              />
            )}
            <BasicTable headColumns={headData} bodyColumns={bodyData} />
            {operatorComment && isHistory && (
              <div className="mt-6">
                <span className="input-label mb-1">Operator xulosasi</span>
                <div className="border p-3 w-full gap-x-4 border-borderColor hover:border-primary rounded-[6px] focus-within:border-primary bg-[#F6F6F6] max-w-[50%] min-w-[500px]">
                  <p className="text-sm text-gray-600 ">{operatorComment}</p>
                </div>
              </div>
            )}
          </BasicLayout>
        ) : !isHistory ? (
          <Card
            className="w-3/6 min-h-[50vh]"
            title="Umumiy ma'lumot"
            footer={
              <div className="flex justify-end gap-x-3 p-4">
                <BtnOutlined
                  color="red"
                  leftIcon={<CancelIcon />}
                  onClick={() => {
                    if (isApartment || isDen || isSes || isSanitar || isTechnique || isMuallif) {
                      handleRejectModalOpen()
                      setIsAccept(false)
                    } else {
                      handleOpenCancel()
                      setIsAccept(false)
                    }
                  }}
                >
                  Bekor qilish
                </BtnOutlined>
                <BtnFiled
                  leftIcon={<Done />}
                  onClick={() => {
                    if (isTechnique || isApartment || isDen || isMuallif || isSanitar || isSes) {
                      handleOrganizationModalOpen()
                      setIsAccept(true)
                    } else {
                      handleOpenConfirm()
                      setIsAccept(true)
                    }
                  }}
                >
                  Qabul qilish
                </BtnFiled>
              </div>
            }
          >
            {/* onClick={handleOpenConfirm}  */}
            <>
              {claimStatus === 'inspector' && (
                <InfoSquare
                  title1="Inspektor"
                  title2={inspector?.district}
                  subtitle1={inspector?.full_name}
                  subtitle2={inspector?.phone}
                />
              )}
              <span className="input-label mt-4">Izoh</span>
              <Textarea
                widthFull
                rows={2}
                className="border not-resizable p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary"
                name="comment"
                register={formRegister}
                errors={errors}
                required={true}
              />
              {/* <span className="input-label mt-4">Fayl</span>
            <FileUpload
              showSmallPreview
              widthFull
              register={register}
              nameFile="file"
              setValue={setValue}
              watch={watch}
            /> */}
            </>
          </Card>
        ) : (
          <Card className="max-w-[50%]">
            <h3 className="text-sm font-normal mb-2 mt-3">Izoh</h3>
            <div className="border p-3 w-full gap-x-4 border-borderColor hover:border-primary rounded-[6px] focus-within:border-primary bg-[#F6F6F6]">
              <p className="text-sm text-gray-600 ">{comment}</p>
            </div>
            {file && <FileView className="mt-6" fileName={file} ownLink={process.env.REACT_APP_CDN_FILE_URL} />}
          </Card>
        )}
        <ConfirmModal
          title={modalTitle}
          icon={modalIcon}
          isOpen={isOpen}
          handleClose={handleCloseConfirm}
          fn={handleSubmit(onSubmit)}
        />
        <ConfirmModal
          title="Inspektorga yuborishni tasdiqlaysizmi?"
          icon={modalIcon}
          isOpen={isInspectorModalOpen}
          handleClose={handleInspectorModalClose}
          fn={handleSendToInspector}
        />
        <OrganizationModal
          isOpen={isOrganizationModalOpen}
          handleClose={handleOrganizationModalClose}
          isMuallif={isMuallif}
          isTechnique={isTechnique}
          register={formRegister}
          handleSubmit={handleOrgSubmit(onOrganizationSubmit)}
          control={control}
          setCertificateDate={setCertificateDate}
          setOrderDate={setOrderDate}
          setCustomerCerDate={setCustomerCerDate}
          setStartDate={setStartDate}
          setFinishedDate={setFinishedDate}
        />
        <ModalComment
          isOpen={isRejectModalOpen}
          handleClose={handleRejectModalClose}
          title="Bekor qilish izohini kiriting"
          violations={[
            {
              name: 'roleInObject',
              title: 'Maxsus shaxs lavozimi',
              tag: 'input',
              type: 'text',
              placeholder: 'Maxsus shaxs lavozimi',
            },
            { name: 'councilNum', title: 'Xulosa raqami', tag: 'input', type: 'number', placeholder: 'Xulosa raqami' },
          ]}
          btnText="Yuborish"
          fn={handleReject}
          required={true}
        />

        <CommentModal
          title="Izoh kiriting"
          btnText="Rad etish"
          isOpen={isOperatorCancelOpen}
          handleClose={handleCloseOperatorCancel}
          onSubmit={(comment) => handleRejectOperator(comment)}
        />
      </>
    )
  }
)
