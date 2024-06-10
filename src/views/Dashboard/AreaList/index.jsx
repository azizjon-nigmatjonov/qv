import debounce from 'lodash.debounce'
import { useEffect, useMemo, useState } from 'react'
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import { FilterHeader, Header, Input } from '../../../components'
import SearchIcon from '@mui/icons-material/Search'
import { HeadTitle, filterOptions } from './data'
import FilterHeaderLeftElements from '../components/FilterHeadLeftElements'
import DatePicker from '../components/DatePicker'
import { backLinkMaker } from '../components/backLinkMaker'
import { MuiTabs } from '../../../components'
import ObjectTypeTabs from '../components/ObjectsTypeTabs'
import ReactSelect, { components } from 'react-select'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import { Person } from '@mui/icons-material'

const Control = ({ children, ...props }) => {
  const { type } = props.selectProps
  return (
    <components.Control {...props}>
      {type === 'objects' ? <HomeWorkIcon color="primary" /> : <Person color="primary" />} {children}
    </components.Control>
  )
}
const style = {
  control: (base) => ({
    ...base,
    border: 0,
    minWidth: 250,
    maxWidth: 250,
    paddingLeft: '4px',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
}

export default function DashboardObjects({ type }) {
  const { analyticSection } = useParams()
  let [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const changeHandler = (event) => setSearchParams({ ...searchParamsMemo, search: event.target.value })
  const debouncedEventHandler = useMemo(() => debounce(changeHandler, 300), [])

  const backLink = useMemo(
    () => backLinkMaker({ searchParams, type, section: analyticSection }),
    [searchParams, type, analyticSection]
  )
  const changeObjectStatusHandler = (e, action) => {
    const { status, ...params } = searchParamsMemo
    if (action === 'select-option') {
      let p = {}
      if (type === 'objects') {
        p = { ...searchParamsMemo, status: e.value }
      } else {
        p = { ...searchParamsMemo, userStatus: e.value }
      }
      setSearchParams(p)
    } else if (action === 'clear') {
      setSearchParams(params)
    }
  }
  const objectTypeOptions = useMemo(() => {
    let options = filterOptions(analyticSection)
    return options
  }, [analyticSection])
  const selectedstatusOption = useMemo(() => {
    return objectTypeOptions.filter((option) => {
      if (type === 'objects') {
        return option?.value === searchParamsMemo?.status
      } else {
        return option?.value === searchParamsMemo?.userStatus
      }
    })
  }, [searchParamsMemo?.status, objectTypeOptions, searchParamsMemo?.userStatus, type])

  return (
    <div>
      <Header title={<HeadTitle />} backLink={backLink} centerElement={<ObjectTypeTabs />} />
      <FilterHeader
        leftElements={[
          <Input
            name="search"
            onChange={debouncedEventHandler}
            className="pl-[8px] pr-[8px]"
            height={36}
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
            placeholder="Qidirish..."
          />,
          <FilterHeaderLeftElements />,
          <DatePicker />,
          <ReactSelect
            className="border rounded"
            type={type}
            options={objectTypeOptions}
            value={selectedstatusOption}
            onChange={(e, { action }) => {
              changeObjectStatusHandler(e, action)
            }}
            isMulti={false}
            isSearchable={false}
            isClearable={true}
            components={{ Control }}
            styles={style}
          />,
        ]}
      />
      <div className="sidebar-header-calc">
        <Outlet context={[type]} />
      </div>
    </div>
  )
}
