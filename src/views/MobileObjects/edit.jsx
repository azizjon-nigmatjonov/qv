import { useState } from 'react'

import { MuiTabs } from '../../components'
import { UsersDashboard } from '../Dashboard/UsersDashboard'
import MobileDocs from './tabs/MobileDocs'
import MobileJournal from './tabs/MobileJournal'
import MobileMainInfo from './tabs/MobileMainInfo'
import MobilePhotoReport from './tabs/MobilePhotoReport'
import MobileMonitoring from './tabs/Monitoring/MobileMonitoring'
import { useSearchParams } from 'react-router-dom'
import MobileRegulations from '../MobileRegulations/Regulation/MobileRegulations'

const MobileObjectsEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 0)

  const tabElements = [
    {
      title: "Asosiy ma'lumotlar",
      key: 0,
      component: <MobileMainInfo />,
    },
    {
      title: 'Hujjatlar',
      key: 1,
      component: <MobileDocs />,
    },
    {
      title: 'Monitoring',
      key: 2,
      component: <MobileMonitoring />,
    },
    {
      title: "Yozma ko'rsatmalar",
      key: 3,
      component: <MobileRegulations />,
    },
    {
      title: 'Ijro hujjatlari',
      key: 4,
      component: <MobileJournal />,
    },
    {
      title: 'Foto hisobot',
      key: 5,
      component: <MobilePhotoReport />,
    },
    {
      title: 'Nazorat kalendari',
      key: 6,
      component: <UsersDashboard />,
    },
  ]

  return (
    <div className="bg-white">
      <MuiTabs scrollable noPadding activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />
    </div>
  )
}

export default MobileObjectsEdit
