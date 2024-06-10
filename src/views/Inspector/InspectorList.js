import { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { useObject } from '../../services'
import { ArrowDownIcon, DownloadIcon, FilterIcon } from '../../assets/icons'
import { statuses } from '../../settings/status'
import { FilterHeader, Header, BtnOutlined, BasicLayout, BasicTable, Tag, Pagination, MuiTabs } from '../../components'
import {
  AUTHOR_SUPERVISOR_ROLE_ID,
  BOSH_LABARATORIYA_ROLE_ID,
  BOSH_PRORAB_ROLE_ID,
  BUHGALTERIYA_BOSH_ROLE_ID,
  BUHGALTERIYA_YETAKCHI_ROLE_ID,
  BUXGALTER_ROLE_ID,
  BUYURTMACHI_ROLE_ID,
  ICHKI_NAZORATCHI_ROLE_ID,
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  LABARATORIYA_BOSHLIGI_ROLE_ID,
  LOYIHACHI_ROLE_ID,
  REGISTRATURA_ROLE_ID,
  REPUBLIC_APPARAT_ROLE_ID,
  SMR_BOSHLIGI_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
  TEXNIK_NAZORATCHI_ROLE_ID,
  YETAKCHI_LABARATORIYA_ROLE_ID,
  YURIST_ROLE_ID,
} from '../../settings/constants'
import { permissions } from '../../settings/permissions'
import makeColUI from '../../utils/makeColUI'
import priceFormatter from '../../utils/priceFormatter'
import { useQuery } from '../../hooks/useQuery'
import FilterPopupSearch from '../../components/FilterPopupSearch'
import ProrabObject from '../ProrabObject'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { useDashboardRepublic } from '../../services/dashboard'
import get30DaysPrior from '../../utils/get30DaysPrior'
import DeadlineSlider from '../../components/DeadlineSlider'
import FilterHeaderRightElements from '../Dashboard/components/FilterHeadRightElements'
import dateFormatter from '../../utils/dateFormatter'

export function InspectorList() {
  const { roleId, regionId, userId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const boxRef = useRef()
  const query = useQuery()
  const { objectType } = useParams()
  const [activeTab, setActiveTab] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const [objectNameSearch, setObjectNameSearch] = useState('')
  const [taskIdSearch, setTaskIdSearch] = useState('')
  const [customerSearch, setCustomerSearch] = useState('')
  const [inspektorSearch, setInspektorSearch] = useState('')
  const [texnikNazoratchiSearch, setTexnikNazoratchiSearch] = useState('')
  const [loyihachiSearch, setLoyihachiSearch] = useState('')
  const [ichkiNazSearch, setIchkiNazSearch] = useState('')
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const [search, setSearch] = useState('')
  const { t } = useTranslation('common')
  const { id } = useParams()
  const { pathname } = useLocation()
  const isDashboardByType = pathname.includes('dashboard-republic/object')

  function dayDiffCounter(date) {
    const today = new Date()
    const endDate = new Date(date)
    const diffTime = Math.abs(today - endDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays > 7) {
      return <Tag color="blue" value={diffDays} />
    } else if (diffDays <= 0) {
      return <Tag color="red" value={t('deadline.expired')} />
    } else {
      return <Tag color="red" value={diffDays} />
    }
  }
  const isInspeksiya =
    roleId === INSPEKSIYA_BOSHLIGI_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_ZAM_ROLE_ID
  const isBuhgalteriya = roleId === BUHGALTERIYA_BOSH_ROLE_ID || roleId === BUHGALTERIYA_YETAKCHI_ROLE_ID
  const isYurist = roleId === YURIST_ROLE_ID
  const isLabarant =
    roleId === YETAKCHI_LABARATORIYA_ROLE_ID ||
    roleId === BOSH_LABARATORIYA_ROLE_ID ||
    roleId === LABARATORIYA_BOSHLIGI_ROLE_ID
  const headData = [
    {
      title: '№',
      key: 'order',
    },
    roleId === REGISTRATURA_ROLE_ID || roleId === SUPER_ADMIN_ROLE_ID || roleId === REPUBLIC_APPARAT_ROLE_ID
      ? {
          title: <FilterPopupSearch title="Ariza raqami" setValue={setTaskIdSearch} value={taskIdSearch} />,
          key: ['task_id', 'id'],
          render: (val) => (
            <>
              <Link
                to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
                className="min-w-[200px] stretched-link	"
                onClick={(e) => e.stopPropagation()}
              ></Link>
              <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
                {val[0]}
              </span>
            </>
          ),
        }
      : {
          title: 'Ariza raqami',
          key: ['task_id', 'id'],
          innerKey: 'task-id',
          render: (val) => (
            <>
              <Link
                to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
                className="min-w-[200px] stretched-link	"
                onClick={(e) => e.stopPropagation()}
              ></Link>
              <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
                {val[0]}
              </span>
            </>
          ),
        },

    {
      title: !isDashboardByType ? (
        <FilterPopupSearch title="Buyurtmachi" setValue={setCustomerSearch} value={customerSearch} />
      ) : (
        'Buyurtmachi'
      ),
      key: ['customer', 'id'],
      innerKey: 'full_name',
      objectChild: 'full_name',
      render: (val) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {val[0]?.full_name}
          </span>
        </>
      ),
    },
    {
      title: !isDashboardByType ? (
        <FilterPopupSearch title="Obyekt nomi" setValue={setObjectNameSearch} value={objectNameSearch} />
      ) : (
        'Obyekt nomi'
      ),
      key: ['name', 'id'],
      innerKey: 'object-name',
      render: (val) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {val[0]}
          </span>
        </>
      ),
    },
    {
      title: 'Manzil',
      key: ['address', 'id'],
      render: (val) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {val[0]}
          </span>
        </>
      ),
    },
    {
      title: !isDashboardByType ? (
        <FilterPopupSearch title="Inspektor" setValue={setInspektorSearch} value={inspektorSearch} />
      ) : (
        'Inspektor'
      ),
      key: ['users', 'id'],
      innerKey: 'inspektor',
      render: (value) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${value[1]}` : `/inspectors/${value[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {makeColUI(
              value[0],
              value[0]?.find((i) => i.role_id === INSPEKTOR_BOSH_ROLE_ID)
                ? INSPEKTOR_BOSH_ROLE_ID
                : value[0]?.find((i) => i.role_id === INSPEKTOR_YETAKCHI_ROLE_ID)
                ? INSPEKTOR_YETAKCHI_ROLE_ID
                : value[0]?.find((i) => i.role_id === INSPEKTOR_PRASTOY_ROLE_ID)
                ? INSPEKTOR_PRASTOY_ROLE_ID
                : undefined
            )}
          </span>
        </>
      ),
    },

    {
      title: !isDashboardByType ? (
        <FilterPopupSearch
          title="Texnik nazoratchi"
          setValue={setTexnikNazoratchiSearch}
          value={texnikNazoratchiSearch}
        />
      ) : (
        'Texnik nazoratchi'
      ),
      key: ['users', 'id'],
      innerKey: 'buyurtmachi',
      render: (value) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${value[1]}` : `/inspectors/${value[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {makeColUI(
              value[0],
              value[0]?.find((i) => i.role_id === REGISTRATURA_ROLE_ID)
                ? BUYURTMACHI_ROLE_ID
                : value[0]?.find((i) => i.role_id === TEXNIK_NAZORATCHI_ROLE_ID)
                ? TEXNIK_NAZORATCHI_ROLE_ID
                : BUYURTMACHI_ROLE_ID
            )}
          </span>
        </>
      ),
    },
    {
      title: !isDashboardByType ? (
        <FilterPopupSearch title="Loyihachi" setValue={setLoyihachiSearch} value={loyihachiSearch} />
      ) : (
        'Loyihachi'
      ),
      key: ['users', 'id'],
      innerKey: 'loyihachi',
      render: (value) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${value[1]}` : `/inspectors/${value[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {makeColUI(value[0], [LOYIHACHI_ROLE_ID, AUTHOR_SUPERVISOR_ROLE_ID])}
          </span>
        </>
      ),
    },
    {
      title: !isDashboardByType ? (
        <FilterPopupSearch title="Ichki nazoratchi" setValue={setIchkiNazSearch} value={ichkiNazSearch} />
      ) : (
        'Ichki nazoratchi'
      ),
      key: ['users', 'id'],
      innerKey: 'ichki-nazoratchi',
      render: (value) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${value[1]}` : `/inspectors/${value[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {makeColUI(value[0], ICHKI_NAZORATCHI_ROLE_ID)}
          </span>
        </>
      ),
    },
    {
      title: 'Monitoring',
      key: 'monitoring',
      columns: [
        {
          title: 'Rejadagi',
          key: 'planned',
        },
        {
          title: "O'tkazilgan",
          key: 'conducted',
        },
        {
          title: "Muddati o'tgan",
          key: 'expired',
          render: (val) => <span className="text-red-500">{val}</span>,
        },
      ],
    },
    {
      title: `Yozma ko'rsatmalar`,
      key: 'regulation',
      columns: [
        {
          title: 'Berilgan',
          key: 'given',
        },
        {
          title: "Ijrosi ta'minlangan",
          key: 'executed',
        },
        {
          title: "Muddati o'tgan",
          key: 'expired',
          render: (val) => <span className="text-red-500">{val}</span>,
        },
      ],
    },
    {
      title: 'Muddati',
      key: ['deadline', 'created_at'],
      width: 186,
      render: ([deadline, created_at]) => (
        <>
          <DeadlineSlider created_at={created_at} deadline={deadline} />
        </>
      ),
    },
    !isDashboardByType && {
      title: 'Xizmat narxlari',
      key: 'price_service',
      columns: [
        {
          title: 'Jami',
          key: 'all',
          render: (val) => <div className="w-[100px]">{priceFormatter(Math.round(val))}</div>,
        },
        {
          title: "To'langan",
          key: 'paid',
          render: (val) => <div className="w-[100px]">{priceFormatter(Math.round(val))}</div>,
        },
        {
          title: 'Qoldiq',
          key: 'rest',
          render: (val) => <div className="w-[100px]">{priceFormatter(Math.round(val))}</div>,
        },
      ],
    },
    {
      title: 'Jarimalar',
      key: 'administrative',
      columns: [
        {
          title: 'Soni',
          key: 'count',
        },
        {
          title: 'Qiymati',
          key: 'sum',
        },
      ],
    },

    !isDashboardByType && {
      title: 'Holati',
      key: 'object_status_id',
      render: (value) => {
        const status = statuses.find((item) => item.id === value)
        return <Tag color={status?.color} value={status?.status} />
      },
    },

    isDashboardByType && {
      title: 'Holati',
      key: 'status',
      render: (value) => {
        const status = statuses.find((item) => item.id === value.id)
        return <Tag color={status?.color} value={status?.status} />
      },
    },
    // {
    //   title: "Ma'qullash",
    //   key: 'id',
    //   render: (val) => (
    //     <div className="flex gap-3 w-[280px]">
    //       <BtnOutlined
    //         color="red"
    //         leftIcon={<Cancel fontSize="small" />}
    //         onClick={(e) => {
    //           e.stopPropagation()
    //           setSelectedId(val)
    //           handleOpen()
    //         }}
    //       >
    //         Bekor qilish
    //       </BtnOutlined>
    //       <BtnFiled leftIcon={<Check fontSize="small" />}>Qabul qilish</BtnFiled>
    //     </div>
    //   ),
    // },
  ]
  const headDataForBuhgalteriya = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: <FilterPopupSearch title="Ariza raqami" setValue={setTaskIdSearch} value={taskIdSearch} />,
      key: ['task_id', 'id'],
      render: (val) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {val[0]}
          </span>
        </>
      ),
    },
    {
      title: t('contract.accepted.date'),
      key: 'created_at',
      render: (val) => dateFormatter(format, new Date(val), 'dd.MM.yyyy'),
    },
    {
      title: 'Buyurtmachi',
      key: ['customer', 'id'],
      innerKey: 'full_name',
      objectChild: 'full_name',
      render: (val) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {val[0]?.full_name}
          </span>
        </>
      ),
    },
    {
      title: 'Obyekt nomi',
      key: ['name', 'id'],
      innerKey: 'object-name',
      render: (val) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {val[0]}
          </span>
        </>
      ),
    },
    {
      title: 'Manzil',
      key: ['address', 'id'],
      render: (val) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${val[1]}` : `/inspectors/${val[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {val[0]}
          </span>
        </>
      ),
    },
    {
      title: 'Inspektor',
      key: ['users', 'id'],
      innerKey: 'inspektor',
      render: (value) => (
        <>
          <Link
            to={roleId === ICHKI_NAZORATCHI_ROLE_ID ? `/m/objects/${value[1]}` : `/inspectors/${value[1]}`}
            className="min-w-[200px] stretched-link	"
            onClick={(e) => e.stopPropagation()}
          ></Link>
          <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
            {makeColUI(
              value[0],
              value[0]?.find((i) => i.role_id === INSPEKTOR_BOSH_ROLE_ID)
                ? INSPEKTOR_BOSH_ROLE_ID
                : value[0]?.find((i) => i.role_id === INSPEKTOR_YETAKCHI_ROLE_ID)
                ? INSPEKTOR_YETAKCHI_ROLE_ID
                : value[0]?.find((i) => i.role_id === INSPEKTOR_PRASTOY_ROLE_ID)
                ? INSPEKTOR_PRASTOY_ROLE_ID
                : undefined
            )}
          </span>
        </>
      ),
    },
    {
      title: t('summa.SMR'),
      key: 'price_service',
      render: (val) => priceFormatter(val?.all || 0),
    },
    {
      title: t('paid.sum'),
      key: 'price_service',
      render: (val) => priceFormatter(val?.paid || 0),
    },
    {
      title: t('rest'),
      key: 'price_service',
      width: 100,
      render: (val) => priceFormatter(val?.rest || 0),
    },
    {
      title: t('payment.period'),
      key: 'payment_deadline',
      render: (val) => dayDiffCounter(val),
    },
  ]
  const showObjectsByRegion =
    roleId === SMR_BOSHLIGI_ROLE_ID ||
    isInspeksiya ||
    roleId === REGISTRATURA_ROLE_ID ||
    roleId === BUXGALTER_ROLE_ID ||
    roleId === BUHGALTERIYA_BOSH_ROLE_ID ||
    isYurist ||
    isLabarant

  const showObjectsHistory =
    roleId === BOSH_PRORAB_ROLE_ID ||
    roleId === TEXNIK_NAZORATCHI_ROLE_ID ||
    roleId === AUTHOR_SUPERVISOR_ROLE_ID ||
    roleId === INSPEKTOR_BOSH_ROLE_ID ||
    roleId === INSPEKTOR_PRASTOY_ROLE_ID ||
    roleId === INSPEKTOR_YETAKCHI_ROLE_ID
  const isSuperAdmin = roleId === SUPER_ADMIN_ROLE_ID

  const { objects } = useObject({
    objectsQueryProps: {
      enabled: !isDashboardByType,
    },
    start_date: searchParamsMemo.startDate || dateFormatter(new Date('0001-01-01'), 'yyyy-MM-dd'),
    end_date: searchParamsMemo.endDate || dateFormatter(new Date(), 'yyyy-MM-dd'),
    task_id: taskIdSearch,
    search: objectNameSearch,
    offset: taskIdSearch ? 1 : offset,
    searchInspector: inspektorSearch,
    searchTexnikNazoratchi: texnikNazoratchiSearch,
    customerSearch,
    searchLoyihachi: loyihachiSearch,
    searchIchkiNazoratchi: ichkiNazSearch,
    limit: taskIdSearch ? 100 : limit,
    district: searchParamsMemo.districtId ?? '',
    region_id:
      isSuperAdmin || roleId === REPUBLIC_APPARAT_ROLE_ID || roleId === BUHGALTERIYA_BOSH_ROLE_ID
        ? searchParamsMemo.regionId ?? ''
        : showObjectsByRegion
        ? regionId
        : '',
    user_id: isSuperAdmin || showObjectsByRegion || roleId === REPUBLIC_APPARAT_ROLE_ID ? id : userId,
    status_id: activeTab === 1 ? 'be3623e7-78f5-48f6-8135-edf3731a838c' : undefined,
  })

  const { getDashboardObjectsQuery } = useDashboardRepublic({
    getDashboardObjectsParams: {
      tab_name: objectType,
      limit,
      offset,
      district_id: searchParamsMemo.districtId ?? '',
      region_id: searchParamsMemo.regionId ?? '',
      start_date: searchParamsMemo.startDate || dateFormatter(new Date('0001-01-01'), 'yyyy-MM-dd'),
      end_date: searchParamsMemo.endDate || dateFormatter(new Date(), 'yyyy-MM-dd'),
    },
    getDashboardObjectsProps: {
      enabled: isDashboardByType,
    },
  })

  const tabElements = [
    { key: 0, title: 'Obyektlar' },
    { key: 1, title: 'Obyektlar tarixi' },
    // { key: 2, title: 'Muzlatishga yuborilgan so`rovlar' },
  ]

  // INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID INSPEKSIYA_BOSS_ZAM_ROLE_ID INSPEKSIYA_BOSHLIGI_ROLE_ID
  // SMR_BOSS
  return (
    <div className="h-screen">
      <Header backLink={-1} />
      <FilterHeader
        rigthElements={[
          permissions[roleId]?.includes('OBJECT_FILTER') && <BtnOutlined leftIcon={<FilterIcon />}>Filtr</BtnOutlined>,
          <BtnOutlined key="download" leftIcon={<DownloadIcon />} rightIcon={<ArrowDownIcon />}>
            Yuklab olish
          </BtnOutlined>,
        ]}
        leftElements={[(isSuperAdmin || roleId === REPUBLIC_APPARAT_ROLE_ID) && <FilterHeaderRightElements />]}
      />
      <div className="h-screen p-4 overflow-x-hidden" ref={boxRef} style={{ height: 'calc(100vh - 108px)' }}>
        {permissions[roleId]?.includes('OBJECT/NEW/DESIGN') ? (
          <BasicLayout
            header={
              showObjectsHistory && <MuiTabs activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />
            }
          >
            {roleId === BOSH_PRORAB_ROLE_ID ? (
              <ProrabObject bodyData={objects.data?.objects} navigate={navigate} />
            ) : (
              <BasicTable
                tableScroll
                offset={offset}
                limit={limit}
                colTextCenter
                headColumns={
                  permissions[roleId]?.includes('OBJECT_ACCEPTANCE_COLUMN')
                    ? headData
                    : permissions[roleId]?.includes('OBJECT_MONITORING_COLUMN')
                    ? headData.filter((i) => i.key !== 'id')
                    : headData.filter((i) => i.key !== 'monitoring')
                }
                bodyColumns={objects.data?.objects}
                isLoading={objects.isFetching}
                rowLink="/inspectors"
              />
            )}
          </BasicLayout>
        ) : (
          <BasicLayout
            footer={
              <Pagination
                count={isDashboardByType ? getDashboardObjectsQuery.data?.data?.count : objects.data?.count}
                pageCount={limit}
                onChange={(pageNumber) => setOffset(pageNumber)}
                currentPage={offset}
                onChangeLimit={(limitNumber) => {
                  setLimit(limitNumber)
                }}
                limit={limit}
                searchParams={searchParamsMemo.districtId ? `districtId=${searchParamsMemo.districtId}` : ''}
              />
            }
            header={
              true && <MuiTabs activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />
            }
          >
            <BasicTable
              tableScroll
              offset={offset}
              limit={limit}
              colTextCenter
              headColumns={
                permissions[roleId]?.includes('OBJECT_MONITORING_COLUMN')
                  ? headData.filter((i) => i?.key !== 'id')
                  : isBuhgalteriya || isYurist
                  ? headDataForBuhgalteriya
                  : headData.filter((i) => i?.key !== 'monitoring')
              }
              bodyColumns={isDashboardByType ? getDashboardObjectsQuery.data?.data?.objects : objects.data?.objects}
              isLoading={isDashboardByType ? getDashboardObjectsQuery.isLoading : objects.isFetching}
              rowLink={roleId === ICHKI_NAZORATCHI_ROLE_ID ? '/m/objects' : '/inspectors'}
            />
          </BasicLayout>
        )}
      </div>
      {/* {permissions[roleId]?.includes('OBJECT_ACCEPTANCE_COLUMN') && (
        <ObjectRejectModal
          blocks={objects.data?.objects?.find((obj) => obj.id === selectedId)?.blocks}
          register={register}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      )} */}
    </div>
  )
}
