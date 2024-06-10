import { Link } from 'react-router-dom'
import { Tag } from '../../../components'
import DeadlineSlider from '../../../components/DeadlineSlider'
import {
  AUTHOR_SUPERVISOR_ROLE_ID,
  BUYURTMACHI_ROLE_ID,
  ICHKI_NAZORATCHI_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  LOYIHACHI_ROLE_ID,
  REGISTRATURA_ROLE_ID,
  TEXNIK_NAZORATCHI_ROLE_ID,
} from '../../../settings/constants'
import { statuses } from '../../../settings/status'
import makeColUI from '../../../utils/makeColUI'
import priceFormatter from '../../../utils/priceFormatter'

export const tableHeadData = [
  {
    title: '№',
    key: 'order',
  },
  {
    title: 'Ariza raqami',
    key: ['task_id', 'id'],
    innerKey: 'task-id',
    render: (val) => (
      <>
        <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
          {val[0]}
        </span>
      </>
    ),
  },

  {
    title: 'Buyurtmachi',
    key: ['customer', 'id'],
    innerKey: 'full_name',
    objectChild: 'full_name',
    render: (val) => (
      <>
        <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
          {val[0]?.full_name}
        </span>
      </>
    ),
  },
  {
    title: 'Obyekt nomi',
    key: ['name', 'id'],
    innerKey: 'object-name',
    render: (val) => (
      <>
        <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
          {val[0]}
        </span>
      </>
    ),
  },
  {
    title: 'Manzil',
    key: ['address', 'id'],
    render: (val) => (
      <>
        <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
          {val[0]}
        </span>
      </>
    ),
  },
  {
    title: 'Inspektor',
    key: ['users', 'id'],
    innerKey: 'inspektor',
    render: (value) => (
      <>
        <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
          {makeColUI(
            value[0],
            value[0]?.find((i) => i.role_id === INSPEKTOR_BOSH_ROLE_ID)
              ? INSPEKTOR_BOSH_ROLE_ID
              : value[0]?.find((i) => i.role_id === INSPEKTOR_YETAKCHI_ROLE_ID)
              ? INSPEKTOR_YETAKCHI_ROLE_ID
              : value[0]?.find((i) => i.role_id === INSPEKTOR_PRASTOY_ROLE_ID)
              ? INSPEKTOR_PRASTOY_ROLE_ID
              : undefined
          )}
        </span>
      </>
    ),
  },

  {
    title: 'Texnik nazoratchi',
    key: ['users', 'id'],
    innerKey: 'buyurtmachi',
    render: (value) => (
      <>
        <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
          {makeColUI(
            value[0],
            value[0]?.find((i) => i.role_id === REGISTRATURA_ROLE_ID)
              ? BUYURTMACHI_ROLE_ID
              : value[0]?.find((i) => i.role_id === TEXNIK_NAZORATCHI_ROLE_ID)
              ? TEXNIK_NAZORATCHI_ROLE_ID
              : BUYURTMACHI_ROLE_ID
          )}
        </span>
      </>
    ),
  },
  {
    title: 'Loyihachi',
    key: ['users', 'id'],
    innerKey: 'loyihachi',
    render: (value) => (
      <>
        <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
          {makeColUI(value[0], [LOYIHACHI_ROLE_ID, AUTHOR_SUPERVISOR_ROLE_ID])}
        </span>
      </>
    ),
  },
  {
    title: 'Ichki nazoratchi',
    key: ['users', 'id'],
    innerKey: 'ichki-nazoratchi',
    render: (value) => (
      <>
        <span className="relative z-20" onClick={(e) => e.stopPropagation()}>
          {makeColUI(value[0], ICHKI_NAZORATCHI_ROLE_ID)}
        </span>
      </>
    ),
  },
  {
    title: 'Monitoring',
    key: 'monitoring',
    columns: [
      {
        title: 'Rejadagi',
        key: 'planned',
      },
      {
        title: "O'tkazilgan",
        key: 'conducted',
      },
      {
        title: "Muddati o'tgan",
        key: 'expired',
        render: (val) => <span className="text-red-500">{val}</span>,
      },
    ],
  },
  {
    title: `Yozma ko'rsatmalar`,
    key: 'regulation',
    columns: [
      {
        title: 'Berilgan',
        key: 'given',
      },
      {
        title: "Ijrosi ta'minlangan",
        key: 'executed',
      },
      {
        title: "Muddati o'tgan",
        key: 'expired',
        render: (val) => <span className="text-red-500">{val}</span>,
      },
    ],
  },
  {
    title: 'Muddati',
    key: ['deadline', 'created_at'],
    width: 186,
    render: ([deadline, created_at]) => (
      <>
        <DeadlineSlider created_at={created_at} deadline={deadline} />
      </>
    ),
  },
  {
    title: 'Xizmat narxlari',
    key: 'price_service',
    columns: [
      {
        title: 'Jami',
        key: 'all',
        render: (val) => <div className="w-[100px]">{priceFormatter(Math.round(val))}</div>,
      },
      {
        title: "To'langan",
        key: 'paid',
        render: (val) => <div className="w-[100px]">{priceFormatter(Math.round(val))}</div>,
      },
      {
        title: 'Qoldiq',
        key: 'rest',
        render: (val) => <div className="w-[100px]">{priceFormatter(Math.round(val))}</div>,
      },
    ],
  },
  {
    title: 'Jarimalar',
    key: 'administrative',
    columns: [
      {
        title: 'Soni',
        key: 'count',
      },
      {
        title: 'Qiymati',
        key: 'sum',
      },
    ],
  },

  {
    title: 'Holati',
    key: 'object_status_id',
    render: (value) => {
      const status = statuses.find((item) => item?.id === value)
      return <Tag color={status?.color} value={status?.status} />
    },
  },

  // {
  //   title: "Ma'qullash",
  //   key: 'id',
  //   render: (val) => (
  //     <div className="flex gap-3 w-[280px]">
  //       <BtnOutlined
  //         color="red"
  //         leftIcon={<Cancel fontSize="small" />}
  //         onClick={(e) => {
  //           e.stopPropagation()
  //           setSelectedId(val)
  //           handleOpen()
  //         }}
  //       >
  //         Bekor qilish
  //       </BtnOutlined>
  //       <BtnFiled leftIcon={<Check fontSize="small" />}>Qabul qilish</BtnFiled>
  //     </div>
  //   ),
  // },
]
