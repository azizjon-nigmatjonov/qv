// 22.Журнал> учета  поступления и расхода арматуры

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Участок работ',
        key: 'work_area',
        width: 228,
      },
      {
        title: 'Номер скважины',
        key: 'well_number',
        width: 184,
      },
      {
        title: 'Параметры бурения скважины',
        key: 'well_parameters',
        width: 495,
        columns: [
          {
            title: 'Глубина, м',
            key: 'deep',
            width: 168,
          },
          {
            title: 'Диаметр',
            key: 'diameter',
            width: 168,
          },
          {
            title: 'Угол бурения',
            key: 'drilling_angle',
            width: 168,
          },
        ],
      },
      {
        title: 'Буровое оборудование',
        key: 'drilling_equipment',
        width: 141,
      },
      {
        title: 'Время бурения, начало-конес Час,мин',
        key: 'drilling_time',
        width: 140,
      },
      {
        title: 'Пробурено замену, м',
        key: 'drilled_replace',
        width: 106,
      },
      {
        title: 'Примечание',
        key: 'node',
        width: 115,
      },
      {
        title: 'Подпись',
        key: 'signature',
        width: 115,
      },
    ],
    name: 'consumption_accounting',
    title: 'Журнал учета  поступления и расхода арматуры',
    hasDates: true,
  },
]
