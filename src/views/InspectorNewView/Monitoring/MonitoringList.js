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

export function MonitoringListV2() {
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

  const handleMonitoring = () => {
    if (haveForeman) handleOpen()
    else toast.error('Bu obyektga prorab biriktirilmagan!')
  }

  return (
    <div className="h-screen">
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
