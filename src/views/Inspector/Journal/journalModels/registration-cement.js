// 23.Журнал> РЕГИСТРАЦИИ ПОСТУПЛЕНИЯ ЦЕМЕНТА

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Вхадной номер лабаратория',
        key: 'inner_number_laboratory',
        width: 209,
      },
      {
        title: 'Наименование цемента',
        key: 'cement_naming',
        width: 228,
      },
      {
        title: 'Ед измерения',
        key: 'unit_measurement',
        width: 184,
      },
      {
        title: 'Количество',
        key: 'count',
        width: 141,
      },
      {
        title: 'Дата поступления',
        key: 'receipt_date',
        width: 155,
      },
      {
        title: 'Номер партии',
        key: 'batch_number',
        width: 106,
      },
      {
        title: 'Предприятие-изготовитель',
        key: 'company_manufacturer',
        width: 128,
      },
      {
        title: 'Место хранеия',
        key: 'storage',
        width: 134,
      },
      {
        title: 'Подпись лаборанта',
        key: 'laborant_signature',
        width: 107,
      },
      {
        title: 'Примечание',
        key: 'note',
        width: 116,
      },
    ],
    name: 'registration_cement',
    title: 'Журнал регистрации поступления цемента',
    hasDates: true,
  },
]
