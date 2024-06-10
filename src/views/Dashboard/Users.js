import { format } from 'date-fns'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useDashboardInspection } from '../../services/dashboard'
import {
  AUTHOR_SUPERVISOR_ROLE_ID,
  BOSH_PRORAB_ROLE_ID,
  BUYURTMACHI_ROLE_ID,
  ICHKI_NAZORATCHI_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  LOYIHACHI_ROLE_ID,
  REPUBLIC_APPARAT_ROLE_ID,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../settings/constants'
import dateFormatter from '../../utils/dateFormatter'
import { useGetDistrictAndRegionOption } from '../../utils/getDistrictAndRegionOption'
import DashboardInspectors from './Inspector'

const Users = () => {
  const { userRole } = useParams()
  const { pathname, state, search: tabSearch } = useLocation()
  const { roleId, regionId } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])

  const { tab } = searchParamsMemo

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const [activeTab, setActiveTab] = useState(+tab || 0)

  const [regionIdForDistrict, setRegionIdForDistrict] = useState(state?.regionIdForDistrict || '')
  const [districtId, setDistrictId] = useState(state?.districtId || '')
  const [search, setSearch] = useState('')
  const { regions, districts } = useGetDistrictAndRegionOption({
    regionIdForDistrict: roleId === REPUBLIC_APPARAT_ROLE_ID ? regionIdForDistrict : regionId,
  })

  const currentUser = userRole

  const usersHeadData = useMemo(
    () => ({
      inspectors: [
        {
          title: '№',
          key: 'order',
        },
        {
          title: 'F.I.Sh',
          key: 'full_name',
          innerKey: 'full_name_full_name',
        },
        {
          title: 'Tuman',
          key: 'object_district',
          innerKey: 'object_district_object_district',
          width: 200,
          render: (val) => val?.map((el, index) => <p key={val + index}>{el}</p>),
        },
        {
          title: 'Obyekt',
          key: 'objects_count',
          innerKey: 'objects_count_objects_count',
        },
        {
          title: 'Monitoring',
          key: 'monitoring',
          innerKey: 'monitoring_monitoring',
          columns: [
            {
              title: 'Rejadagi',
              key: 'planned',
              innerKey: 'planned_planned',
            },
            {
              title: "Ijrosi ta'minlangan",
              key: 'transferred',
              innerKey: 'transferred_transferred',
            },
            {
              title: "Muddati o'tgan",
              key: 'term_past',
              innerKey: 'term_past_term_past',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
          ],
        },
        {
          title: "Yozma ko'rsatmalar",
          key: 'regulations',
          innerKey: 'regulations_regulations',
          columns: [
            {
              title: 'Berilgan',
              key: 'given',
              innerKey: 'given_given',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Ijrosi ta'minlangan</p>,
              key: 'done',
              innerKey: 'done_done',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tgan</p>,
              key: 'term_past',
              innerKey: 'term_past_term_past',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tib ijrosi ta'minlangan</p>,
              key: 'expired_done',
              innerKey: 'expired_done_expired_done',
            },
            {
              title: 'Jarayonda',
              key: 'not_expired',
              innerKey: 'not_expired_not_expired',
            },
          ],
        },
        {
          title: 'Qoidabuzarliklar',
          key: 'violations_count',
          innerKey: 'violations_count_violations_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Ma'muriy bayonnoma</p>,
          key: 'protocol_count',
          innerKey: 'protocol_count_protocol_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Qurilish to'xtagan</p>,
          key: 'stopped_objects_count',
          innerKey: 'stopped_objects_count_stopped_objects_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Foydalanishga topshirildi</p>,
          key: 'closed_objects_count',
          innerKey: 'closed_objects_count_closed_objects_count',
        },
      ],
      technical: [
        {
          title: '№',
          key: 'order',
        },
        {
          title: 'F.I.Sh',
          key: 'full_name',
          innerKey: 'full_name_full_name',
        },
        {
          title: 'Tashkilot',
          key: 'organization_name',
          innerKey: 'organization_name_organization_name',
        },
        {
          title: 'Obyekt',
          key: 'objects_count',
          innerKey: 'objects_count_objects_count',
        },
        {
          title: "Yozma ko'rsatmalar",
          key: 'guilty_user_regulations',
          innerKey: 'guilty_user_regulations_guilty_user_regulations',
          columns: [
            {
              title: 'Berilgan',
              key: 'given',
              innerKey: 'given_given',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Ijrosi ta'minlangan</p>,
              key: 'done',
              innerKey: 'done_done',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tgan</p>,
              key: 'term_past',
              innerKey: 'term_past_term_past',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
          ],
        },
        {
          title: 'Qoida buzarliklar',
          key: 'guilty_user_violations',
          innerKey: 'guilty_user_violations_guilty_user_violations',
          columns: [
            {
              title: 'Aniqlangan',
              key: 'given',
              innerKey: 'given_given',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Bartaraf etilgan</p>,
              key: 'done',
              innerKey: 'done_done',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tgan</p>,
              key: 'expired',
              innerKey: 'expired_expired',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
          ],
        },
        {
          title: "Prorabga berilgan yozma ko'rsatmalar",
          key: 'regulations',
          innerKey: 'regulations_regulations',
          columns: [
            {
              title: 'Berilgan',
              key: 'given',
              innerKey: 'given_given',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Ijrosi ta'minlangan</p>,
              key: 'done',
              innerKey: 'done_done',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tgan</p>,
              key: 'expired',
              innerKey: 'expired_expired',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
          ],
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Ma'muriy bayonnoma</p>,
          key: 'protocol_count',
          innerKey: 'protocol_count_protocol_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Qurilish to'xtagan</p>,
          key: 'stopped_objects_count',
          innerKey: 'stopped_objects_count_stopped_objects_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Foydalanishga topshirildi</p>,
          key: 'closed_objects_count',
          innerKey: 'closed_objects_count_closed_objects_count',
        },
      ],
      author: [
        {
          title: '№',
          key: 'order',
        },
        {
          title: 'F.I.Sh',
          key: 'full_name',
          innerKey: 'full_name_full_name',
        },
        {
          title: 'Tashkilot',
          key: 'organization_name',
          innerKey: 'organization_name_organization_name',
        },
        {
          title: 'Obyekt',
          key: 'objects_count',
          innerKey: 'objects_count_objects_count',
        },
        {
          title: "Yozma ko'rsatmalar",
          key: 'guilty_user_regulations',
          innerKey: 'guilty_user_regulations_guilty_user_regulations',
          columns: [
            {
              title: 'Berilgan',
              key: 'given',
              innerKey: 'given_given',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Ijrosi ta'minlangan</p>,
              key: 'done',
              innerKey: 'done_done',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tgan</p>,
              key: 'term_past',
              innerKey: 'term_past_term_past',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
          ],
        },

        {
          title: 'Qoida buzarliklar',
          key: 'guilty_user_violations',
          innerKey: 'guilty_user_violations_guilty_user_violations',
          columns: [
            {
              title: 'Aniqlangan',
              key: 'given',
              innerKey: 'given_given',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Bartaraf etilgan</p>,
              key: 'done',
              innerKey: 'done_done',
            },
            {
              title: <p className="text-center max-w-[112px] whitespace-normal">Muddati o'tgan</p>,
              key: 'expired',
              innerKey: 'expired_expired',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
          ],
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Ma'muriy bayonnoma</p>,
          key: 'protocol_count',
          innerKey: 'protocol_count_protocol_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Qurilish to'xtagan</p>,
          key: 'stopped_objects_count',
          innerKey: 'stopped_objects_count_stopped_objects_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Foydalanishga topshirildi</p>,
          key: 'closed_objects_count',
          innerKey: 'closed_objects_count_closed_objects_count',
        },
      ],
      foreman: [
        {
          title: '№',
          key: 'order',
        },
        {
          title: 'F.I.Sh',
          key: 'full_name',
          innerKey: 'full_name_full_name',
        },
        {
          title: 'Tashkilot',
          key: 'organization_name',
          innerKey: 'organization_name_organization_name',
        },
        {
          title: 'Obyekt',
          key: 'objects_count',
          innerKey: 'objects_count_objects_count',
        },
        {
          title: "Yozma ko'rsatmalar",
          key: 'guilty_user_regulations',
          columns: [
            {
              title: 'Berilgan',
              key: 'given',
            },
            {
              title: "Ijrosi ta'minlangan",
              key: 'done',
            },
            {
              title: "Muddati o'tgan",
              key: 'term_past',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
          ],
        },

        {
          title: 'Qoida buzarliklar',
          key: 'guilty_user_violations',
          columns: [
            {
              title: 'Aniqlangan',
              key: 'given',
            },
            {
              title: 'Bartaraf etilgan',
              key: 'done',
            },
            {
              title: "Muddati o'tgan",
              key: 'expired',
              render: (val) => <span className="text-red-500">{val}</span>,
            },
          ],
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Qurilish to'xtagan</p>,
          key: 'stopped_objects_count',
          innerKey: 'stopped_objects_count_stopped_objects_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Foydalanishga topshirildi</p>,
          key: 'closed_objects_count',
          innerKey: 'closed_objects_count_closed_objects_count',
        },
      ],
      'internal-supervisors': [
        {
          title: '№',
          key: 'order',
        },
        {
          title: 'F.I.Sh',
          key: 'full_name',
          innerKey: 'full_name_full_name',
        },
        {
          title: 'Obyekt',
          key: 'objects_count',
          innerKey: 'objects_count_objects_count',
        },
        // {
        //   title: 'Monitoring',
        //   key: 'monitoring',
        //   columns: [
        //     {
        //       title: 'Rejadagi',
        //       key: 'planned',
        //     },
        //     {
        //       title: "O'tkazilgan",
        //       key: 'transferred',
        //     },
        //     {
        //       title: "Muddati o'tgan",
        //       key: 'term_past',
        //       render: (val) => <span className="text-red-500">{val}</span>,
        //     },
        //   ],
        // },

        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Qurilish to'xtagan</p>,
          key: 'stopped_objects_count',
          innerKey: 'stopped_objects_count_stopped_objects_count',
        },
        {
          title: <p className="text-center max-w-[112px] whitespace-normal">Foydalanishga topshirildi</p>,
          key: 'closed_objects_count',
          innerKey: 'closed_objects_count_closed_objects_count',
        },
      ],
    }),
    [currentUser]
  )

  const roles = {
    inspector: [INSPEKTOR_BOSH_ROLE_ID, INSPEKTOR_YETAKCHI_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID],
    inspectors: [INSPEKTOR_BOSH_ROLE_ID, INSPEKTOR_YETAKCHI_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID],
    technical: [BUYURTMACHI_ROLE_ID, TEXNIK_NAZORATCHI_ROLE_ID],
    author: [LOYIHACHI_ROLE_ID, AUTHOR_SUPERVISOR_ROLE_ID],
    foreman: [BOSH_PRORAB_ROLE_ID],
    'internal-supervisors': [ICHKI_NAZORATCHI_ROLE_ID],
  }

  const titles = {
    inspector: 'Inspektorlar',
    technical: 'Texnik nazoratchilar',
    author: 'Loyihachilar',
    foreman: 'Prorablar',
    'internal-supervisors': 'Ichki nazoratchilar',
  }

  const [range, setRange] = useState([
    {
      startDate: undefined,
      endDate: new Date(),
      key: 'selection',
      innerKey: 'selection_selection',
    },
  ])

  const { getDashboardInspectionQuery } = useDashboardInspection({
    getDashboardInspectionQueryParams: {
      offset,
      limit,
      search,
      start_date: dateFormatter(format, searchParamsMemo?.startDate, 'yyyy-MM-dd') || '2020-01-01',
      end_date:
        dateFormatter(format, searchParamsMemo?.endDate, 'yyyy-MM-dd') ||
        dateFormatter(format, new Date(), 'yyyy-MM-dd'),
      role_id: `${roles[currentUser]}`,
      region_id: roleId === REPUBLIC_APPARAT_ROLE_ID ? regionIdForDistrict : regionId,
      district_id: searchParamsMemo?.districtId || undefined,
      is_active: pathname.includes('registered') ? activeTab === 0 : false,
      is_not_active: pathname.includes('registered') ? activeTab === 1 : false,
      object_type: searchParamsMemo.tabsInner ? searchParamsMemo.tabsInner : undefined,
    },
  })

  useEffect(() => {
    setOffset(1)
    setSearchParams({ ...searchParamsMemo, tab: activeTab })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, setSearchParams])

  return (
    <DashboardInspectors
      inspectorsData={getDashboardInspectionQuery}
      offset={offset}
      setOffset={setOffset}
      limit={limit}
      setLimit={setLimit}
      headData={usersHeadData[currentUser]}
      range={range}
      setRange={setRange}
      setSearch={setSearch}
      title={titles[currentUser]}
      regions={regions}
      districts={districts}
      setRegionIdForDistrict={setRegionIdForDistrict}
      regionIdForDistrict={regionIdForDistrict}
      setDistrictId={setDistrictId}
      districtId={districtId}
      isRegistered={pathname.includes('registered')}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchParams={searchParamsMemo}
    />
  )
}

export default Users
