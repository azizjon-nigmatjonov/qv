import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RightArrowIcon } from '../../../assets/icons'
import { BtnFiled, Card, Input, StatusTag } from '../../../components'
import PdfViewerModal from '../../../components/PdfViewer/PdfViewer'
import { useMyGo } from '../../../services/useMyGo'
import { permissions } from '../../../settings/permissions'

const FirstStep = ({ register, scrollToNext, registration, isAccepted, isHistory, isYuridik }) => {
  const { roleId } = useSelector((state) => state.auth)

  const [isPdfOpen, setIsPdfOpen] = useState(false)
  const [canDownload, setCanDownload] = useState(false)
  const { pathname } = useLocation()
  const { getPdfFileQuery, getLinearPdfFileQuery } = useMyGo({
    getPdfFileQueryParams: {
      task_id: registration.data?.task?.task?.id,
    },
    getPdfFileQueryProps: {
      enabled: canDownload && !pathname.includes('linear'),
    },
    getLinearPdfFileQueryProps: {
      enabled: canDownload && pathname.includes('linear'),
    },
    getLinearPdfFileQueryParams: {
      task_id: registration.data?.task?.task?.id,
    },
  })
  const DownloadFile = () => {
    const handleClick = () => {
      setCanDownload(true)
      setIsPdfOpen(true)
    }

    return (
      <span
        className="cursor-pointer text-sm font-medium leading-6 rounded-md text-white px-2 bg-blue-600 p-1 min-w-fit h-fit "
        onClick={handleClick}
      >
        PDF yuklash
      </span>
    )
  }

  return (
    <div className="w-full">
      <Card
        title={`Ariza beruvchi haqida ma'lumot (${isYuridik ? 'Yuridik' : 'Jismoniy'} shaxs)`}
        className="w-1/2"
        rightElement={
          <div className="flex align-middle h-full min-w-max gap-2">
            <DownloadFile />
            {isHistory && !permissions[roleId].includes('ADMINISTRATIVE/REGISTRATION') && (
              <StatusTag
                className="h-fit px-2 p-1 min-w-fit"
                color={isAccepted ? 'green' : 'red'}
                title={isAccepted ? 'Qabul qilindi' : 'Rad etildi'}
              />
            )}
          </div>
        }
      >
        {isYuridik ? (
          <>
            <span className="input-label">Tashkilot nomi</span>
            <Input
              disabled
              widthFull
              register={register}
              name={pathname.includes('linear') ? 'legal_name' : 'legal_entity_name'}
            />
            <span className="input-label mt-4">STIR</span>
            <Input
              disabled
              widthFull
              register={register}
              name={pathname.includes('linear') ? 'legal_tin' : 'legal_entity_tin'}
            />
            <span className="input-label mt-4">Tashkiliy-huquqiy shakli</span>
            {/* not clear field */}
            <Input
              disabled
              widthFull
              register={register}
              name={pathname.includes('linear') ? 'legal_kopf' : 'legal_opf'}
            />
            <span className="input-label mt-4">Yuridik manzili</span>
            <Input
              disabled
              widthFull
              register={register}
              name={pathname.includes('linear') ? 'legal_address' : 'legal_entity_address'}
            />
            <span className="input-label mt-4">Yuridik shaxsning telefon raqami</span>
            <Input
              disabled
              widthFull
              register={register}
              name={pathname.includes('linear') ? 'legal_phone' : 'legal_entity_phone_number'}
            />
            <span className="input-label mt-4">Yuridik shaxsning elektron pochtasi</span>
            <Input
              disabled
              widthFull
              register={register}
              name={pathname.includes('linear') ? 'legal_email' : 'legal_entity_email'}
            />
          </>
        ) : (
          <>
            <span className="input-label">Ism sharifi</span>
            <Input disabled widthFull register={register} name="full_name" />
            <span className="input-label mt-4">PINFL</span>
            <Input disabled widthFull register={register} name="ind_pinfl" />
            <span className="input-label mt-4">Pasport raqami va seriyasi</span>
            <Input disabled widthFull register={register} name="passport_number" />
            <span className="input-label mt-4">Ro&apos;yxatdan o&apos;tgan manzil</span>
            <Input disabled widthFull register={register} name="permit_address" />
            <span className="input-label mt-4">Jismoniy shaxsning telefon raqami</span>
            <Input disabled widthFull register={register} name="phone" />
            <span className="input-label mt-4">Jismoniy shaxsning elektron pochtasi</span>
            <Input disabled widthFull register={register} name="email" />
          </>
        )}
        <div className="flex justify-end mt-4">
          <BtnFiled rightIcon={<RightArrowIcon color="white" />} onClick={scrollToNext}>
            Keyingisi
          </BtnFiled>
        </div>
      </Card>
      <PdfViewerModal
        isOpen={isPdfOpen}
        isPdfLoading={!pathname.includes('linear') ? getPdfFileQuery.isLoading : getLinearPdfFileQuery.isLoading}
        onClose={() => setIsPdfOpen(false)}
        base64={!pathname.includes('linear') ? getPdfFileQuery.data : getLinearPdfFileQuery.data}
      />
    </div>
  )
}

export default FirstStep
