// 16.Журнал> учёта выдачи нарядов-допусковна производство работ с повышенной опасностью
export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Номер наряда-допуска',
        key: 'issuance_number',
        width: 155,
      },
      {
        title: 'Дата выдачи',
        key: 'given_date',
        width: 169,
      },
      {
        title: 'Краткое описание работ по наряду-допуску',
        key: 'short_comment',
        width: 184,
      },
      //fullname_date : {
      //  issuer_work: 'abc',
      //  receiver_work: 'abc',
      //}
      {
        title: 'Ф.И.О. Подпись, Дата',
        key: 'fullname_date',
        width: 341,
        columns: [
          {
            title: 'Выдавшего наряд-допуск',
            key: 'issuer_work',
            width: 170,
          },
          {
            title: 'Получившего наряд-допуск',
            key: 'receiver_work',
            width: 170,
          },
        ],
      },
      {
        title: 'Ф.И.О., Подпись лица, Получившего закрытый наряд-допуск по выполнению работ дата',
        key: 'work_permit_person',
        width: 263,
      },
    ],
    hasDates: true,
    name: 'accounting_issuance',
    title: 'Журнал учёта выдачи нарядов-допусковна производство работ с повышенной опасностью',
  },
]
