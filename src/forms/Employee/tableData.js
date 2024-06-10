import { format } from 'date-fns'

import { RightArrowIcon } from '../../assets/icons'
import { StatusTag } from '../../components'
import DownloadButton from '../../components/DownloadButton'
import dateFormatter from '../../utils/dateFormatter'

export const changesHead = [
  {
    title: '№',
    key: 'order',
  },
  {
    title: 'Boshlangan sana',
    key: 'created_at',
    render: (value) => value && dateFormatter(format,new Date(value), 'dd.MM.yyyy'),
  },
  {
    title: 'Tuman',
    key: ['old_district', 'updated_district'],
    render: (val) => (
      <div className="flex justify-between items-center">
        {val[0].uz_name}
        <RightArrowIcon />
        {val[1].uz_name}
      </div>
    ),
  },
  {
    title: 'Diplom nusxasi',
    key: 'diploma_copy',
    render: (val) => <DownloadButton url={val} />,
  },
  {
    title: 'Attestatsiya',
    key: 'attestatsiya',
    render: (val) => <DownloadButton url={val} />,
  },
]

export const absentHead = [
  {
    title: '№',
    key: 'order',
  },
  {
    title: 'Boshlangan sana',
    key: 'begin_date',
  },
  {
    title: 'Tugagan sana',
    key: 'end_date',
  },
  {
    title: 'Davomiylik',
    key: 'duration',
    render: (val) => <span>{`${val} kun`}</span>,
  },
  {
    title: 'Sababi',
    key: ['status'],
    render: ([{ id, status }]) => <StatusTag title={status} statusId={id} />,
  },
  {
    title: 'Izoh',
    key: 'description',
  },
]

export const positionHead = [
  {
    title: '№',
    key: 'order',
  },
  {
    title: 'Boshlangan sana',
    key: 'date_at',
  },
  {
    title: 'Oldigi lavozim',
    key: 'old_role',
    render: (val) => <>{val.name}</>,
  },
  {
    title: 'Hozirgi lavozim',
    key: 'updated_role',
    render: (val) => <>{val.name}</>,
  },
  {
    title: "O'zgarishlar",
    key: ['order'],
    render: (val) => val[0] && <DownloadButton url={val[0]} />,
  },
]

export const firedHead = [
  {
    title: '№',
    key: 'order',
  },
  {
    title: "Bo'shatilgan sana",
    key: 'date_at',
  },
  {
    title: 'Lavozim',
    key: 'employee',
    render: (val) => <>{val.role_name}</>,
  },
  {
    title: "O'zgarishlar",
    key: 'changes',
    render: (val) => <DownloadButton url={val} />,
  },
]
