import { format } from 'date-fns'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { BankIcon, GraphIcon, PenaltyIcon, SecurityShieldIcon } from '../../../assets/icons'
import { ControllerIcon, DesignerIcon, ForemanIcon, InspectorIcon, TechnicalIcon } from '../../../assets/icons/icons'
import { Card, ObjectCard } from '../../../components'
import CustomPieChart from '../../../components/CustomPieChart'
import useWindowSize from '../../../hooks/useWindowSize'
import { useDashboardRepublic } from '../../../services/dashboard'
import { SMR_BOSHLIGI_ROLE_ID } from '../../../settings/constants'
import dateFormatter from '../../../utils/dateFormatter'
import BarChartForSmr from '../components/BarChartForSmr'
import { DashboardContext } from '../Dashboard'
import { smrPieColors } from '../fakeChartData'
import './index.scss'

function SmrBossDashboard({ context = DashboardContext }) {
  const navigate = useNavigate()
  const { width } = useWindowSize()

  const { roleId } = useSelector((state) => state.auth)

  const { range, regionId, isRepublic, regionIdForDistrict, districtId } = useContext(context)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])

  const pieRadius = width < 1250 ? { inner: 60, outer: 85 } : { inner: 60, outer: 85 }

  const handlePieClick = (fill, userRole) => {
    if (fill === '#47D16C') navigate(`registered/${userRole}?offset=1&limit=10&tab=0`)
    else if (fill === '#F76659') navigate(`registered/${userRole}?offset=1&limit=10&tab=1`)
  }

  const { getDashboardRepublicQuery } = useDashboardRepublic({
    getDashboardRepublicQueryParams: {
      start_date: dateFormatter(format, range[0].startDate, 'yyyy-MM-dd') || '0001-01-01',
      end_date:
        dateFormatter(format, range[0].endDate, 'yyyy-MM-dd') || dateFormatter(format, new Date(), 'yyyy-MM-dd'),
      region_id: isRepublic ? regionIdForDistrict : regionId,
      district_id: districtId ? districtId : undefined,
      object_type: searchParamsMemo.objectType != 0 ? searchParamsMemo.objectType : undefined,
      state_program: searchParamsMemo.stateProgram,
      sector: searchParamsMemo.sector,
      difficulty_category_id: searchParamsMemo.difficulity,
    },
  })

  const { inspectors, author, internal_supervisors, technical_supervisors, foreman } =
    getDashboardRepublicQuery.data?.data || {}
  const pieData = useMemo(
    () => ({
      inspectors: [
        {
          name: 'Faol',
          value: inspectors?.not_active || 0,
        },
        {
          name: 'Nofaol',
          value: inspectors?.active || 0,
        },
        {
          name: "O'rtacha faol",
          value: inspectors?.medium_active || 0,
        },
      ],
      author: [
        {
          name: 'Faol',
          value: author?.active || 0,
        },
        {
          name: 'Nofaol',
          value: author?.not_active || 0,
        },
        {
          name: "O'rtacha faol",
          value: author?.medium_active || 0,
        },
      ],
      internal_supervisors: [
        {
          name: 'Faol',
          value: internal_supervisors?.active || 0,
        },
        {
          name: 'Nofaol',
          value: internal_supervisors?.not_active || 0,
        },
        {
          name: "O'rtacha faol",
          value: internal_supervisors?.medium_active || 0,
        },
      ],
      technical_supervisors: [
        {
          name: 'Faol',
          value: technical_supervisors?.active || 0,
        },
        {
          name: 'Nofaol',
          value: technical_supervisors?.not_active || 0,
        },
        {
          name: "O'rtacha faol",
          value: technical_supervisors?.medium_active || 0,
        },
      ],
      foreman: [
        {
          name: 'Faol',
          value: foreman?.active || 0,
        },
        {
          name: 'Nofaol',
          value: foreman?.not_active || 0,
        },
        {
          name: "O'rtacha faol",
          value: foreman?.medium_active || 0,
        },
      ],
    }),
    // eslint-disable-next-line
    [getDashboardRepublicQuery.data]
  )

  const pieDataRegistered = useMemo(
    () => ({
      inspectors: [
        {
          name: 'inspectors',
          registered: inspectors?.system_active || 0,
          notRegistered: inspectors?.system_not_active || 0,
        },
      ],
      author: [
        {
          name: 'author',
          registered: author?.system_active || 0,
          notRegistered: author?.system_not_active || 0,
        },
      ],
      internal_supervisors: [
        {
          name: 'internal_supervisors',
          registered: internal_supervisors?.system_active || 0,
          notRegistered: internal_supervisors?.system_not_active || 0,
        },
      ],
      technical_supervisors: [
        {
          name: 'technical_supervisors',
          registered: technical_supervisors?.system_active || 0,
          notRegistered: technical_supervisors?.system_not_active || 0,
        },
      ],
      foreman: [
        {
          name: 'foreman',
          registered: foreman?.system_active || 0,
          notRegistered: foreman?.system_not_active || 0,
        },
      ],
    }),
    // eslint-disable-next-line
    [inspectors, author, internal_supervisors, technical_supervisors, foreman]
  )
  const objectContent = useMemo(
    () => ({
      count: {
        text: !range[0].hasOwnProperty('startDate') ? 'Jami' : "Ro'yxatga olingan",
        bg_color: 'bg-[#F5F5F5]',
        color: '',
        order: 1,
      },
      completed: {
        text: 'Foydalanishga topshirilgan',
        bg_color: 'bg-[#22C3481A]',
        color: 'text-green-tag_text_color',
        order: 2,
      },
      in_progress_with_new: {
        text: 'Qurilish Jarayonida',
        bg_color: 'bg-[#0E73F61A]',
        color: 'text-[#0E73F6]',
        order: 4,
      },
      stopped_by_inspector: {
        text: "Qurilish to'xtatilgan",
        bg_color: 'bg-red-50',
        color: 'text-red-tag_text_color',
        order: 5,
      },
      stopped_by_builder: {
        text: 'Qurilish muzlatilgan',
        bg_color: 'bg-red-50',
        color: 'text-red-tag_text_color',
        order: 6,
      },
      re_formalized_object: {
        text: 'Qayta rasmiylashtirilgan',
        bg_color: 'bg-red-50',
        color: 'text-red-tag_text_color',
        order: 7,
      },
    }),
    [range]
  )
  const regulationContent = useMemo(
    () => ({
      count: { text: 'Jami', bg_color: 'bg-[#F5F5F5]', color: '', order: 1 },
      in_progress: {
        text: 'Jarayonda',
        bg_color: '',
        color: 'text-amber-600',
        order: 3,
      },
      completed: {
        text: 'Ijrosi ta`minlangan',
        bg_color: 'bg-[#22C3481A]',
        color: 'text-green-tag_text_color',
        order: 2,
      },
      delayed_not_completed: {
        text: 'Kechiktirilgan',
        bg_color: 'bg-[#F7665933]',
        color: 'text-[#F76659]',
        order: 4,
      },
      delayed_completed: {
        text: "Kechiktirib ijrosi ta'minlangan",
        bg_color: 'bg-[#F766591A]',
        color: 'text-[#F76659]',
        order: 5,
      },
    }),
    []
  )
  const monitoringContent = useMemo(
    () => ({
      count: { text: 'Jami', bg_color: 'bg-[#F5F5F5]', color: '', order: 1 },
      done: { text: 'O’tkazilgan', bg_color: 'bg-[#22C3481A]', color: 'text-green-tag_text_color', order: 2 },
      delayed: {
        text: 'Muddati o`tgan',
        bg_color: 'bg-[#F7665933]',
        color: 'text-[#F76659]',
        order: 3,
      },
    }),
    []
  )
  const violationContent = useMemo(
    () => ({
      determined: {
        text: 'Aniqlangan',
        bg_color: 'bg-[#F5F5F5]',
        color: '',
        order: 1,
      },
      inprogress: {
        text: 'Jarayonda',
        bg_color: 'bg-[#0E73F61A]',
        color: 'text-[#0E73F6]',
        order: 2,
      },
      fixed: {
        text: 'Bartaraf etilgan',
        bg_color: 'bg-[#22C3481A]',
        color: 'text-green-tag_text_color',
        order: 3,
      },
      delayed: { text: 'Muddati o’tgan', bg_color: 'bg-[#F7665933]', color: 'text-[#F76659]', order: 4 },
    }),
    []
  )
  function handlePieCellClick(data, index, name) {
    data.stopPropagation()
    navigate({
      pathname: `users/activeness${!!searchParamsMemo.districtId ? "/list" : ''}`,
      search: `?${createSearchParams({ ...searchParamsMemo, userStatus: index + 1, user: name })}`,
    })
  }
  function handlePieCardClick(name) {
    // new logic
    navigate({
      pathname: `users/activeness${!!searchParamsMemo.districtId ? "/list" : ''}`,
      search: `?${createSearchParams({ ...searchParamsMemo, user: name, userStatus: 'all' })}`,
    })

    //old logic
    // navigate({
    //   pathname: `${roleId === SMR_BOSHLIGI_ROLE_ID ? '/dashboard' : '/dashboard-republic'}/${name}`,
    //   search: `?${createSearchParams({ ...searchParamsMemo })}`,
    // })
    // navigate({
    //   pathname: `/dashboard-republic/${name}`,
    //   search: `?${createSearchParams({ ...searchParamsMemo })}`,
    // })
  }
  function handleBarCardClick(userType) {
    navigate({
      pathname: `users/registered${!!searchParamsMemo.districtId ? "/list" : ''}`,
      search: `?${createSearchParams({ ...searchParamsMemo, userStatus: 'all', user: userType })}`,
    })
  }
  function handleBarClick(userType, status, index) {
    navigate({
      pathname: `users/registered${!!searchParamsMemo.districtId ? "/list" : ''}`,
      search: `?${createSearchParams({ ...searchParamsMemo, userStatus: status, user: userType })}`,
    })
  }
  // function handleBarClick(role, type) {
  //   if (type === 'registered')
  //     navigate({
  //       pathname: `registered/${role}`,
  //       search: `?${createSearchParams({ ...searchParamsMemo, tab: 0 })}`,
  //     })
  //   else
  //     navigate({
  //       pathname: `registered/${role}`,
  //       search: `?${createSearchParams({ ...searchParamsMemo, tab: 1 })}`,
  //     })
  // }
  function prevent(fn, defaultOnly) {
    return (e, ...params) => {
      e && e.preventDefault()
      !defaultOnly && e && e.stopPropagation()
      fn(e, ...params)
    }
  }
  return (
    <>
      <div className="col-span-12">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <ObjectCard
              content={objectContent}
              data={getDashboardRepublicQuery.data?.data?.objects}
              icon={<BankIcon color="#3C464E" />}
              title="Obyektlar"
              type="objects"
              params={searchParamsMemo}
            />
          </div>
          <div className="col-span-3 flex flex-col justify-between">
            <ObjectCard
              content={monitoringContent}
              data={getDashboardRepublicQuery.data?.data?.monitorings}
              icon={<GraphIcon />}
              title="Monitoringlar"
              params={searchParamsMemo}
              type="monitorings"
            />
          </div>
          <div className="col-span-8 mb-4">
            <ObjectCard
              content={regulationContent}
              data={getDashboardRepublicQuery.data?.data?.regulations}
              icon={<PenaltyIcon color="#3C464E" />}
              title="Yozma ko'rsatmalar"
              type="regulations"
              params={searchParamsMemo}
            />
          </div>
          <div className="col-span-4 flex flex-col justify-between mb-4">
            <ObjectCard
              content={violationContent}
              data={getDashboardRepublicQuery.data?.data?.violations}
              icon={<SecurityShieldIcon />}
              title="Qoidabuzarliklar"
              type="violations"
              params={searchParamsMemo}
            />
          </div>
        </div>
        <div className="bg-white rounded-md text-xl font-bold p-4 mb-4">Xodimlar faolligi</div>
        <div className="grid grid-cols-5 gap-4">
          <Card
            onClick={(e) => {
              handlePieCardClick('inspectors') //new logic
              // handlePieCardClick('inspector') //old logic
            }}
            title={
              <div className="flex gap-x-2 cursor-default">
                <InspectorIcon /> <span>Inspektorlar</span>
              </div>
            }
          >
            <CustomPieChart
              legend="horizontal"
              centerText="Jami"
              onCellClick={(data, index) => {
                handlePieCellClick(data, index, 'inspectors')
              }}
              colors={smrPieColors}
              data={pieData.inspectors}
              paddingAngle={5}
              position={{ cy: 100 }}
              radius={pieRadius}
              total={inspectors?.count}
            />
          </Card>
          <Card
            onClick={() => {
              handlePieCardClick('technical_supervisors') //new logic
              // handlePieCardClick('technical') //old logic
            }}
            title={
              <div className="flex gap-x-2 cursor-default">
                <TechnicalIcon /> <span>Texnik nazoratchilar</span>
              </div>
            }
          >
            <CustomPieChart
              legend="horizontal"
              centerText="Jami"
              onCellClick={(data, index) => {
                handlePieCellClick(data, index, 'technical_supervisors')
              }}
              colors={smrPieColors}
              data={pieData.technical_supervisors}
              paddingAngle={5}
              position={{ cy: 100 }}
              radius={pieRadius}
              total={technical_supervisors?.count}
            />
          </Card>
          <Card
            onClick={() => {
              handlePieCardClick('author') //new logic
              // handlePieCardClick('author') //old logic
            }}
            title={
              <div className="flex gap-x-2 cursor-default">
                <DesignerIcon /> <span>Mualliflik nazorati</span>
              </div>
            }
          >
            <CustomPieChart
              legend="horizontal"
              centerText="Jami"
              onCellClick={(data, index) => {
                handlePieCellClick(data, index, 'author')
              }}
              colors={smrPieColors}
              data={pieData.author}
              paddingAngle={5}
              position={{ cy: 100 }}
              radius={pieRadius}
              total={author?.count}
            />
          </Card>
          <Card
            onClick={() => {
              handlePieCardClick('internal_supervisors') //new logic
              // handlePieCardClick('internal-supervisors') //old logic
            }}
            title={
              <div className="flex gap-x-2 cursor-default">
                <ControllerIcon /> <span>Ichki nazoratchilar</span>
              </div>
            }
          >
            <CustomPieChart
              legend="horizontal"
              centerText="Jami"
              colors={smrPieColors}
              onCellClick={(data, index) => {
                handlePieCellClick(data, index, 'internal_supervisors')
              }}
              data={pieData?.internal_supervisors}
              paddingAngle={5}
              position={{ cy: 100 }}
              radius={pieRadius}
              total={internal_supervisors?.count}
            />
          </Card>
          <Card
            onClick={() => {
              handlePieCardClick('foreman')
            }}
            title={
              <div className="flex gap-x-2 cursor-default">
                <ForemanIcon /> <span>Prorab</span>
              </div>
            }
          >
            <CustomPieChart
              legend="horizontal"
              centerText="Jami"
              colors={smrPieColors}
              data={pieData?.foreman}
              onCellClick={(data, index) => {
                handlePieCellClick(data, index, 'foreman')
              }}
              paddingAngle={5}
              position={{ cy: 100 }}
              radius={pieRadius}
              total={foreman?.count}
            />
          </Card>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {/* <Card
            // onClick={() => handleBarCardClick('inspectors')} //new logic
            title={
              <div className="flex gap-x-2 cursor-default">
                <InspectorIcon /> <span>Inspektorlar</span>
              </div>
            }
          >
            <BarChartForSmr
              // onBarClick={(status) => handleBarClick('inspector', status)} //old logic
              onBarClick={(status, index) => handleBarClick('inspectors', status, index)} //new logic
              // onCellClick={(data, index) => {
              //   handlePieCellClick(data, index, 'inspectors')
              // }}
              data={pieDataRegistered.inspectors}
            />
          </Card> 
          <Card
            // onClick={() => handleBarCardClick('technical_supervisors')} //new logic
            title={
              <div className="flex gap-x-2 cursor-default">
                <TechnicalIcon /> <span>Texnik nazoratchilar</span>
              </div>
            }
          >
            <BarChartForSmr
              onBarClick={(status, index) => handleBarClick('technical_supervisors', status, index)} //new logic
              // onBarClick={(status) => handleBarClick('technical', status)} //old logic
              data={pieDataRegistered.technical_supervisors}
            />
          </Card>
          <Card
            onClick={() => handleBarCardClick('author')}
            title={
              <div className="flex gap-x-2 cursor-default">
                <DesignerIcon /> <span>Mualliflik nazorati</span>
              </div>
            }
          >
            <BarChartForSmr
              data={pieDataRegistered.author}
              onBarClick={(status, index) => handleBarClick('author', status, index)} //new logic
              // onBarClick={(status) => handleBarClick('author', status)} //old logic
            />
          </Card>
          <Card
            onClick={() => handleBarCardClick('internal_supervisors')} //new logic
            title={
              <div className="flex gap-x-2 cursor-default">
                <ControllerIcon /> <span>Ichki nazoratchilar</span>
              </div>
            }
          >
            <BarChartForSmr
              onBarClick={(status, index) => handleBarClick('internal_supervisors', status, index)} //new logic
              // onBarClick={(status) => handleBarClick('internal-supervisors', status)} //old logic
              data={pieDataRegistered.internal_supervisors}
            />
          </Card>
          <Card
            onClick={() => handleBarCardClick('foreman')}
            title={
              <div className="flex gap-x-2 cursor-default">
                <ForemanIcon /> <span>Prorab</span>
              </div>
            }
          >
            <BarChartForSmr
              data={pieDataRegistered.foreman}
              onBarClick={(status, index) => handleBarClick('foreman', status, index)} //new logic
              // onBarClick={(status) => handleBarClick('foreman', status)} //old logic
            />
          </Card> */}
        </div>
      </div>
    </>
  )
}

export default SmrBossDashboard
