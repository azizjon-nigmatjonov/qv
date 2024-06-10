import { useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import useAcceptance from '../../../services/useAcceptance'
import { BtnFiled, Card, Input } from '../../../components'
import { ACCEPTANCE_CHECKED, ACCEPTANCE_NEW_ID, ACCEPTANCE_SENT_TO_LK } from '../../../settings/constants'
import { RightArrowIcon } from '../../../assets/icons'

const SecondStep = ({ register, getValues, id, acceptance, scrollToEl }) => {
  const { sendToOrganizationMutation, updateAcceptanceMutation } = useAcceptance({
    sendToOrganizationProps: {
      onSuccess: () => {
        acceptance.refetch()
      },
    },
  })

  useEffect(() => {
    if (acceptance.data?.status_id === ACCEPTANCE_SENT_TO_LK) {
      scrollToEl(3)
    }
  }, [acceptance.data])

  return (
    <div className="w-full">
      <Card title={`Bino va inshootlar haqida ma'lumotlar`} className="w-1/2">
        <span className="input-label">Turar-joy turi</span>
        <Input disabled widthFull register={register} name="building_type" />
        <span className="input-label mt-4">Obyekt turi</span>
        <Input disabled widthFull register={register} name="type_object" />
        <span className="input-label mt-4">Kadastr raqami</span>
        <Input disabled widthFull register={register} name="building_cadastral" />
        <span className="input-label mt-4">Loyiha hujjatlariga muvofiq binoning nomlari</span>
        <Input disabled widthFull register={register} name="pinfl" />
        <span className="input-label mt-4">Bino manzili</span>
        <Input disabled widthFull register={register} name="building_address" />
        <span className="input-label mt-4">Viloyat</span>
        <Input disabled widthFull register={register} name="region" />
        <span className="input-label mt-4">Tuman</span>
        <Input disabled widthFull register={register} name="district" />
        <span className="input-label mt-4">Obyekt proyekti</span>
        <div
          className="border rounded-md p-3 py-2 bg-gray-100"
          dangerouslySetInnerHTML={{ __html: getValues('cadastral_passport_object') }}
        />
        <span className="input-label mt-4">
          Tuman hokimining yer uchastkasi berish to'g'risidagi qarorining raqami va sanasi
        </span>
        <Input disabled widthFull register={register} name="number_date_resignation_district_hokim" />
        <span className="input-label mt-4">Obyekt turi</span>
        <div
          className="border rounded-md p-3 py-2 bg-gray-100"
          dangerouslySetInnerHTML={{ __html: getValues('extract_register_object') }}
        />
        <span className="input-label mt-4">INN</span>
        <Input disabled widthFull register={register} name="tin_project_organization" />
        <div className="flex justify-end mt-4 justify-between">
          <BtnFiled leftIcon={<ArrowBackIcon fontSize="small" />} onClick={() => scrollToEl(1)}>
            Oldingisi
          </BtnFiled>
          <BtnFiled
            disabled={updateAcceptanceMutation.isLoading || sendToOrganizationMutation.isLoading}
            rightIcon={<RightArrowIcon className="mb-1" color="white" />}
            onClick={() => {
              if (
                ACCEPTANCE_SENT_TO_LK === acceptance.data?.status_id ||
                ACCEPTANCE_CHECKED === acceptance.data?.status_id
              ) {
                scrollToEl(3)
              } else {
                updateAcceptanceMutation.mutate({
                  acceptance_id: id,
                  inspector_is_accepted: false,
                  status_id: 'a6f16f58-9307-4fe7-85b7-a93581caf1c5',
                })
                sendToOrganizationMutation.mutate({
                  acception_response_id: id,
                  actions: [
                    {
                      organization_name: 'ekolog',
                      organization_user_id: '29791794-f2ad-4a09-b9b9-db17fa9bffcd',
                    },
                    {
                      organization_name: 'ses',
                      organization_user_id: '4a1af4f0-6ee4-4316-8516-7639d9855ede',
                    },
                    {
                      organization_name: 'mchs',
                      organization_user_id: '72b64d51-f91e-4be7-9859-2e776b8cea19',
                    },
                    {
                      organization_name: 'nogiron',
                      organization_user_id: 'ab36c448-509e-4327-97ae-2e7452d336fb',
                    },
                    {
                      organization_name: '5-tashkilot ismi',
                      organization_user_id: 'ce699be0-802c-4c18-9038-d58dcbabe6e7',
                    },
                  ],
                })
              }
            }}
          >
            {ACCEPTANCE_NEW_ID !== acceptance.data?.status_id ? 'Keyingisi' : 'Tashkilotga yuborish'}
          </BtnFiled>
        </div>
      </Card>
    </div>
  )
}

export default SecondStep
