//39.Журнал> Проиводства бетонных работ

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата бетонирования',
        key: 'created_at',
        width: 150,
      },
      {
        title:
          'Наименования бетонируемой части сооржений и конструктивных элементов (с указанием координатных осей и отметок)',
        key: 'name_concreted_part',
        width: 340,
      },
      {
        title: 'Проектная марка бетона',
        key: 'brend',
        width: 233,
      },
      {
        title: 'Объем бетона уложенного за смену, м3 ',
        key: 'amount_per_shift',
        width: 233,
      },
      {
        title: 'Способ уплотнении бетонной смеси (тип вибратора)',
        key: 'compaction_method',
        width: 384,
      },
      {
        title: 'Температура бетонной смеси при укладке,℃',
        key: 'mixture_temperature',
        width: 384,
      },
      {
        title: 'Температура наружного воздуха ℃',
        key: 'outside_temperature',
        width: 384,
      },
      {
        title: 'Атмосферные осадки, ветер и другие особенности погоды',
        key: 'wheather_features',
        width: 384,
      },
      {
        title: 'Маркировка контрольных образцов',
        key: 'mark_control_samples',
        width: 384,
      },
      {
        title: 'Резултаты испытания контрольних образцов (кгс/см3)',
        key: 'result',
        width: 589,
        columns: [
          {
            title: 'Производителя работ',
            key: 'result_sample_experiments_before',
            width: 200,
          },
          {
            title: 'Представителя заказчика',
            key: 'result_sample_experiments_after',
          },
        ],
      },
      {
        title: 'Дата распалубки данной части сооружения',
        key: 'date_concreted_part',
        width: 384,
      },
      {
        title: 'Подпись производителя',
        key: 'sign_producer',
        width: 384,
      },
      {
        title: 'Подпись лаборанта',
        key: 'sign_labarant',
        width: 384,
      },
    ],
    name: 'concrete_works_journals',
    title: 'Проиводства бетонных работ',
    hasDates: true,
  },
]
