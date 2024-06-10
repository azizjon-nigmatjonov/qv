// 31.Журнал>приемки и осмотра лесов и подмостей

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'место установки лесов Или подмостой и их высота, наименование организации их установившей',
        key: 'scaffolding_site',
        width: 426,
      },
      {
        title: 'тип лесов или подмостей кем утвержден проект',
        key: 'scaffolding_type',
        width: 426,
      },
      {
        title: 'дата приемки или осмотра лесов или подмостей и номер акта приемки лесов',
        key: 'date',
        width: 426,
      },
    ],
    name: 'acceptance_inspection',
    title: 'Приомка и осмотра лесов и подмостей',
    hasDates: true,
  },
]
