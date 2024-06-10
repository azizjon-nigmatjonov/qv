import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { BtnFiled, BtnOutlined, Card, Header, Input, Select, Textarea } from '../../../components'
import CustomPhoneInput from '../../../components/CustomPhoneInput'
import { useRegion } from '../../../services'
import { useLaboratoryRequisite } from '../../../services/laboratory-requisite'

const RequisitesEdit = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  })
  const navigate = useNavigate()
  const { id } = useParams()
  const { pathname } = useLocation()
  const isLaboratory = pathname.includes('laboratory-requisites')

  const { region, regionRequisiteUpdataMutation, regionRequisiteUpdateMutationPost, regions } = useRegion({
    id: id !== 'edit' ? id : undefined,
    offset: 1,
    limit: 14,
    regionRequisiteUpdataProps: {
      onSuccess: () => navigate(-1),
    },
    regionRequisiteUpdateMutationPostProps: {
      onSuccess: () => navigate(-1),
    },
    regionIdProps: {
      enabled: !isLaboratory && id !== 'edit',
    },
    regionProps: {
      enabled: true,
    },
    regionsParams: {
      limit: 15,
    },
  })

  const { laboratoryRequisite, laboratoryRequisitePut, laboratoryRequisitePostMutation } = useLaboratoryRequisite({
    laboratoryRequisiteProps: {
      enabled: isLaboratory && id !== 'edit',
    },
    id: id !== 'edit' ? id : '',
    laboratoryRequisitePutProps: {
      onSuccess: () => navigate(-1),
    },
    laboratoryRequisitePostProps: {
      onSuccess: () => navigate(-1),
    },
  })

  const onSubmit = (data) => {
    const { org_name, address, phone, region_id } = data
    if (isLaboratory && !pathname.includes('edit')) {
      laboratoryRequisitePut.mutate({
        lab_name: org_name,
        lab_address: address,
        lab_phone: phone,
        region_id: region_id?.value,
        region_name_uz: region_id?.label,
        id,
      })
    } else if (!isLaboratory && pathname.includes('edit')) {
      const {
        accaunt_number,
        address,
        bank_code,
        bank_name,
        complaince_email,
        complaince_phone,
        ifud,
        org_name,
        phone,
        region_id,
        stir,
      } = data
      regionRequisiteUpdateMutationPost.mutate({
        accaunt_number,
        address,
        bank_code,
        bank_name,
        complaince_email,
        complaince_phone,
        ifud,
        org_name,
        phone,
        region_id: region_id?.value,
        stir,
      })
    } else {
      isLaboratory
        ? laboratoryRequisitePostMutation.mutate({
            lab_name: org_name,
            lab_address: address,
            lab_phone: phone,
            region_id: region_id?.value,
            region_name_uz: region_id?.label,
          })
        : regionRequisiteUpdataMutation.mutate({
            ...data,
            id,
            requisite: data.requisite,
          })
    }
  }

  useEffect(() => {
    if (region.data && !isLaboratory) {
      const {
        address,
        bank_code,
        bank_name,
        complaince_email,
        complaince_phone,
        ifud,
        region_id,
        region_name_uz,
        org_name,
        phone,
        stir,
        accaunt_number,
      } = region.data
      // setValue('requisite', region.data?.region?.requisite)
      // setValue('object_id', { label: region.data?.region?.uz_name, value: region.data?.region?.id })
      reset({
        requisite: region.data?.region?.requisite,
        region_id: { label: region_name_uz, value: region_id },
        address,
        bank_code,
        bank_name,
        complaince_email,
        complaince_phone,
        ifud,
        org_name,
        phone,
        stir,
        accaunt_number,
      })
    } else if (laboratoryRequisite.data && isLaboratory) {
      const { lab_name, lab_address, lab_phone, region_id, region_name_uz } = laboratoryRequisite.data?.data
      reset({
        org_name: lab_name,
        address: lab_address,
        phone: lab_phone,
        region_id: { label: region_name_uz, value: region_id },
      })
    }
  }, [region.data, laboratoryRequisite.data])

  return (
    <div className="h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="Yaratish"
          backLink={-1}
          rightElement={
            <div className="flex gap-3">
              <BtnOutlined leftIcon={<CancelIcon />} color="red" type="button" onClick={() => navigate(-1)}>
                Bekor qilish
              </BtnOutlined>
              <BtnFiled leftIcon={<SaveIcon />} type="submit">
                Saqlash
              </BtnFiled>
            </div>
          }
        />
        <div className="sidebar-header-calc">
          <Card title="Umimiy ma'lumot" className="w-1/2 overflow-visible">
            <span className="input-label">Viloyat</span>
            <Select
              errors={errors}
              required
              options={regions.data?.regions?.map((item) => ({ label: item?.uz_name, value: item?.id }))}
              control={control}
              name="region_id"
            />
            <span className="input-label mt-4">{isLaboratory ? 'Laboratoriya' : 'Tashkilot'} nomi</span>
            <Input widthFull required control={control} errors={errors} register={register} name="org_name" />
            <span className="input-label mt-4">Tashkilot manzili</span>
            <Input widthFull required control={control} errors={errors} register={register} name="address" />

            {!isLaboratory && (
              <>
                <span className="input-label mt-4">Hisob raqam</span>
                <Input widthFull required control={control} errors={errors} register={register} name="accaunt_number" />
                <div className="flex gap-x-3 mt-4">
                  <div className="w-full">
                    <span className="input-label">Bank nomi</span>
                    <Input widthFull required control={control} errors={errors} register={register} name="bank_name" />
                  </div>
                  <div className="w-full">
                    <span className="input-label">Bank kodi</span>
                    <Input widthFull required control={control} errors={errors} register={register} name="bank_code" />
                  </div>
                </div>
                <div className="flex gap-x-3 mt-4">
                  <div className="w-full">
                    <span className="input-label">STIR</span>
                    <Input widthFull required control={control} errors={errors} register={register} name="stir" />
                  </div>
                  <div className="w-full">
                    <span className="input-label">IFTUT</span>
                    <Input widthFull required control={control} errors={errors} register={register} name="ifud" />
                  </div>
                </div>
              </>
            )}

            <span className="input-label mt-4">Telefon raqami</span>
            <CustomPhoneInput widthFull required control={control} register={register} errors={errors} name="phone" />
            {/* <Input widthFull required control={control} errors={errors} register={register} name="phone" /> */}
            {!isLaboratory && (
              <>
                <span className="input-label mt-4">Komplayns email</span>
                <Input
                  widthFull
                  required
                  control={control}
                  register={register}
                  errors={errors}
                  name="complaince_email"
                />
                <span className="input-label mt-4">Komplayns tel</span>
                <CustomPhoneInput
                  widthFull
                  required
                  control={control}
                  register={register}
                  errors={errors}
                  name="complaince_phone"
                />
              </>
            )}

            {/* <span className="input-label mt-4">Rekvizit</span>
            <Textarea rows={4} errors={errors} required widthFull register={register} name="requisite" /> */}
          </Card>
        </div>
      </form>
    </div>
  )
}

export default RequisitesEdit
