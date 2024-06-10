import { format } from 'date-fns'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BasicLayout, BasicTable, BtnFiled, FilterHeader, Header, Input, Pagination, StatusTag } from '../../components'
import FilterPopup from '../../components/FilterPopup'
import { useRegion, useUser } from '../../services'
import { SUPER_ADMIN_ROLE_ID } from '../../settings/constants'
import dateFormatter from '../../utils/dateFormatter'
import phoneNumberFormatter from '../../utils/phoneNumberFormatter'
import { useQuery } from '../../hooks/useQuery'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { AddIcon } from '../../assets/icons'

export const Acceptance = () => {
  const { regionId, roleId } = useSelector((state) => state.auth)
  const query = useQuery()

  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const isSuperAdmin = roleId === SUPER_ADMIN_ROLE_ID

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

  const { users } = useUser({
    usersProps: {
      enabled:
        pathname.includes('employees/list') ||
        pathname.includes('employees/rotation') ||
        pathname.includes('employees/acceptance'),
    },
    offset,
    limit,
    search,
    region_id: isSuperAdmin ? selected?.value : regionId,
    user_type_id: 'e2dc35e6-28d0-4616-a303-9b33c90484d2',
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
  return (
    <div className="h-screen">
      <Header
        title="Priyomka xodimlari"
        backLink={'/employees/list'}
        rightElement={
          pathname.includes('employees/acceptance') && (
            <BtnFiled color="blue" leftIcon={<AddIcon />} type="submit" onClick={() => navigate('/employees/list/add')}>
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
            placeholder="search"
          />,
        ]}
      />
      <div className="sidebar-header-calc" style={{ height: 'calc(100vh - 112px)' }}>
        <BasicLayout
          // header={
          //   pathname.includes('employees/rotation') && (
          //     <MuiTabs activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />
          //   )
          // }
          footer={
            <Pagination
              count={users?.data?.count}
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
            headColumns={headData.filter((i) => i.key !== 'created_at')}
            bodyColumns={users.data?.users}
            rowLink="/employees/list"
            isLoading={users.isLoading}
          />
        </BasicLayout>
      </div>
    </div>
  )
}
