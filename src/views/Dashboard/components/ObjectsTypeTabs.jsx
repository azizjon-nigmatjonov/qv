import { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { MuiTabs } from '../../../components'

export default function ObjectTypeTabs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const [activeTab, setActiveTab] = useState(searchParamsMemo.objectType || 0)
  const tabElements = [
    { key: 0, title: 'Barchasi' },
    { key: 1, title: 'Davlat obyektlari' },
    { key: 2, title: 'Tadbirkorlik obyektlari' },
  ]
  useEffect(() => {
    const { status, userStatus, user, ...rest } = searchParamsMemo
    if (!(pathname.includes('objects') || pathname.includes('users'))) {
      setSearchParams({ ...rest, objectType: activeTab })
    } else {
      setSearchParams({ ...searchParamsMemo, objectType: activeTab })
    }
  }, [activeTab, setSearchParams, searchParamsMemo, pathname])

  return (
    <MuiTabs getParamsFromLocation={false} activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />
  )
}
