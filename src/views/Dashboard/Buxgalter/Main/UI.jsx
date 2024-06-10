import { Grid } from '@mui/material'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import DashBoardBuxMainContext from './context'
import TableCard from './components/TableCard'
import BarChartInfo from './components/BarChart'

export default function UI() {
  const { labHeadData, objectHeadData, labData, objectData } = useContext(DashBoardBuxMainContext)
  const { t } = useTranslation('common')
  return (
    <div>
      <div className="sidebar-header-calc">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TableCard
              title={t('Laboratoriya shartnomalari')}
              headData={labHeadData}
              data={labData}
              directTo="/labaratory"
            />
          </Grid>
          <Grid item xs={6}>
            <TableCard title={t('objects')} headData={objectHeadData} data={objectData} directTo="/inspectors" />
          </Grid>
          <Grid item xs={12}>
            <BarChartInfo />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
