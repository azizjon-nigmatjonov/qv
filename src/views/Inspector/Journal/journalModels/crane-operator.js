// 14.Журнал> вахтенный крановщика
export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Наименования механизма, узла, детали',
        key: 'mechanisms_naming',
        width: 426,
      },
      {
        title: 'Результаты проверки',
        key: 'checking_results',
        width: 426,
      },
      {
        title: 'Фамилия, инициалы и должность лица устранившего нарушение',
        key: 'violation_user',
        width: 426,
      },
    ],
    hasDates: true,
    name: 'crane_operator',
    title: 'Журнал вахтенный крановщика',
  },
]
