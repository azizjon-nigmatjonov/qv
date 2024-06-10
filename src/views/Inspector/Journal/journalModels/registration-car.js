// 25 Журнал> Регистрации вьезда и выезда автотранспорта

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
            width: 150,
          },
          {
            title: '№',
            key: 'number',
          },
        ],
      },
      {
        title: 'П№ путевого листа, Ф.И.О водителя',
        key: 'driver',
        columns: [
          {
            title: 'П№',
            key: 'waybill',
          },
          {
            title: 'Ф.И.О',
            key: 'name',
          },
        ],
      },
      {
        title: 'Время вьезда ',
        key: 'entry_time',
        width: 150,
      },
      {
        title: 'Время выезда',
        key: 'exit_time',
        width: 150,
      },
      {
        title: 'Цель вьезда/выезда',
        key: 'description',
      },
      {
        title: 'Примечание',
        key: 'order',
      },
    ],
    name: 'registration_car',
    title: 'Регистрации вьезда и выезда автотранспорта',
    hasDates: true,
  },
]
