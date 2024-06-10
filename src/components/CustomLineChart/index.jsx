import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ payload }) => (
  <div className="bg-[#081123BF] rounded-md p-3 flex flex-col gap-2">
    {payload.map((item) => (
      <div key={item.color} className="flex justify-between items-center gap-3">
        <div className="flex gap-2">
          <div className={`w-4 h-4 rounded-sm`} style={{ backgroundColor: item.color }}></div>
          <span className="text-white font-semibold text-xs">
            {item.dataKey.length > 14 ? item.dataKey.slice(0, 14) + '...' : item.dataKey}
          </span>
        </div>
        <div className="text-white font-normal text-xs">{item.value}</div>
      </div>
    ))}
  </div>
)

const CustomLegend = ({ payload }) => (
  <div className="flex justify-between items-center pl-10 pt-3">
    {payload.map((item) => (
      <div className="mb-4 flex" key={item.color}>
        <div className={`w-5 h-4 rounded-sm mr-1`} style={{ background: item.color }}></div>
        <div className="flex w-full justify-between gap-3 items-center">
          <span className="text-xs leading-t">
            {item.value.length > 20 ? item.value.slice(0, 20) + '...' : item.value}
          </span>
          <span className="text-xs leading-5">{item.payload.value}</span>
        </div>
      </div>
    ))}
  </div>
)

export default function CustomLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="0 0" />
        <XAxis padding={{ right: 20 }} dataKey="name" />
        <YAxis padding={{ top: 20 }} />
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} verticalAlign="bottom" align="center" />
        <Line strokeWidth={3} type="linear" dataKey="Dam olish" stroke="#007AFF" activeDot={{ r: 5 }} />
        <Line strokeWidth={3} type="linear" dataKey="Kasallik dam olishi" stroke="#F8C51B" activeDot={{ r: 5 }} />
        <Line strokeWidth={3} type="linear" dataKey="Ish safari" stroke="#F76659" activeDot={{ r: 5 }} />
        <Line strokeWidth={3} type="linear" dataKey="O'qish" stroke="#9BCFFD" activeDot={{ r: 5 }} />
        <Line strokeWidth={3} type="linear" dataKey="Tarkibsiz" stroke="#67E48B" activeDot={{ r: 5 }} />
        <Line strokeWidth={3} type="linear" dataKey="Qo'shimcha dam olish" stroke="#D691F8" activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
