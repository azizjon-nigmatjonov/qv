import { Done } from '@mui/icons-material'
import { WarningIcon } from '../../../../../assets/icons/icons'
import { BasicTable, BtnFiled, Card, StatusTag } from '../../../../../components'
import { hoc } from '../../../../../utils/hoc'
import { useFourthStep } from './useFourthStep'
import SendIcon from '@mui/icons-material/Send'
import CancelIcon from '@mui/icons-material/Cancel'
import ImageSliderPreview from '../../../../../components/ImageSliderPriview'
import { CommentModal } from '../../../../../components/CommentModal/CommentModal'
import ConfirmModal from '../../../../../components/ConfirmModal'
import { InfoSquare } from '../../../../../components/InfoSquare'
import { FileUploadField } from '../../../../../components/FileUploadField/FileUploadField'
import { FileView } from '../../../../../components/FileView/FileView'

export const FourthStep = hoc(
  useFourthStep,
  ({
    canceledWithMonitoring,
    inspector,
    inspectorComment,
    inspectorCommit,
    blocks,
    isInspectionBoss,
    checkListHeadData,
    isOpen,
    images,
    handleClose,
    handleOpen,
    checklistBodyData,
    isLoading,
    handleConfirm,
    isConfirmOpen,
    handleCloseConfirmModal,
    handleReject,
    isRejectOpen,
    handleCloseRejectedModal,
    handleOpenConfirmModal,
    handleOpenRejectedModal,
    isMonitored,
    handleOperatorConfirm,
    // handleOperatorReject,
    claimStatus,
    isHistory,
    setFileNames,
    onSuccess,
    fileNames,
    file,
    rejectStep,
    operatorComment,
    claimData,
  }) => {
    return (
      <div className="w-full">
        <Card
          title="Umumiy ma'lumotlar"
          rightElement={<StatusTag title={claimData?.status} />}
          footer={
            !isHistory &&
            !isInspectionBoss && (
              <div className="p-4 flex justify-end">
                <div className="flex gap-x-4">
                  {canceledWithMonitoring && claimStatus === 'checked' && (
                    <BtnFiled
                      onClick={handleOpenRejectedModal}
                      color="red"
                      leftIcon={<CancelIcon fill="white" />}
                      children="Rad etish"
                    />
                  )}
                  {!canceledWithMonitoring && claimStatus === 'checked' && (
                    <BtnFiled
                      onClick={handleOpenConfirmModal}
                      leftIcon={<SendIcon fill="white" />}
                      children={'Rahbarga yuborish'}
                    />
                  )}
                </div>
              </div>
            )
          }
        >
          <div className="mb-8 flex gap-x-8">
            <div>
              <h3 className="text-sm font-semibold mb-2">Xulosa beruvchi</h3>
              <InfoSquare
                title1="Inspektor"
                title2={inspector?.district}
                subtitle1={inspector?.full_name}
                subtitle2={inspector?.phone}
              />
            </div>
            {blocks?.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold mb-2">Bloklar</h3>
                <div className="flex gap-x-6 grow">
                  {blocks?.map((block) => (
                    <div
                      key={block?.id}
                      className="rounded-[6px] py-4 px-10 font-semibold text-[#0452C8] bg-[#D7EDFF] flex justify-center items-center"
                    >
                      {block?.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mb-8 flex items-end grow">
            {!canceledWithMonitoring ? (
              <div className="flex justify-between grow gap-x-8">
                <div className="flex flex-col gap-y-8">
                  <div className="flex flex-col justify-between grow">
                    <h3 className="text-sm font-semibold mb-2">Inspektor xulosasi</h3>
                    <div className="border p-3 w-full gap-x-4 border-borderColor hover:border-primary rounded-[6px] focus-within:border-primary bg-[#F6F6F6] max-w-[50%] min-w-[500px] min-h-[56px]">
                      <p className="text-sm text-gray-600 ">{inspectorCommit}</p>
                    </div>
                  </div>
                  {operatorComment && (
                    <div className="grow">
                      <h3 className="text-sm font-semibold mb-2">
                        {rejectStep === '4' ? "Xududiy inspeksiya boshlig'i xulosasi" : 'Operator xulosasi'}
                      </h3>
                      <div className="border p-3 w-full gap-x-4 border-borderColor hover:border-primary rounded-[6px] focus-within:border-primary bg-[#F6F6F6] max-w-[50%] min-w-[500px]">
                        <p className="text-sm text-gray-600 ">{operatorComment}</p>
                      </div>
                    </div>
                  )}
                </div>
                {file && (
                  <div className="grow">
                    <h3 className="text-sm font-semibold mb-2">Loyiha</h3>
                    <FileView
                      className="grow"
                      fileName={file}
                      ownLink={process.env.REACT_APP_CDN_FILE_URL}
                      placeholder="File"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-start justify-between grow gap-x-8">
                <div className="flex flex-col gap-y-8">
                  <div className="grow flex flex-col justify-between">
                    <h3 className="text-sm font-semibold mb-2">Inspektor xulosasi</h3>
                    <div className="border p-3 w-full flex items-center gap-x-4 border-borderColor hover:border-primary rounded-[6px] focus-within:border-primary bg-[#F6F6F6] max-w-[50%] min-w-[500px] min-h-[56px]">
                      <WarningIcon width="20" height="20" />
                      <p className="text-sm">{inspectorComment}</p>
                    </div>
                  </div>
                  <div className="grow">
                    <h3 className="text-sm font-semibold mb-2">
                      {rejectStep === '4' ? "Xududiy inspeksiya boshlig'i xulosasi" : 'Operator xulosasi'}
                    </h3>
                    <div className="border p-3 w-full gap-x-4 border-borderColor hover:border-primary rounded-[6px] focus-within:border-primary bg-[#F6F6F6] max-w-[50%] min-w-[500px]">
                      <p className="text-sm text-gray-600 ">{operatorComment}</p>
                    </div>
                  </div>
                </div>
                {file && (
                  <div className="grow">
                    <h3 className="text-sm font-semibold mb-2">Loyiha</h3>
                    <FileView
                      className="grow"
                      fileName={file}
                      ownLink={process.env.REACT_APP_CDN_FILE_URL}
                      placeholder="File"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
        {isInspectionBoss && (
          <>
            <Card
              className="mt-4"
              title="Check-list natijasi"
              bodyClassName="p-4"
              footer={
                !isHistory && (
                  <div className="p-4 flex justify-end">
                    <div className="flex gap-x-4">
                      {isInspectionBoss && claimStatus === 'inspection' && (
                        <BtnFiled
                          onClick={handleOpenRejectedModal}
                          color="red"
                          leftIcon={<CancelIcon fill="white" />}
                          children="Rad etish"
                        />
                      )}
                      {!canceledWithMonitoring && isInspectionBoss && claimStatus === 'inspection' && (
                        <BtnFiled
                          onClick={handleOpenConfirmModal}
                          leftIcon={<Done htmlColor="white" />}
                          children={'Tasdiqlash'}
                        />
                      )}
                    </div>
                  </div>
                )
              }
            >
              <BasicTable
                heightFit
                headColumns={checkListHeadData}
                bodyColumns={checklistBodyData}
                rowLink=""
                isLoading={isLoading}
              />
            </Card>
            <ImageSliderPreview isOpen={isOpen} handleClose={handleClose} images={images} />
          </>
        )}

        <CommentModal
          onSubmit={(comment) => {
            isInspectionBoss ? handleConfirm(comment) : handleOperatorConfirm()
          }}
          isOpen={isConfirmOpen}
          handleClose={handleCloseConfirmModal}
          btnText={isInspectionBoss ? 'Yuborish' : 'Tasdiqlash'}
          title={isInspectionBoss ? 'Tasdiqlash. Izoh kiriting' : 'Tasdiqlaysizmi?'}
          withoutComment={!isInspectionBoss ? true : false}
          required={isInspectionBoss ? true : false}
          children={
            <FileUploadField setFileNames={setFileNames} onSuccess={onSuccess} fileNames={fileNames} className="mb-3" />
          }
        />
        <CommentModal
          onSubmit={(comment) => handleReject(comment)}
          isOpen={isRejectOpen}
          handleClose={handleCloseRejectedModal}
          btnText="Yuborish"
          btnClassName="bg-red-400 text-white"
          title="Bekor qilish. Izoh kiriting"
        />
        {/* <ConfirmModal onSubmit={handleOperatorReject} title="Bekor qilishni tasdiqlash" /> */}
      </div>
    )
  }
)
