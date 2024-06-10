import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Popover } from '@mui/material'

import { BtnFiled, Card, ImageViewer, Input, Select, StatusTag, Tag, Textarea } from '../../components'
import { ParticipantsForm } from './ParticipantsForm'
import { BlocksForm } from './BlocksForm'
import { AsyncSelectPaginate } from '../../components'
import { statuses } from '../../settings/status'
import AdditionalInfoForm from './AdditionalInfoForm'
import {
  BOSH_LABARATORIYA_ROLE_ID,
  BOSH_PRORAB_ROLE_ID,
  LABARATORIYA_BOSHLIGI_ROLE_ID,
  objectTypeId,
  OBJECT_STATUS_FROZEN,
  OBJECT_STATUS_ID_SUBMITTED,
  OBJECT_STATUS_STOPPED,
  REGISTRATURA_ROLE_ID,
  YETAKCHI_LABARATORIYA_ROLE_ID,
} from '../../settings/constants'
import CustomMap from '../../components/CustomMap'
import ObjectRejectModal from '../../components/ObjectRejectModal'
import { Add, Flag, HomeWork } from '@mui/icons-material'
import { useObject } from '../../services'
import { useParams } from 'react-router-dom'
import { useMyGo } from '../../services/useMyGo'
import PdfViewerModal from '../../components/PdfViewer/PdfViewer'
import OrganizationSummaryForm from './organizationsSummaryForm'
import TaskIdChangeCard from './TaskIdChangeCard'
import { permissions } from '../../settings/permissions'
import StatusModal from '../../components/StatusModal'
import LabarantAddModal from '../../components/LabarantAddModal'
import DeadlineSlider from '../../components/DeadlineSlider'
import ModalComment from '../../components/ModalComment/ModalComment'
import { useLabarantCall, useTestTypes } from '../../services/labaratory'
import { useMemo } from 'react'

