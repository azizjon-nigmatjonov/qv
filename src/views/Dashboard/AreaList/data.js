import { useTranslation } from 'react-i18next'
import { useDistrict, useRegion } from '../../../services'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

export const HeadTitle = ({  }) => {
  const [searchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const {regionId, districtId} = searchParamsMemo
  const { regionItself } = useRegion({ id: regionId, regionItselfProps: { enabled: !!regionId && !districtId } })
  const { district } = useDistrict({ id: districtId })
  if (districtId) {
    return <span>{district?.data?.district?.uz_name}</span>
  } else if (regionId) {
    return <span>{regionItself?.data?.region?.uz_name}</span>
  } else {
    return <span>Markaziy apparat</span>
  }
}

export const tabName = (user) => {
  switch (user) {
    case 'inspectors':
      return 'Inspectors'
    case 'foreman':
      return 'Foreman'
    case 'author':
      return 'Author'
    case 'technical_supervisors':
      return 'TechnicalSupervisors'
    case 'internal_supervisors':
      return 'InternalSupervisors'
    default:
      return 'All'
  }
}

export const filterOptions = (type) => {
  switch (type) {
    case 'objects':
      return [
        //transfer all values to CamelCase
        { value: 'count', label: 'Jami' },
        { value: 'complated_count', label: 'Foydalanishga topshirilgan' },
        { value: 'under_control', label: 'Nazoratda' },
        {
          value: 'in_progress_with_new',
          label: 'Jarayonda',
        },
        {
          value: 'stopped_by_inspector',
          label: 'Qurilish to`xtatilgan',
        },
        { value: 'stopped_by_builder', label: 'Qurilish muzlatilgan' },
        { value: 're_formalized_object', label: 'Qayta rasmiylashtirilgan' },
      ]
    case 'monitorings':
      return [
        { value: 'Count', label: 'Jami' },
        { value: 'Done', label: 'O’tkazilgan' },
        { value: 'Delayed', label: 'Muddati o`tgan' },
      ]
    case 'regulations':
      return [
        { value: 'Count', label: 'Jami' },
        { value: 'Completed', label: 'Jarayonda' },
        { value: 'InProgress', label: 'Ijrosi ta`minlangan' },
        { value: 'DelayedNotCompleted', label: 'Kechiktirilgan' },
        { value: 'DelayedCompleted', label: "Kechiktirib ijrosi ta'minlangan" },
      ]
    case 'violations':
      return [
        { value: 'Count', label: 'Jami' },
        { value: 'Determined', label: 'Aniqlangan' },
        { value: 'Inprogress', label: 'Jarayonda' },
        { value: 'Fixed', label: 'Bartaraf etilgan' },
        { value: 'Delayed', label: 'Muddati o’tgan' },
      ]
    case 'activeness':
      return [
        { value: 'all', label: 'Barchasi' },
        { value: '1', label: 'Faol' },
        { value: '2', label: 'Nofaol' },
        { value: '3', label: 'O`rtacha faol' },
      ]
    case 'registered':
      return [
        { value: 'all', label: 'Barchasi' },
        { value: '4', label: 'Tizimga kirganlar' },
        { value: '5', label: 'Tizimga kirmaganlar' },
      ]
    default:
      return []
  }
}
export const objectsHeadColumns = (head) => {
  switch (head) {
    case 'zone':
      return [
        { title: '№', key: 'order' },
        { title: 'Hudud nomi', key: 'zone_name' },
        {
          title: 'Obyektlar',
          key: 'objects',
          columns: [
            { title: 'Ro`yxatga olingan', key: 'registered_count' },
            { title: 'Jarayonda', key: 'in_progress' },
            { title: 'To`xtatilgan', key: 'stopped' },
            { title: 'Muzlatilgan', key: 'freezed' },
          ],
        },
        {
          title: 'Monitoring',
          key: 'monitorings',
          columns: [
            { title: 'Rejadagi', key: 'planned' },
            { title: 'O’tkazilgan', key: 'done' },
            { title: 'Muddati o`tgan', key: 'delayed' },
          ],
        },
        {
          title: 'Yozma ko’rsatmalar',
          key: 'regulations',
          columns: [
            { title: 'Berilgan', key: 'issued' },
            { title: 'Jarayonda', key: 'in_progress' },
            { title: 'Ijrosi ta`minlangan', key: 'completed' },
            { title: 'Kechiktirilgan', key: 'delayed_not_completed' },
            { title: "Kechiktirib ijrosi ta'minlangan", key: 'delayed_completed' },
          ],
        },
        {
          title: 'Qoidabuzarliklar',
          key: 'violations',
          columns: [
            { title: 'Aniqlangan', key: 'determined' },
            { title: 'Jarayonda', key: 'in_progress' },
            { title: 'Bartaraf etilgan', key: 'fixed' },
            { title: 'Muddati o’tgan', key: 'delayed' },
          ],
        },
        { title: 'Ma`muriy javobgarlik qo`llanilganlik soni', key: 'responsibility_count' },
        { title: 'Foydalanishga topshirilgan obyektlar soni', key: 'comissioned_count' },
      ]
    case 'objects':
      return [
        { title: '№', key: 'order' },
        { title: 'Ariza raqami', key: 'object_number' },
        { title: 'Buyurtmachi', key: 'customer' },
        { title: 'Obyekt nomi', key: 'object_name' },
        { title: 'Manzil', key: 'address' },
        { title: 'Inspektor', key: 'inspector' },
        { title: 'Texnik nazoratchi', key: 'technical_inspector' },
        { title: 'Loyihachi', key: 'builder' },
        { title: 'Muallif nazoratchi', key: 'author_inspector' },
        { title: 'Prorab', key: 'foreman' },
        {
          title: 'Monitoring',
          key: 'monitoring',
          columns: [
            { title: 'Rejadagi', key: 'planned' },
            { title: 'O’tkazilgan', key: 'done' },
            { title: 'Muddati o`tgan', key: 'delayed' },
          ],
        },
        {
          title: 'Yozma ko’rsatmalar',
          key: 'regulations',
          columns: [
            { title: 'Berilgan', key: 'issued' },
            { title: 'Jarayonda', key: 'in_progress' },
            { title: 'Ijrosi ta`minlangan', key: 'completed' },
            { title: 'Kechiktirilgan', key: 'delayed_not_completed' },
            { title: "Kechiktirib ijrosi ta'minlangan", key: 'delayed_completed' },
          ],
        },
        {
          title: 'Qoidabuzarliklar',
          key: 'violations',
          columns: [
            { title: 'Aniqlangan', key: 'determined' },
            { title: 'Jarayonda', key: 'in_progress' },
            { title: 'Bartaraf etilgan', key: 'fixed' },
            { title: 'Muddati o`tgan', key: 'delayed' },
          ],
        },
        { title: 'Ma`muriy javobgarlik qo`llanilganlik soni', key: 'responsibility_count' },
        {
          title: 'Xizmatlar narxi',
          key: 'service_price',
          columns: [
            { title: 'Jami', key: 'total' },
            { title: 'To’langan', key: 'paid' },
            { title: 'Qoldiq', key: 'debt' },
          ],
        },
        {
          title: 'Holati',
          key: 'status',
        },
      ]
    default:
      return []
  }
}
