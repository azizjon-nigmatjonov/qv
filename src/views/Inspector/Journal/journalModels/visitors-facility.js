// 32.Журнал>учета посетителей на объекте

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, Имя, Отчество',
        key: 'fullname',
        width: 256,
      },
      {
        title: 'паспортные данные',
        key: 'passport',
        width: 256,
      },
      {
        title: 'время прибытия',
        key: 'arrive_date',
        width: 256,
      },
      {
        title: 'время убытия',
        key: 'deport_date',
        width: 256,
      },
      {
        title: 'примечание',
        key: 'note',
        width: 256,
      },
    ],
    name: 'visitors_facility',
    title: 'учета посетителей на объекте',
    hasDates: true,
  },
]
