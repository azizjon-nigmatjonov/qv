import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { BasicTable, Card } from '../../../../../components'
import DashBoardBuxMainContext from '../context'

export default function TableCard({ title, headData, data, directTo }) {
  const { search } = useLocation()

  const { t } = useTranslation('common')
  const { objectIsLoading, labIsLoading } = useContext(DashBoardBuxMainContext)
  return (
    <Card title={title} rightElement={<Link to={directTo + search} className="text-primary text-[16px]">{t('view.all')}</Link>}>
      <BasicTable headColumns={headData} bodyColumns={data} isLoading={objectIsLoading && labIsLoading} />
    </Card>
  )
}
