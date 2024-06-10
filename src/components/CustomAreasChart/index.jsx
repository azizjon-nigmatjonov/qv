import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  {
    title: 'Toshkent',
    amount: 3000,
  },
  {
    title: 'Buxoro',
    amount: 2300,
  },
  {
    title: 'Navoiy',
    amount: 1400,
  },
  {
    title: 'Samarqand',
    amount: 2200,
  },
  {
    title: 'Jizzax',
    amount: 1200,
  },
  {
    title: 'Sirdaryo',
    amount: 3300,
  },
  {
    title: 'Xorazm',
    amount: 2000,
  },
  {
    title: 'Namangan',
    amount: 20,
  },
  {
    title: 'Farg`ona',
    amount: 3000,
  },
  {
    title: 'Andijon',
    amount: 1000,
  },
  {
    title: 'Qashqar',
    amount: 3500,
  },
  {
    title: 'Surxondaryo',
    amount: 300,
  },
]

export default function CustomAreasBarchart({ textPosition = { x1: '50%', x2: '50%', y1: '30%', y2: '36%' } }) {
  return (
    <div>
        <BarChart width={1300} height={400} data={data}>
          <XAxis dataKey="title" stroke="rgba(0,0,0,0.4)" />
          <YAxis dataKey="amount" padding={{ top: 30 }} stroke="rgba(0,0,0,0.4)" />

          <Tooltip background="red" cursor={{ fill: 'transparent' }} />
          <Bar dataKey="amount" fill="#68A9FE" barSize={20} />
        </BarChart>
    </div>
  )
}
