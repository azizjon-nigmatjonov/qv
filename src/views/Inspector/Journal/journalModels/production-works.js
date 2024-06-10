// 30.Журнал>Производство работ

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'краткое описание работ и методам их производства',
        key: 'methods_description',
        width: 320,
      },
      {
        title: 'профессии рабочих и фамилия мастера, бригадира',
        key: 'master_surname',
        width: 320,
      },
      {
        title: 'профессия должность инструктируемого',
        key: 'position',
        width: 350,
      },
      {
        title: 'количество рабочих',
        key: 'workers_count',
        width: 320,
      },
      {
        title: 'состояние погоды и температуры воздуха',
        key: 'wether_temperature',
        width: 320,
      },
    ],
    name: 'production_works',
    title: 'Производство работ',
    hasDates: true,
  },
]
