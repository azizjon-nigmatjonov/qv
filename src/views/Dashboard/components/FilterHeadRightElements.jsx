import ReactSelect, { components } from 'react-select'
import { Input } from '../../../components'
import { CustomDatePicker } from '../../../components/CustomDatePicker'
import SearchIcon from '@mui/icons-material/Search'
import debounce from 'lodash.debounce'
import { useMemo, useRef, useState } from 'react'
import { filterOptions } from '../AreaList/data'
import { NearMe } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useGetDistrictAndRegionOption } from '../../../utils/getDistrictAndRegionOption'
import { useSearchParams } from 'react-router-dom'

const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    <NearMe color="primary" /> {children}
  </components.Control>
)
const style = {
  control: (base) => ({
    ...base,
    border: 0,
    maxWidth: 250,
    minWidth: 250,
    paddingLeft: '4px',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
}
export default function FilterHeaderRightElements({}) {
  const { isRepublic, regionId } = useSelector((state) => state.auth)
  // const changeHandler = (event) => setSearch(event.target.value)
  const [range, setRange] = useState([
    {
      key: 'selection',
    },
  ])
  const [canClear, setCanClear] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  // const debouncedEventHandler = useMemo(() => debounce(changeHandler, 300), [])
  const districtRef = useRef(null)
  const { districts, regions } = useGetDistrictAndRegionOption({
    regionsEnabled: isRepublic,
    regionIdForDistrict: isRepublic ? searchParamsMemo.regionId || searchParamsMemo.regionId : regionId,
  })
  const changeDistrictHandler = (e, action) => {
    let { districtId, ...params } = searchParamsMemo
    if (action === 'clear') {
      setSearchParams(params)
    } else {
      setSearchParams({ ...searchParamsMemo, districtId: e.value })
    }
  }
  const changeRegionHandler = (e, action) => {
    let { regionId, districtId, ...params } = searchParamsMemo
    if (action === 'select-option') {
      setSearchParams({ ...params, regionId: e.value })
    } else {
      districtRef.current.setValue(null, 'clear', false)
      setSearchParams(params)
    }
  }
  return (
    <div className="flex gap-4">
      {/* <Input
        name="search"
        onChange={debouncedEventHandler}
        className="pl-[8px] pr-[8px]"
        height={36}
        addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
        placeholder="Qidirish..."
      />*/}
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
      {isRepublic && (
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
      )}
      <ReactSelect
        className="border rounded"
        options={districts.data}
        ref={districtRef}
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
      />
    </div>
  )
}
