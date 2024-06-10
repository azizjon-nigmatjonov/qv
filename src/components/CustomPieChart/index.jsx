import { Tooltip } from '@mui/material'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { QuestionIcon } from '../../assets/icons'

const CustomLegend = ({ payload }) => {
  return payload.map((item) => (
    <div className="mb-4 flex mr-10" key={item.color}>
      <div className={`w-7 h-6 rounded-md mr-3`} style={{ background: item.color }}></div>
      <div className="flex w-full justify-between gap-3 items-center">
        <span className="text-sm leading-6 font-medium">{item.value}</span>
        <span className="grow border-b-2 mt-1 border-dotted border-[#6E8BB780]"></span>
        <span className="text-sm leading-6 font-semibold">{item.payload.value}</span>
      </div>
    </div>
  ))
}

const CustomBottomLegend = ({ payload }) => {
  const total = payload.reduce((acc, cur) => acc + cur.payload.value, 0)

  return (
    <div className="flex flex-wrap">
      {payload.map((item, index) => (
        <div key={item.color}>
          <div
            className={`flex p-2 relative ${index === 2 ? 'w-full flex-1' : 'w-1/2'}`}>
            <div
              className={`w-3 h-3 rounded-full absolute top-1/2 left-0 translate-y-[-50%]`}
              style={{ background: item.color }}
            ></div>
            <div className="pl-3">
              <div className="text-sm leading-[18px] mb-1.5 flex gap-1.5">
                <span>{item.value}</span>
                {/* {index !== 0 && (
                  <Tooltip title="80% dan ko`p monitoringlar kechikib o`tgazilgan" arrow placement="top-start">
                    <div className="cursor-pointer">
                      <QuestionIcon />
                    </div>
                  </Tooltip>
                )} */}
              </div>
              <p className="text-base font-semibold">
                {item.payload.value} ({Math.round((item.payload.value * 100) / total)}%)
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CustomPieChart({
  data,
  fn = () => {},
  colors,
  paddingAngle = 0,
  centerText,
  centerTextLength = 0,
  legend = 'vertical',
  onCellClick = () => {},
  position = { cy: 180 },
  radius = { inner: 80, outer: 115 },
  textPosition = { x1: '50%', x2: '50%', y1: '25%', y2: '32%' },
  total = 0,
  onPieClick = () => {}
}) {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart onClick={fn}>
        {legend === 'vertical' ? (
          <Legend content={CustomLegend} layout="vertical" verticalAlign="middle" align="right" width="45%" />
        ) : (
          <Legend content={CustomBottomLegend} verticalAlign="bottom" align="right" />
        )}

        <text
          x={textPosition.x1}
          y={textPosition.y1}
          fontSize="32px"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {total}
        </text>
        <text
          x={textPosition.x2}
          y={textPosition.y2}
          textAnchor="middle"
          dominantBaseline="middle"
          textLength={centerTextLength}
          fontSize={14}
        >
          {centerText}
        </text>
        <Pie
          onClick={onPieClick}
          cornerRadius={6}
          valueKey="name"
          dataKey="value"
          data={data}
          cy={position.cy}
          innerRadius={radius.inner}
          outerRadius={radius.outer}
          paddingAngle={paddingAngle}
          animationBegin={0}
          isActiveIndex={0}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell
              style={{ cursor: 'pointer' }}
              onClick={(e) => onCellClick(e, index)}
              key={index}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
