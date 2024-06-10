import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import {
  BasicTable,
  FilterHeader,
  Header,
  Input,
  BasicLayout,
  Pagination,
  StatusTag,
  BtnFiled,
  MuiTabs,
} from '../../components'
import FilterPopup from '../../components/FilterPopup'
import { AddIcon } from '../../assets/icons'
import { useUser } from '../../services/useUser'
import {
  BUHGALTER_TYPE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  INSPEKTOR_TYPE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
  YURIST_ROLE_ID,
  YURIST_TYPE_ID,
} from '../../settings/constants'
import { useRegion } from '../../services'
import { useQuery } from '../../hooks/useQuery'
import phoneNumberFormatter from '../../utils/phoneNumberFormatter'
import DownloadBadge from '../../components/DownloadBadge/DownloadBadge'
import dateFormatter from '../../utils/dateFormatter'
import useRotation from '../../services/useRotation'
import { KeyboardArrowRightOutlined } from '@mui/icons-material'

export default function AllList() {
  const { t } = useTranslation('common')

  const navigate = useNavigate()
  let { pathname } = useLocation()
  const { regionId, roleId } = useSelector((state) => state.auth)
  const query = useQuery()

  const [activeTab, setActiveTab] = useState(+query.get('tab') || 0)
  const isSuperAdmin = roleId === SUPER_ADMIN_ROLE_ID

  const pageInfo = {
    list: {
      title: 'Mutaxassislar',
      route: '/employees/list',
    },
    manager: {
      title: "Inspeksiya va bo'lim boshliqlari",
      route: '/employees/manager',
    },
    archive: {
      title: 'Arxiv',
      route: '/employees/archive',
    },
    rotation: {
      title: 'Rotatsiya',
      route: '/employees/rotation',
    },
    inspector: {
      title: 'Inspektorlar',
      route: '/employees/inspector',
    },
    accounting: {
      title: 'Buxgalteriya',
      route: '/employees/accounting',
    },
    lawyer: {
      title: 'Yurist',
      route: '/employees/lawyer',
    },
    participants: {
      title: 'Qurilish qatnashuvchilari',
      route: '/employees/participants',
    },
  }

  const tabElements = [
    { key: 0, title: 'Rotatsiya' },
    { key: 1, title: 'Arxiv' },
  ]

  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')

  useEffect(() => {
    setOffset(+query.get('offset') || 1)
    setLimit(+query.get('limit') || 10)
    setActiveTab(+query.get('tab') || 0)
  }, [query])

  const { regions } = useRegion({
    limit: 15,
    regionProps: {
      enabled: !!isSuperAdmin,
      select: (data) => {
        return data?.regions?.map((region) => ({
          label: region?.uz_name,
          value: region?.id,
        }))
      },
    },
  })

  const { users, managers } = useUser({
    usersProps: {
      enabled: pathname.includes('employees/list') || pathname.includes('employees/rotation'),
    },
    role_id: pathname.includes('employees/rotation')
      ? [INSPEKTOR_BOSH_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID, INSPEKTOR_TYPE_ID, INSPEKTOR_YETAKCHI_ROLE_ID]
      : undefined,
    offset,
    limit,
    search,
    region_id: isSuperAdmin ? selected?.value : regionId,
    user_type_id: pathname.includes('employees/list')
      ? 'b2ae4fc3-fd18-41f8-9d39-371ea09035d8'
      : pathname.includes('participants')
      ? 'bd534c9a-f73e-46fd-b407-7742ec97caf0'
      : undefined,
    // Bo'shatilgan user id
    statusId: pathname.includes('employees/archive') ? 'f386319c-7717-402e-9529-815c4cc95c8f' : '',
    client_type_id: pathname.includes('employees/inspector')
      ? [INSPEKTOR_TYPE_ID]
      : pathname.includes('employees/accounting')
      ? [BUHGALTER_TYPE_ID]
      : pathname.includes('employees/lawyer')
      ? [YURIST_TYPE_ID]
      : undefined,
    managersProps: {
      enabled: !!pathname.includes('employees/manager'),
    },
    // role_id:
    //   pathname.includes('inspector') || pathname.includes('rotation')
    //     ? [INSPEKTOR_BOSH_ROLE_ID, INSPEKTOR_YETAKCHI_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID]
    //     : undefined,

    usersProps: {
      enabled: true,
    },
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'F.I.O',
      key: ['surname', 'name', 'middle_name'],
      render: (val) => <>{`${val[0]} ${val[1]} ${val[2]}`}</>,
    },
    {
      title: 'Tumani',
      key: 'district',
      render: (val) => <span>{val?.uz_name}</span>,
    },
    {
      title: 'Telefon raqami',
      key: 'phone',
      render: (val) => <>{phoneNumberFormatter(val)}</>,
    },
    {
      title: (
        <FilterPopup
          placeholder="Viloyatni tanlang"
          title="Viloyat"
          options={regions.data}
          selected={selected}
          setSelected={setSelected}
        />
      ),
      key: ['region', 'district'],
      render: (val) => (
        <span>
          {val[0]?.uz_name}
          {', '}
          {val[1]?.uz_name}
        </span>
      ),
    },
    {
      title: 'Lavozimi',
      key: 'role_name',
    },
    {
      title: 'Holati',
      key: ['status'],
      render: (value) => <StatusTag statusId={value[0]?.id} title={value[0]?.name} />,
    },
    {
      title: 'Buyruq sanasi',
      key: 'created_at',
      render: (value) => value && dateFormatter(format, new Date(value), 'dd.MM.yyyy'),
    },
  ]

  const archiveHead = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Sana',
      key: 'created_at',
    },
    {
      title: 'F.I.O',
      key: ['first_inspector_name', 'second_inspector_name'],
      render: (fullName) => (
        <div>
          {fullName[0]} <KeyboardArrowRightOutlined /> {fullName[1]}
        </div>
      ),
    },
    {
      title: 'Buyruq',
      key: ['order'],
      render: (value) => <DownloadBadge value={value[0]} />,
    },
    {
      title: 'Buyruq sanasi',
      key: 'order_date',
    },
  ]
  const { rotations } = useRotation({
    offset,
    limit,
    search,
    region_id: isSuperAdmin ? selected?.value : regionId,
    rotationsProps: {
      enabled: !!activeTab,
    },
  })
  return (
    <div className="h-screen">
      <Header
        title={pageInfo[pathname.split('/').slice(-1)[0]]?.title}
        backLink={'/employees/list'}
        rightElement={
          pathname.includes('employees/list') && (
            <BtnFiled color="blue" leftIcon={<AddIcon />} type="submit" onClick={() => navigate('add')}>
              Yangi xodim qo'shish
            </BtnFiled>
          )
        }
      />
      <FilterHeader
        leftElements={[
          <Input
            key="key"
            onChange={(e) => setTimeout(() => setSearch(e.target.value), 300)}
            className="pl-[8px] pr-[8px]"
            height={36}
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
            placeholder={t('search', { dots: '...' })}
          />,
        ]}
      />
      <div className="sidebar-header-calc" style={{ height: 'calc(100vh - 112px)' }}>
        <BasicLayout
          header={
            pathname.includes('employees/rotation') && (
              <MuiTabs activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />
            )
          }
          footer={
            <Pagination
              count={
                pathname.includes('employees/manager')
                  ? managers?.data?.count
                  : activeTab === 1
                  ? rotations.data?.count
                  : users?.data?.count
              }
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
            headColumns={
              isSuperAdmin
                ? headData.filter((i) => i.key !== 'created_at')
                : activeTab === 1
                ? archiveHead
                : pathname.includes('employees/manager') || !isSuperAdmin
                ? headData.filter((i) => !i.key?.includes('region'))
                : headData
            }
            bodyColumns={
              pathname.includes('employees/manager')
                ? managers.data?.users
                : activeTab === 1
                ? rotations.data?.rotation
                : users.data?.users
            }
            rowLink={activeTab !== 1 ? pathname : false}
            isLoading={pathname.includes('employees/manager') ? managers.isLoading : users.isLoading}
          />
        </BasicLayout>
      </div>
    </div>
  )
}
