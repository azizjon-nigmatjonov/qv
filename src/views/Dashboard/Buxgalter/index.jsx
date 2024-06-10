import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { Header } from '../../../components'
import WorkIsGoingOn from '../../../components/WorkIsGoingOn'

export default function DashboardBuxgalter({ apparat }) {
  const { t } = useTranslation('common')

  return (
    <div className={`relative`}>
      {/* {apparat && <WorkIsGoingOn />} */}
      <Header title={t('main.page')} />
      <Outlet />
    </div>
  )
}
