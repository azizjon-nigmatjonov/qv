import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Add } from '@mui/icons-material'

import { BasicLayout, BasicTable, Header, Pagination, BtnFiled, FilterHeader, Input } from '../../components'
import { useLibrary } from '../../services'
import { permissions } from '../../settings/permissions'
import FilterPopup from '../../components/FilterPopup'
import { DownloadIcon } from '../../assets/icons'
import { SUPER_ADMIN_ROLE_ID } from '../../settings/constants'
import fileDownloader from '../../utils/fileDownloader'
import dateFormatter from '../../utils/dateFormatter'
import SearchIcon from '@mui/icons-material/Search'

export default function Library() {
  const { roleId, userTypeId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const [selected, setSelected] = useState()

  const { typeId } = useParams()

  const options = [
    {
      value: '068d66e7-6d9f-4089-ab01-d423f02a27f4',
      user_type_id: 'bd534c9a-f73e-46fd-b407-7742ec97caf0',
      label: 'Qurilish qatnashuvchilari',
    },
    {
      value: 'c9f74a64-77d4-409e-b9be-29b88eb34d20',
      user_type_id: 'b2ae4fc3-fd18-41f8-9d39-371ea09035d8',
      label: 'GASN xodimlari',
    },
  ]

  const isSuperAdmin = roleId === SUPER_ADMIN_ROLE_ID

  const { libraries, deleteLibraryMutation } = useLibrary({
    offset,
    search,
    deleteLibraryProps: {
      onSuccess: () => {
        toast.success("Muvaffaqqiyatli o'chirildi")
        libraries.refetch()
      },
    },
    limit,
    department_id: isSuperAdmin ? selected?.value : options.find((i) => i.user_type_id === userTypeId)?.value,
    type_id: typeId,
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Nom',
      key: 'name',
    },
    {
      title: "Qo'shilgan sana",
      key: 'created_at',
      render: (val) => <>{dateFormatter(format, new Date(val), 'dd.MM.yyyy')}</>,
    },
    {
      title: 'Fayl',
      key: 'file_url',
      render: (val) =>
        val && (
          <div className="flex justify-between items-center" onClick={() => fileDownloader(val)}>
            <span>{`${val?.slice(0, 15)} ... .${val?.split('.')[val?.split('.').length - 1]}`}</span>
            <div className="px-3 py-1 bg-blue-100 rounded-md">
              <DownloadIcon />
            </div>
          </div>
        ),
    },
    {
      title: <FilterPopup title="Bo'lim" options={options} selected={selected} setSelected={setSelected} />,
      key: 'department',
      render: (val) => <span>{val.name}</span>,
    },
  ]

  return (
    <div className="h-screen">
      <Header
        title="Kutubxona"
        backLink={-1}
        rightElement={
          permissions[roleId]?.includes('LIBRARY/ADD') && (
            <BtnFiled leftIcon={<Add />} onClick={() => navigate('add')}>
              Qo'shish
            </BtnFiled>
          )
        }
      />
      <FilterHeader
        leftElements={[
          <Input
            placeholder="Поиск..."
            height={36}
            name="search"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
          />,
        ]}
      />
      <div className="sidebar-header-filter-calc">
        <BasicLayout
          footer={
            <Pagination
              count={libraries.data?.data?.count}
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => {
                setLimit(limitNumber)
              }}
              limit={limit}
            />
          }
        >
          <BasicTable
            offset={offset}
            limit={limit}
            hasActions={permissions[roleId]?.includes('LIBRARY/COLUMNS')}
            headColumns={
              permissions[roleId]?.includes('LIBRARY/COLUMNS')
                ? headData
                : headData.filter((i) => i.key !== 'department')
            }
            rowLink={''}
            // clickHandler={(id) => (!permissions[roleId]?.includes('LIBRARY/EDIT') ? navigate(`${id}/add`) : null)}
            bodyColumns={libraries.data?.data?.libraries}
            deleteFunc={(id) => deleteLibraryMutation.mutate({ id })}
            isLoading={libraries.isLoading}
            desiredRowName="id"
          />
        </BasicLayout>
      </div>
    </div>
  )
}
