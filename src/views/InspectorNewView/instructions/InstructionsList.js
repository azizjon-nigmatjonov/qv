import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import { BasicLayout, BasicTable, Header, Tabs, Tag, Pagination, MuiTabs, StatusTag } from '../../../components'
import { useObject, useRegulation } from '../../../services'
import { changeStatuses, organizationActionStatuses, regulationStatuses } from '../../../settings/status'
import { useQuery } from '../../../hooks/useQuery'
import fileDownloader from '../../../utils/fileDownloader'
import { permissions } from '../../../settings/permissions'
import dateFormatter from '../../../utils/dateFormatter'
import { BOSH_TEXNIK_NAZORATCHI_ROLE_ID, TEXNIK_NAZORATCHI_ROLE_ID } from '../../../settings/constants'
import CountdownTag from '../../../components/CountdownTag'
import { useClaim } from '../../../services/claim'
import Countdown from 'react-countdown/dist'
import { addZero } from '../../../utils/addZero'
import { useNavigate } from 'react-router-dom'
import useTimeStamp from '../../../services/useTimeStamp'
export function InstructionsListV2() {
  const query = useQuery()
  const { id } = useParams()
  const { userId, roleId } = useSelector((state) => state.auth)

  const [activeTab, setActiveTab] = useState(0)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const { pathname } = useLocation()
  const isTexnik = roleId === BOSH_TEXNIK_NAZORATCHI_ROLE_ID || roleId === TEXNIK_NAZORATCHI_ROLE_ID
  const isMuallif = roleId === 'e7777bfa-7416-44e8-b609-99136ec5d3b0'
  const handleRowClick = (id) => regulationDxaFile.mutate(id)
  const navigate = useNavigate()
  const regulationHeadData = {
    title: "Ko'rsatma raqami",
    key: 'regulation_number',
  }

  const { object } = useObject({
    id,
  })

  const orderHeadData = {
    title: '№',
    key: 'order',
  }

  const createdHeadData = {
    title: 'Yaratilgan sanasi',
    key: 'created_at',
    render: (value) => value && dateFormatter(format, new Date(value), 'dd.MM.yyyy'),
  }

  const responsibleHeadData = {
    title: "Ma'sul xodimlar",
    key: 'guilty_user',
    render: ({ role_name, user_name, user_surname }) => {
      return (
        <div>
          <p className="text-blue-500">
            {role_name ? role_name?.[0]?.toUpperCase() + role_name?.toLowerCase().slice(1) : ''}
          </p>
          <p>{user_name + ' ' + user_surname}</p>
        </div>
      )
    },
  }

  const responsibleHeadDataShaffof = {
    title: "Ma'sul xodimlar",
    key: 'users',
    render: (value) => {
      return value?.map((user) => {
        return (
          <div className="inline-block mr-8" key={user?.id}>
            <p className="text-blue-500">{user?.f_name[0]?.toUpperCase() + user?.f_name?.toLowerCase().slice(1)}</p>
            <p>{user?.role_name}</p>
          </div>
        )
      })
    },
  }

  const headData = [
    orderHeadData,
    regulationHeadData,
    {
      title: 'Qoidabuzarlik',
      key: 'all_violations',
    },
    createdHeadData,
    {
      title: !activeTab ? 'Inspektor' : 'Texnik nazoratchi',
      key: 'user',
      render: ({ role_name, user_name, user_surname }) =>
        role_name &&
        user_name && (
          <div>
            <p className="text-blue-500">{role_name?.[0]?.toUpperCase() + role_name?.toLowerCase().slice(1)}</p>
            <p>{user_name + ' ' + user_surname}</p>
          </div>
        ),
    },
    responsibleHeadData,
    {
      title: "O'zgarish",
      key: 'act_status',
      render: (value) => {
        const status = changeStatuses.find((item) => item.id === value.id)
        return value.status ? <Tag color={status?.color} value={status?.status} /> : '--'
      },
    },
    {
      title: 'Holati',
      key: 'regulation_status_id',
      render: (value) => {
        const status = regulationStatuses.find((item) => item.id === value)
        return <Tag color={status?.color} value={status?.status} />
      },
    },
  ]

  const { regulationTypes } = useRegulation({
    regulationTypesQueryProps: {
      enabled: true,
    },
  })

  const regulationByUserParam = {
    1: {
      regulation_type_id: regulationTypes?.data?.regulation_types[1]?.id,
      offset,
      limit,
      inspector_id: userId,
    },
    0: {
      regulation_type_id: regulationTypes?.data?.regulation_types[0]?.id,
      user_id: userId,
      offset,
      limit,
    },
  }

  const { regulationByUser: regulationByUser1 } = useRegulation({
    regulationByUserParams: regulationByUserParam[0],
    regulationByUserProps: {
      enabled: true,
    },
  })

  const { regulationByUser: regulationByUser2 } = useRegulation({
    regulationByUserParams: regulationByUserParam[1],
    regulationByUserProps: {
      enabled: true,
    },
  })

  const counts = [regulationByUser1.data?.count, regulationByUser2.data?.count]

  const { regulationsByObjectId, regulationByUser, regulationsDxa, regulationDxaFile } = useRegulation({
    objectId: id,
    regulationParams: {
      id,
      type_id: regulationTypes?.data?.regulation_types[activeTab]?.id,
      limit,
      offset,
    },
    regulationByUserParams: regulationByUserParam[activeTab],
    regulationByUserProps: {
      enabled: !!pathname.startsWith('/instructions'),
    },
    regulationsDxaQueryProps: {
      enabled: !!id,
    },
    createDxaRegulationFileProps: {
      onSuccess: (data) => data && fileDownloader(data?.file),
    },
  })

  const isTechnician = permissions[roleId].includes('OBJECTS/INSTRUCTIONS/VIOLATIONS/MONITORING/EDIT')
  const tabElements = regulationTypes.data?.regulation_types?.map((item, index) => {
    return {
      title: item.type,
      key: index,
      count: counts[index],
      component: (
        <BasicTable
          offset={offset}
          limit={limit}
          heightFit
          colTextCenter
          headColumns={headData}
          isLoading={
            pathname.startsWith('/instructions') ? regulationByUser.isLoading : regulationsByObjectId.isLoading
          }
          bodyColumns={
            pathname.startsWith('/instructions')
              ? regulationByUser.data?.regulations
              : regulationsByObjectId.data?.object_regulations
          }
          rowLink={
            isTechnician && activeTab === 1
              ? `/inspectors/${id}/instructions/view/technician`
              : `/inspectors/${id}/instructions/view`
          }
        />
      ),
    }
  })

  const shaffofHeadData = [orderHeadData, regulationHeadData, createdHeadData, responsibleHeadDataShaffof]

  const shaffofTab = {
    title: 'Shaffof',
    key: 3,
    component: (
      <BasicTable
        isLoading={regulationsDxa.isLoading}
        desiredRowName="id"
        clickHandler={(id) => handleRowClick(id)}
        headColumns={shaffofHeadData}
        bodyColumns={regulationsDxa.data?.regulations}
      />
    ),
  }
  const { getClaimOrganizationActionsQuery } = useClaim({
    limit,
    offset,
    user_id: userId,
    getClaimOrganizationActionsProps: {
      enabled: activeTab === 2,
    },
  })

  const { serverTime } = useTimeStamp({
    serverTimeProps: {
      enabled: activeTab === 2,
      refetchInterval: 8000,
    },
  })
  const submittedToUseHeadData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Ariza raqami',
      key: 'task_id',
    },
    {
      title: 'Kelgan vaqti',
      key: 'created_at',
      render: (value) => (
        <span>
          {dateFormatter(format, value, 'dd-MM-yyyy')?.split('-')?.join('.')} <br />{' '}
          {value?.split('T')[1]?.split(':')?.slice(0, 2)?.join(':')}
        </span>
      ),
    },
    {
      title: 'Tugash vaqti',
      key: ['created_at', 'deadline', 'status'],
      render: (values) => {
        // server time is 5 hours behind
        return values[2] === 'new' ? (
          <CountdownTag deadlineTime={values[1]} serverTime={serverTime.data?.data} />
        ) : (
          '---'
        )
      },
    },
    {
      title: 'Buyurtmachi',
      key: 'customer_name',
      render: (value) => <span>{value}</span>,
    },
    {
      title: 'Holat',
      key: 'status',
      render: (value) => <StatusTag title={value} />,
    },
  ]
  const submittedToUse = {
    title: 'Foydalanishga topshirilgan',
    key: 2,
    component: (
      <BasicTable
        isLoading={regulationByUser.isLoading}
        desiredRowName="id"
        clickHandler={(id) => navigate(`organization-actions/${id}`)}
        headColumns={submittedToUseHeadData}
        bodyColumns={getClaimOrganizationActionsQuery.data?.data?.claims}
      />
    ),
  }

  useEffect(() => {
    setOffset(+query.get('offset') || 1)
    setLimit(+query.get('limit') || 10)
  }, [pathname, activeTab])

  return (
    <div className="h-screen">
      <div className="sidebar-header-calc">
        <BasicLayout
          title={!pathname.startsWith('/instructions') && 'Yozma ko`rsatmalar'}
          className={pathname.startsWith('/instructions') ? 'p-4' : 'p-4'}
          footer={
            <Pagination
              count={
                pathname.startsWith('/instructions')
                  ? activeTab === 2
                    ? getClaimOrganizationActionsQuery?.data?.data?.count
                    : regulationByUser.data?.count
                  : regulationsByObjectId.data?.count
              }
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => setLimit(limitNumber)}
              limit={limit}
            />
          }
          header={
            <MuiTabs
              limit={limit}
              offset={offset}
              activeTab={activeTab}
              elements={
                tabElements &&
                [...tabElements, submittedToUse, shaffofTab].slice(
                  0,
                  pathname.startsWith('/instructions') ? (isTexnik || isMuallif ? 3 : 2) : 4
                )
              }
              setActiveTab={setActiveTab}
              getParamsFromLocation={false}
            />
          }
        />
      </div>
    </div>
  )
}
