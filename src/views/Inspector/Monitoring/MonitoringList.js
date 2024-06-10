import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import { useState } from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import {
  BasicLayout,
  BasicTable,
  BtnFiled,
  BtnOutlined,
  FilterHeader,
  Header,
  Input,
  Pagination,
  Tabs,
} from '../../../components'
import { ArrowDownIcon, AddIcon } from '../../../assets/icons'
import { useMonitoring } from '../../../services/useMonitoring'
import ConfirmModal from '../../../components/ConfirmModal'
import { BOSH_PRORAB_ROLE_ID, TEXNIK_NAZORATCHI_ROLE_ID } from '../../../settings/constants'
import dateFormatter from '../../../utils/dateFormatter'
import { useObject } from '../../../services'
import toast from 'react-hot-toast'

export function MonitoringList() {
  const { id } = useParams()
  const { roleId } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const { monitoringList } = useMonitoring({
    monitoringQueryProps: {
      enabled: true,
    },
    getParams: {
      offset,
      limit,
      object_id: id,
    },
    objectId: id,
  })

  const { object } = useObject({
    id,
  })

  const haveForeman = object.data?.users?.find((user) => user.role_id === BOSH_PRORAB_ROLE_ID)

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Sana',
      key: 'created_at',
      render: (value) => value && dateFormatter(format, new Date(value), 'dd.MM.yyyy'),
    },
    {
      title: "Berilgan ko'rsatmalar",
      key: 'given',
      render: (value) => value ?? 0,
    },
    {
      title: "Faol ko'rsatmalar",
      key: 'active',
      render: (value) => value ?? 0,
    },
    {
      title: 'Yopilganlar',
      key: 'closed',
      render: (value) => value ?? 0,
    },
    {
      title: "Muddati o'tgan",
      key: 'expired',
      render: (value) => value ?? 0,
    },
    {
      title: "Muddati o'tib yopilgan",
      key: 'expired_closed',
      render: (value) => value ?? 0,
    },
  ]

  const tabLinks = [
    {
      key: 'main-data',
      title: "Asosiy ma'lumotlar",
      path: `/inspectors/${id}`,
    },
    {
      key: 'hujjatlar',
      title: 'Hujjatlar',
      path: `/inspectors/${id}/documents`,
    },
    {
      key: 'monitoring',
      title: 'Monitoring',
      path: `/inspectors/${id}/monitoring`,
    },
    {
      key: 'instructions',
      title: "Yozma ko'rsatmalar",
      path: `/inspectors/${id}/instructions`,
    },
    {
      key: 'journal',
      title: 'Ijro hujjatlari',
      path: `/inspectors/${id}/journal`,
    },
    {
      key: 'photo-reports',
      title: 'Foto hisobot',
      path: `/inspectors/${id}/photo-reports`,
    },
    {
      key: 'payment',
      title: 'To`lovlar',
      path: `/inspectors/${id}/payment`,
    },
    {
      key: 'calendar',
      title: 'Nazorat kalendari',
      path: `/inspectors/0c32ffb9-2cae-44d8-acd9-735ede261d1f/calendar/${object.data?.task_id}`,
    },
  ]

  const handleMonitoring = () => {
    if (haveForeman) handleOpen()
    else toast.error('Bu obyektga prorab biriktirilmagan!')
  }

  return (
    <div className="h-screen">
      <Header
        title=""
        backLink="/inspectors"
        centerElement={<Tabs elements={tabLinks} />}
        rightElement={
          roleId === TEXNIK_NAZORATCHI_ROLE_ID && (
            <BtnFiled color="blue" leftIcon={<AddIcon />} onClick={handleMonitoring}>
              Monitoringdan o'tkazish
            </BtnFiled>
          )
        }
      />
      <FilterHeader
        leftElements={[
          <Input
            name="search"
            onChange={() => {}}
            className="pl-[8px] pr-[8px]"
            height={36}
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
            placeholder="Qidirish..."
          />,
          <BtnOutlined
            leftIcon={<PersonIcon fontSize="medium" className="text-primary" />}
            rightIcon={<ArrowDownIcon />}
          >
            Lavozimlar
          </BtnOutlined>,
        ]}
      />
      <ConfirmModal
        isOpen={isOpen}
        title="Monitoringdan o'tkazishni tasdiqlaysizmi?"
        handleClose={handleClose}
        fn={() => navigate('add')}
      />
      <div className="sidebar-header-filter-calc">
        <BasicLayout
          title="Monitoring tarixi"
          footer={
            <Pagination
              count={monitoringList.data?.data?.count}
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => setLimit(limitNumber)}
              limit={limit}
            />
          }
        >
          <BasicTable
            offset={offset}
            limit={limit}
            headColumns={headData}
            isLoading={monitoringList.isLoading}
            bodyColumns={monitoringList.data?.data?.monitory_list}
            rowLink={``}
          />
        </BasicLayout>
      </div>
    </div>
  )
}