export function InspectorForm({
  onSubmitObjStatusComment,
  isObjectSubmitted,
  loadOptions,
  object,
  setLocation,
  register,
  location,
  isEditting,
  control,
  districts,
  fields,
  append,
  remove,
  setValue,
  watch,
  disabled = true,
  errors,
  users,
  reset,
  getValues,
  setIsOpen,
  objectStatusId,
  data,
  objectRefetch,
  objectTypeStatus,
  setError,
}) {
  const { difficultyCategories, constructionTypes, status, object: objectData } = object
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpenObjStatusModal, setIsOpenObjStatusModal] = useState(false)
  const [isLabarantAddModalOpen, setIsLabarantAddModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(undefined)
  const [isPdfOpen, setIsPdfOpen] = useState(false)
  const [canDownload, setCanDownload] = useState(false)
  const [pdfBase64, setPdfBase64] = useState('')
  const [isPdfLoading, setIsPdfLoading] = useState(false)
  const { id } = useParams()
  const { roleId } = useSelector((state) => state.auth)
  //status modal state
  const [isOpenStatusModal, setIsOpenStatusModal] = useState(false)
  const [isLabarantModalOpen, setIsLabarantModalOpen] = useState(false)

  const [statusModalTitle, setStatusModalTitle] = useState('')
  const [labarantAddStatus, setLabarantAddStatus] = useState('')

  // const bodyData = objects.data?.objects

  const { updateOldObjectMutation } = useObject({
    updateOldObjectMutationProps: {
      enabled: !!id,
    },
  })

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleObjStatusModalClose = () => setIsOpenObjStatusModal(false)
  const handleObjStatusModalOpen = () => setIsOpenObjStatusModal(true)

  const handleCallLabarantClose = () => setIsLabarantModalOpen(false)
  const handleCallLabarantOpen = () => setIsLabarantModalOpen(true)

  const handleCallLabarantSubmit = (data) => {
    createLabarantMutation.mutate({
      object_id: id,
      test_types: data?.comments[0]?.name?.map((item) => ({ id: item?.value, name: item?.label })),
    })
  }

  const handleSelectChange = (e) => {
    reset({
      ...getValues(),
      difficulty_category_id: {
        label: e.label,
        value: e.value,
      },
    })
    updateOldObjectMutation.mutate({
      id,
      difficulty_category_id: e.value,
    })
  }
  const isObjectLinear = useMemo(
    () => objectData.data?.object_type?.id === '79f40f51-0368-4b6c-8326-f83d0453a848',
    [objectData.data]
  )
  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : undefined
  const { getPdfFileQuery, getLinearPdfFileQuery } = useMyGo({
    getPdfFileQueryParams: {
      task_id: objectData.data?.task_id,
    },
    getPdfFileQueryProps: {
      enabled: canDownload && !isObjectLinear, //disable with linear object
    },
    getLinearPdfFileQueryProps: {
      enabled: canDownload && isObjectLinear,
    },
    getLinearPdfFileQueryParams: {
      task_id: objectData.data?.task_id,
    },
  })
  const DownloadFile = () => {
    const handleClick = () => {
      setCanDownload(true)
      setIsPdfOpen(true)
    }
    useState(() => {
      if (!isObjectLinear) {
        if (getPdfFileQuery.isLoading) {
          setIsPdfLoading(true)
        }
        if (getPdfFileQuery.isSuccess) {
          setIsPdfLoading(false)
          setPdfBase64(getPdfFileQuery?.data)
        }
      } else {
        if (getLinearPdfFileQuery.isLoading) {
          setIsPdfLoading(true)
        }
        if (getLinearPdfFileQuery.isSuccess) {
          setIsPdfLoading(false)
          setPdfBase64(getLinearPdfFileQuery?.data)
        }
      }
    }, [getPdfFileQuery, getLinearPdfFileQuery, isObjectLinear])
    return (
      <span className="cursor-pointer text-sm rounded-md text-white px-2 bg-blue-600 p-1 " onClick={handleClick}>
        PDF yuklash
      </span>
    )
  }
  function handleLabarantModalOpen() {
    setIsLabarantAddModalOpen(true)
  }
  function handleAddLabarant(result) {
    console.log(result)
    if (result === 'success') {
      setLabarantAddStatus('success')
      setStatusModalTitle('Labarant muvaffaqiyatli qo`shildi')
    }
    if (result === 'error') {
      setLabarantAddStatus('error')
      setStatusModalTitle('Labarant qo`shishda xatolik yuz berdi')
    }
    setIsOpenStatusModal(true)
    object.object.refetch()
  }

  const { getTestTypesQuery } = useTestTypes({
    getTestTypesProps: {
      enabled: isLabarantModalOpen,
    },
    getTestTypesParams: {
      contract_id: objectData?.data?.contract?.id,
    },
  })

  const { createLabarantMutation } = useLabarantCall({
    createLabarantMutationProps: {},
  })

  return (
    <>
      <div className="grid sm:grid-cols-12 gap-4">
        <div className="col-span-7">
          <Card
            title={!disabled ? `Obyekt: ${objectData.data?.task_id}` : `Ariza raqam: ${objectData.data?.task_id}`}
            rightElement={
              <div className="flex flex-col sm:flex-row space-y-1.5 sm:gap-x-1.5 align-middle items-baseline">
                <DownloadFile />
                <StatusTag title={data?.object_status} statusId={data?.object_status_id} />
              </div>
            }
          >
            <div className="grid grid-cols-12 items-center gap-4">
              <span className="input-label col-span-4">Obyekt nomi</span>
              <div className="col-span-8">
                <Textarea name="name" widthFull register={register} disabled={disabled} errors={errors} />
              </div>
              <span className="input-label col-span-4">Viloyat</span>
              <div className="col-span-8">
                <AsyncSelectPaginate
                  loadOptions={loadOptions}
                  name="region_id"
                  control={control}
                  disabled={disabled}
                  errors={errors}
                />
              </div>
              <span className="input-label col-span-4">Tuman</span>
              <div className="col-span-8">
                <Select
                  options={districts?.data?.districts?.map((item) => ({
                    label: item.ru_name,
                    value: item.id,
                  }))}
                  name="district_id"
                  control={control}
                  disabled={disabled || !watch('region_id')}
                  errors={errors}
                />
              </div>
              <span className="input-label col-span-4">Manzil</span>
              <div className="col-span-8">
                <Input widthFull name="address" register={register} disabled={disabled} errors={errors} />
              </div>
              {objectData?.data?.object_type?.id !== '79f40f51-0368-4b6c-8326-f83d0453a848' && (
                <>
                  {' '}
                  <span className="input-label col-span-4">Kadastr raqami</span>
                  <div className="col-span-8">
                    <Input widthFull name="cadastral_number" register={register} disabled={disabled} errors={errors} />
                  </div>
                </>
              )}
              <span className="input-label col-span-4">Murakkablik toifasi</span>
              <div className="col-span-8">
                <Select
                  options={difficultyCategories.data?.difficulty_categories?.map((item) => ({
                    label: item.difficulty,
                    value: item.id,
                  }))}
                  name="difficulty_category_id"
                  control={control}
                  onChange={handleSelectChange}
                  disabled={roleId !== REGISTRATURA_ROLE_ID}
                  errors={errors}
                />
              </div>
              <span className="input-label col-span-4">Qurilish-montaj ishlarining turi</span>
              <div className="col-span-8">
                <Select
                  options={constructionTypes.data?.construction_types?.map((item) => ({
                    label: item.type,
                    value: item.id,
                  }))}
                  name="construction_type_id"
                  control={control}
                  disabled={disabled}
                  errors={errors}
                />
              </div>
              <span className="input-label col-span-4">Qurilish-montaj ishlarining qiymati</span>
              <div className="col-span-8">
                <Input
                  widthFull
                  addonAfter={isEditting ? "So'm" : ''}
                  name="construction_cost"
                  register={register}
                  type={isEditting ? 'text' : 'number'}
                  disabled={disabled}
                  errors={errors}
                />
              </div>

              <span className="input-label col-span-4">Obyekt turi</span>
              <div className="col-span-8">
                <Input widthFull name="object_type" register={register} disabled={disabled} errors={errors} />
              </div>
              <span className="input-label col-span-4">Qurilish muddati</span>
              <div className="col-span-8">
                <DeadlineSlider
                  forByIdPage
                  created_at={objectData?.data?.created_at}
                  deadline={objectData?.data?.deadline}
                />
              </div>
              <span className="input-label col-span-4">Molyalashtirish manbai</span>
              <div className="col-span-8">
                <Input widthFull name="object_fund_source" register={register} disabled={disabled} errors={errors} />
              </div>
              <span className="input-label col-span-4">Dastur</span>
              <div className="col-span-8">
                <Input widthFull name="sector" register={register} disabled={disabled} errors={errors} />
              </div>
              <span className="input-label col-span-4">Soha</span>
              <div className="col-span-8">
                <Input widthFull name="category" register={register} disabled={disabled} errors={errors} />
              </div>
              {watch('object_images')?.length ? (
                <div className="col-span-12 grid grid-cols-12">
                  <span className="input-label col-span-4">Obyekt fotosuratlari</span>
                  <div className="col-span-8">
                    <div className="grid grid-cols-3 gap-3">
                      {watch('object_images').map((item, index) => (
                        <div
                          key={item}
                          className="rounded-[8px] relative overflow-hidden cursor-pointer"
                          onClick={() => setCurrentImage(index)}
                        >
                          <img
                            src={`${process.env.REACT_APP_CDN_IMAGE_URL}${item}`}
                            alt="inspector"
                            className="w-full h-full object-cover duration-700 transition-all scale-100 hover:scale-125"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex justify-end mt-4 gap-x-3">
              {roleId === BOSH_PRORAB_ROLE_ID && (
                <BtnFiled
                  className="border"
                  color="white"
                  children="Laborantni chaqirish"
                  leftIcon={<Flag htmlColor="primary" />}
                  onClick={handleCallLabarantOpen}
                />
              )}
              {permissions[roleId].includes('ADD/LABARANT/TO/OBJECT') && (
                <BtnFiled
                  leftIcon={<Add />}
                  onClick={handleLabarantModalOpen}
                  disabled={object.object?.data?.users?.some(
                    (el) =>
                      el?.role_id === YETAKCHI_LABARATORIYA_ROLE_ID ||
                      el?.role_id === BOSH_LABARATORIYA_ROLE_ID ||
                      el?.role_id === LABARATORIYA_BOSHLIGI_ROLE_ID
                  )}
                >
                  Labarant qo'shish
                </BtnFiled>
              )}
              {roleId === BOSH_PRORAB_ROLE_ID &&
                data?.object_status_id !== OBJECT_STATUS_ID_SUBMITTED &&
                data?.object_status_id !== OBJECT_STATUS_STOPPED && (
                  <BtnFiled
                    leftIcon={<HomeWork htmlColor="white" />}
                    color={data?.object_status_id === OBJECT_STATUS_FROZEN ? 'blue' : 'red'}
                    onClick={handleObjStatusModalOpen}
                  >
                    {data?.object_status_id === OBJECT_STATUS_FROZEN ? 'Ishni davom ettirish' : 'Muzlatish'}
                  </BtnFiled>
                )}
            </div>
          </Card>
          <TaskIdChangeCard
            taskId={parseInt(objectData.data?.task_id)}
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            control={control}
            watch={watch}
            deadline={objectData?.data?.deadline}
            objectData={objectData}
            reset={reset}
            objectTypeStatus={objectTypeStatus}
            setError={setError}
            // isHide={watch('sector') && watch('category')}
            // objectRefetch={objectRefetch}
          />
          <OrganizationSummaryForm
            isBuilding={objectStatusId === objectTypeId.building}
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            getValues={getValues}
            data={data}
          />

          <Card title="Obyekt joylashuvi" className="mt-4">
            <CustomMap setLocation={setLocation} location={location.length ? location : []} />
          </Card>
        </div>
        <div className="col-span-7 sm:col-span-5">
          <ParticipantsForm users={users} setIsOpen={setIsOpen} />
          <BlocksForm
            roleId={roleId}
            fields={fields}
            register={register}
            append={append}
            remove={remove}
            disabled={disabled}
          />
          {/* <AdditionalInfoForm register={register} /> */}
        </div>
      </div>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div
          className="text-[16px] font-medium py-2 px-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setValue('object_status_id', { id: OBJECT_STATUS_FROZEN, status: 'Muzlatilgan' })
            handleClose()
          }}
        >
          Muzlatilgan
        </div>
      </Popover>
      <ObjectRejectModal
        setValue={setValue}
        watch={watch}
        onSubmit={onSubmitObjStatusComment}
        errors={errors}
        blocks={[]}
        register={register}
        isOpen={isOpenObjStatusModal}
        handleClose={handleObjStatusModalClose}
      />
      <ImageViewer photos={watch('object_images')} currentImage={currentImage} setCurrentImage={setCurrentImage} />
      <PdfViewerModal
        isOpen={isPdfOpen}
        isPdfLoading={isObjectLinear ? getLinearPdfFileQuery.isLoading : getPdfFileQuery.isLoading}
        onClose={() => setIsPdfOpen(false)}
        base64={pdfBase64}
      />
      <LabarantAddModal
        open={isLabarantAddModalOpen}
        onClose={() => setIsLabarantAddModalOpen(false)}
        onAdd={(e) => handleAddLabarant(e)}
        oldLabarant={objectData.data?.users?.find(
          (item) =>
            item.role_id === YETAKCHI_LABARATORIYA_ROLE_ID ||
            item.role_id === BOSH_LABARATORIYA_ROLE_ID ||
            item.role_id === LABARATORIYA_BOSHLIGI_ROLE_ID
        )}
      />
      <StatusModal
        isOpen={isOpenStatusModal}
        title={statusModalTitle}
        handleClose={() => setIsOpenStatusModal(false)}
        status={labarantAddStatus}
      />
      <ModalComment
        options={getTestTypesQuery?.data?.data?.test_types?.map((item) => ({
          value: item?.id,
          label: item?.name,
        }))}
        isOpen={isLabarantModalOpen}
        handleClose={handleCallLabarantClose}
        violations={[{ tag: 'select', placeholder: 'Qidirish...', title: 'Sinov usulini tanlang', name: 'labaratory' }]}
        title="Laborantni chaqirish"
        btnText="Tasdiqlash"
        fn={(data) => handleCallLabarantSubmit(data)}
      />
    </>
  )
}
