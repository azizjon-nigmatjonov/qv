import { useSelector } from 'react-redux'
import { AddIcon } from '../../assets/icons'
import Prorab from './Prorab'
import { NearMe } from '@mui/icons-material'
import { BtnFiled, FilterHeader, Header, MuiTabs, ObjectCard, ObjectMonitoring, WeekTable } from '../../components'
import CustomLineChart from '../../components/CustomLineChart'
import CustomPieChart from '../../components/CustomPieChart'
import {
  BOSH_PRORAB_ROLE_ID,
  BOSH_TEXNIK_NAZORATCHI_ROLE_ID,
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  KADRLAR_BOLIMI_BOSHLIGI_ROLE_ID,
  PUDRATCHI_ROLE_ID,
  SMR_BOSHLIGI_ROLE_ID,
  TEXNIK_NAZORATCHI_ROLE_ID,
  BUXGALTER_ROLE_ID,
  KADRLAR_BOLIMI_BOSH_MUTAXASSIS_ROLE_ID,
  KADRLAR_BOLIMI_YETAKCHI_MUTAXASSIS_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  REPUBLIC_APPARAT_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  SMR_BOSS,
} from '../../settings/constants'
import { COLORS, lineChartData, pieData } from './fakeChartData'
import SmrBossDashboard from './SmrBoss'
import AccountedDashboard from './Accounted'
import { useUser } from '../../services'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import ReactSelect, { components } from 'react-select'
import getPreviousDay from '../../utils/getPreviousDay'
import getLastWeeksDate from '../../utils/getLastWeeksDate'
import get30DaysPrior from '../../utils/get30DaysPrior'
import { useGetDistrictAndRegionOption } from '../../utils/getDistrictAndRegionOption'
import { useForm } from 'react-hook-form'
import { InteractiveCalendar } from '../../components/InteractiveCalendar'
import { useSearchParams } from 'react-router-dom'

const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    <NearMe color="primary" /> {children}
  </components.Control>
)

