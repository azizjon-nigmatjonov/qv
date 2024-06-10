// 20.Журнал> КАБЕЛЬНЫЙ ЖУРНАЛ

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Монтажная единица',
        key: 'mounting_unit',
        width: 209,
      },
      {
        title: 'Марка кабеля по проекту',
        key: 'cable_mark',
        width: 228,
      },

      {
        title: 'Заводская марка',
        key: 'trademark',
        width: 351,
        columns: [
          {
            title: 'Тип',
            key: 'type',
            width: 184,
          },
          {
            title: 'Число и сечение жил',
            key: 'core_number',
            width: 184,
          },
        ],
      },

      {
        title: 'Число резиновых жил',
        key: 'core_rubber',
        width: 167,
      },
      {
        title: 'Направление кабеля',
        key: 'cable_stack',
        width: 160,
      },
      {
        title: 'Длина, м',
        key: 'return_date',
        width: 160,
        columns: [
          {
            title: 'По проекту',
            key: 'by_project',
            width: 118,
          },
          {
            title: 'Проложено',
            key: 'laid',
            width: 118,
          },
        ],
      },
      {
        title: 'Примечания',
        key: 'node',
        width: 109,
      },
    ],
    name: 'cable_journal',
    title: 'Кабельный журнал',
    hasDates: true,
  },
]
