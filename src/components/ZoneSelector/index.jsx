import ReactSelect, { components } from 'react-select'
import { useMemo, useRef, useState } from 'react'
import { NearMe } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useGetDistrictAndRegionOption } from '../../utils/getDistrictAndRegionOption'

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
export default function ZoneSelector({}) {
  const { isRepublic, regionId } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
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
