// 24 Журнал> учета прихода и ухода сотрудников учета рабочего времени

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Время прихода сотрудника',
        key: 'arrival_time',
        width: 238,
      },
      {
        title: 'ФИО сотрудника',
        key: 'employee_fullname',
        width: 228,
      },
      {
        title: 'Время ухода сотрудника',
        key: 'departure_time',
        width: 238,
      },
      {
        title: 'Подпись',
        key: 'signature',
        width: 192,
      },
      {
        title: 'Итого часов',
        key: 'total_hours',
        width: 192,
      },
      {
        title: 'Примечание',
        key: 'note',
        width: 192,
      },
    ],
    name: 'arrive_departure',
    title: 'Журнал учета прихода и ухода сотрудников учета рабочего времени',
    hasDates: true,
  },
]
