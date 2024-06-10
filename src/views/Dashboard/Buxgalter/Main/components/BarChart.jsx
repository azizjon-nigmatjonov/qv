import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, Legend, XAxis, YAxis } from 'recharts'
import { Card } from '../../../../../components'
import useWindowSize from '../../../../../hooks/useWindowSize'
import DashBoardBuxMainContext from '../context'

export default function BarChartInfo() {
  const { t } = useTranslation('common')
  const { width } = useWindowSize()
  const { barChartData } = useContext(DashBoardBuxMainContext)
  return (
    <div>
      <Card title={t('Hududlar bo`yicha statistika')}>
        <div className="flex w-full h-full overflow-x-auto">
          <BarChart
            width={width - 140}
            height={500}
            data={barChartData ?? []}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 80,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              height={60}
              dataKey="location_uz_name"
              interval={0}
              dy="10"
              tickSize
              fontSize={10}
              allowDataOverflow="true"
              tickMargin={60}
              angle={-45}
            />
            <YAxis />
            <Tooltip />
            <Bar barSize={20} dataKey="amount" stackId="a" fill="#68A9FE" />
          </BarChart>
        </div>
      </Card>
    </div>
  )
}