export const DashboardContext = createContext({})
export function Dashboard() {
  const { roleId, isRepublic, regionId } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState(2)
  const [showDistrict, setShowDistrict] = useState(true)
  const [regionIdForDistrict, setRegionIdForDistrict] = useState('')
  const [districtId, setDistrictId] = useState('')
  const districtRef = useRef(null)
  const { users } = useUser({ region_id: regionId })
  let [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const { districts, regions } = useGetDistrictAndRegionOption({
    regionsEnabled: roleId === REPUBLIC_APPARAT_ROLE_ID,
    regionIdForDistrict:
      roleId === REPUBLIC_APPARAT_ROLE_ID ? searchParamsMemo.regionId || regionIdForDistrict : regionId,
  })
  const ignoreFirstRender = useRef(false)
  const [canClear, setCanClear] = useState(false)

  // useEffect(() => {
  //   if (!ignoreFirstRender.current) {
  //     setRange([
  //       {
  //         startDate:
  //           activeTab === 0
  //             ? getPreviousDay()
  //             : activeTab === 1
  //             ? getLastWeeksDate()
  //             : activeTab === 2
  //             ? get30DaysPrior()
  //             : new Date(new Date().setFullYear(new Date().getFullYear() - 7)),
  //         endDate: new Date(),
  //         key: 'selection',
  //       },
  //     ])
  //   }
  //   ignoreFirstRender.current = false
  // }, [activeTab])

  const [range, setRange] = useState([
    !ignoreFirstRender.current
      ? {
          // startDate: new Date('2001'),
          // endDate: new Date(),
          key: 'selection',
        }
      : {
          key: 'selection',
        },
  ])

  const DashboardContextProvider = ({ children }) => {
    return (
      <DashboardContext.Provider
        value={{
          range,
          regionId,
          districtId,
          setDistrictId,
          regionIdForDistrict,
          setRegionIdForDistrict,
          isRepublic: roleId === REPUBLIC_APPARAT_ROLE_ID,
        }}
      >
        {children}
      </DashboardContext.Provider>
    )
  }

  const total = users.data?.count || 0

  const isKadrlar =
    roleId === KADRLAR_BOLIMI_BOSHLIGI_ROLE_ID ||
    roleId === KADRLAR_BOLIMI_BOSH_MUTAXASSIS_ROLE_ID ||
    roleId === KADRLAR_BOLIMI_YETAKCHI_MUTAXASSIS_ROLE_ID

  const isInspeksiya =
    roleId === INSPEKSIYA_BOSHLIGI_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_ZAM_ROLE_ID

  const isInspektor =
    roleId === INSPEKTOR_BOSH_ROLE_ID || roleId === INSPEKTOR_YETAKCHI_ROLE_ID || roleId === INSPEKTOR_PRASTOY_ROLE_ID

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      paddingLeft: '4px',
    }),
  }
 
  const { control, getValues, setValue, reset } = useForm({})
  const changeDistrictHandler = (e, action) => {
    let { districtId, ...params } = searchParamsMemo
    if (action === 'clear') {
      setDistrictId('')
      setSearchParams(params)
    } else {
      setDistrictId(e.value)
      setSearchParams({ ...searchParamsMemo, districtId: e.value })
    }
  }
  const changeRegionHandler = (e, action) => {
    let { regionId, districtId, ...params } = searchParamsMemo
    setDistrictId('')
    if (action === 'select-option') {
      setRegionIdForDistrict(e)
      setShowDistrict(false)
      setRegionIdForDistrict(e.value)
      setSearchParams({ ...params, regionId: e.value })
    } else {
      districtRef.current.setValue(null, 'clear', false)
      setShowDistrict(true)
      setRegionIdForDistrict('')
      setSearchParams(params)
    }
  }
  return (
    <div>
      <Header
        title={
          (isKadrlar && 'Barcha xodimlar') ||
          (BOSH_PRORAB_ROLE_ID === roleId && 'Ishning bajarilish grafigi') ||
          ((isInspektor ||
            REPUBLIC_APPARAT_ROLE_ID === roleId ||
            SMR_BOSHLIGI_ROLE_ID === roleId ||
            PUDRATCHI_ROLE_ID === roleId ||
            isInspeksiya ||
            BUXGALTER_ROLE_ID === roleId) &&
            'Bosh sahifa')
        }
        rightElement={BOSH_PRORAB_ROLE_ID === roleId && <BtnFiled leftIcon={<AddIcon />}>Yaratish</BtnFiled>}
      />

      <FilterHeader
        leftElements={[
          // // <MuiTabs elements={tabs} activeTab={activeTab} setActiveTab={setActiveTab} hasBorder={false} />,
          (roleId === REPUBLIC_APPARAT_ROLE_ID ||
            SMR_BOSHLIGI_ROLE_ID === roleId ||
            SMR_BOSS === roleId ||
            isInspeksiya) && (
            <CustomDatePicker
              type="range"
              maxDate={new Date()}
              range={range}
              setRange={setRange}
              style={{ width: canClear ? '270px' : '250px' }}
              rightIcon={false}
              months={2}
              direction="column"
              showBtn={false}
              placeholder="Sanani tanlang"
              canClear={canClear}
              setCanClear={setCanClear}
              onRangeFocusChange={() => setCanClear(true)}
              hasQuery
            />
          ),
          isRepublic && (
            <ReactSelect
              className="border rounded"
              options={regions.data}
              value={regions.data?.filter((option) => option?.value === searchParamsMemo?.regionId)}
              onChange={(e, { action }) => {
                changeRegionHandler(e, action)
              }}
              isMulti={false}
              isSearchable={false}
              isClearable={true}
              placeholder="Viloyat"
              components={{ Control }}
              styles={style}
            />
          ),
          <ReactSelect
            className="border rounded"
            ref={districtRef}
            options={districts.data}
            value={districts.data?.filter((option) => option?.value === searchParamsMemo?.districtId)}
            onChange={(e, { action }) => {
              changeDistrictHandler(e, action)
            }}
            isMulti={false}
            isSearchable={false}
            isClearable={true}
            placeholder="Tuman"
            components={{ Control }}
            styles={style}
          />,
        ]}
      />

      <div className="sidebar-header-calc">
        <div className="grid grid-cols-12 gap-4">
          {(isInspektor || BOSH_TEXNIK_NAZORATCHI_ROLE_ID === roleId || TEXNIK_NAZORATCHI_ROLE_ID === roleId) && (
            <>
              <div className="col-span-7 bg-white rounded-[8px]">
                <InteractiveCalendar />
              </div>
              <div className="col-span-5">
                <div className="flex flex-col gap-4">
                  <ObjectCard />
                  <ObjectCard />
                  <ObjectCard />
                  <ObjectCard columns={2} />
                  <BtnFiled
                    color="yellow"
                    size="large"
                    rightIcon={<div className="bg-yellow-200 rounded-full w-[24px] h-[24px]">4</div>}
                  >
                    Foydalanishga topshirishga tayyor
                  </BtnFiled>
                </div>
              </div>
              <div className="col-span-6">
                <ObjectMonitoring />
              </div>
              <div className="col-span-6">
                <ObjectMonitoring />
              </div>
            </>
          )}
          {isKadrlar && (
            <>
              <div className="col-span-6 bg-white rounded-md">
                <div className="py-4 px-3 flex border-b">
                  <div className="bg-[#1AC19D] text-2xl text-white font-semibold px-[10.5px] py-2 md-md rounded-md mr-4">
                    19
                  </div>
                  <div>
                    <div className="text-[#303940] font-bold text-base">Noyabr 2021</div>
                    <div className="text-[#6E8BB7] font-medium text-sm leading-6">Juma</div>
                  </div>
                </div>
                <div>
                  <CustomPieChart
                    textPosition={{ x1: '27.5%', y1: '43%', x2: '27.5%', y2: '50%' }}
                    centerText="Ishchilarning umumiy soni"
                    colors={COLORS}
                    data={pieData}
                    total={total}
                    centerTextLength={150}
                  />
                </div>
              </div>
              <div className="col-span-6 bg-white rounded-md h-[481px]">
                <div className="border-b text-[18px] font-bold leading-6 px-5 py-3">
                  Kun bo'yicha tashrif buyuruvchilar statistikasi
                </div>
                <CustomLineChart data={lineChartData} />
              </div>
            </>
          )}
          {(SMR_BOSHLIGI_ROLE_ID === roleId || isInspeksiya || REPUBLIC_APPARAT_ROLE_ID === roleId) && (
            <DashboardContextProvider>
              <SmrBossDashboard />
            </DashboardContextProvider>
          )}
          {(BOSH_PRORAB_ROLE_ID === roleId || PUDRATCHI_ROLE_ID === roleId) && <Prorab />}
        </div>
        {BUXGALTER_ROLE_ID === roleId && <AccountedDashboard />}
      </div>
    </div>
  )
}
