export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата',
        key: 'date',
        width: 150,
      },
      {
        title: 'Марка и № автотранспортного средства',
        key: 'avto',
        columns: [
          {
            title: 'Марка',
            key: 'mark',
            children: [
              {
                title: 'Номер марки',
                key: 'mark_number',
              },
              {
                title: 'Date',
                key: 'created_at',
              },
            ],
          },
          {
            title: '№',
            key: 'number',
          },
        ],
      },
    ],
    name: 'registration_car',
    title: 'Таблица 1',
    hasDates: true,
  },
]
