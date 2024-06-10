import { Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Bar, BarChart, CartesianGrid, Cell, Legend, XAxis, YAxis } from 'recharts'
import { QuestionIcon } from '../../../assets/icons'
import useWindowSize from '../../../hooks/useWindowSize'

const CustomBottomLegend = ({ payload, data }) => {
  const { t } = useTranslation('common')
  const total = payload.reduce((acc, cur) => acc + data[cur.value], 0)
  return (
    <div className="flex flex-wrap">
      {payload.map((item, index) => (
        <div key={item.color} className={`flex p-2 relative w-full flex-auto`}>
          <div
            className={`w-3 h-3 rounded-full absolute top-1/2 left-0 translate-y-[-50%]`}
            style={{ background: item.value === 'registered' ? '#67E48B' : '#F76659' }}
          ></div>
          <div className="pl-3">
            <div className="text-sm leading-[18px] mb-1.5 flex gap-1.5">
              <span>{t(item.value)}</span>
              {/* {index !== 0 && (
                <Tooltip title="80% dan ko`p monitoringlar kechikib o`tgazilgan" arrow placement="top-start">
                  <div className="cursor-pointer">
                    <QuestionIcon />Tizimga kirilmaganlar
                  </div>
                </Tooltip>
              )}  */}
            </div>
            <p className="text-base font-semibold">
              {data[item.value]} ({total !== 0 ? Math.round((data[item.value] * 100) / total) : 0}%)
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
function prevent(fn, defaultOnly) {
  return (e, ...params) => {
    console.log(e)
    e && e.preventDefault()
    !defaultOnly && e && e.stopPropagation()
    fn(e, ...params)
  }
}
export default function BarChartForSmr({ data, onClickBar = () => {}, onBarClick = () => {} }) {
  const { width } = useWindowSize()
  return (
    <BarChart
      width={width / 5 - 50}
      height={380}
      data={data ?? []}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 16,
      }}
    >
      <CartesianGrid strokeDasharray="6 0" stroke="#f5f5f5" />
      <Tooltip />
      <Legend
        content={({ payload }) => <CustomBottomLegend payload={payload} data={data?.[0]} />}
        verticalAlign="bottom"
        align="right"
      />
      <Bar barSize={40} radius={[6, 6, 0, 0]} dataKey="registered" onClick={(e) => onClickBar('registered', e)}>
        {data?.map((entry, index) => (
          <Cell
            cursor="pointer"
            fill="#67E48B"
            key={`cell-${index}`}
            onClick={prevent((e) => onBarClick('4', 3))} //4 is a status for registered | backend :((
          />
        ))}
      </Bar>
      <Bar barSize={40} radius={[6, 6, 0, 0]} dataKey="notRegistered">
        {data?.map((entry, index) => (
          <Cell
            cursor="pointer"
            fill="#F76659"
            key={`cell-${index}`}
            onClick={prevent((e) => onBarClick('5', 4))}//5 is a status for registered | backend :((
          />
        ))}
      </Bar>
      {/* <Bar barSize={20} dataKey="amount" stackId="a" fill="#68A9FE" /> */}
    </BarChart>
  )
}
