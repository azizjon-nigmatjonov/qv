// 10.Журнал> учета и содержания средств защиты
export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Наименование средства защиты, тип',
        key: 'protective_naming',
        width: 127,
      },
      {
        title: 'Инв. №',
        key: 'individual_number',
        width: 183,
      },
      {
        title: 'Дата испытания',
        key: 'date_test',
        width: 169,
      },
      {
        title: 'Дата следующего испытания',
        key: 'date_test_next',
        width: 245,
      },
      {
        title: 'Дата периодического осмотра',
        key: 'date_periodic_inspection',
        width: 209,
      },
      {
        title: 'Результат периодического осмотра',
        key: 'inspection_result',
        width: 228,
      },
      {
        title: 'Подпись лица, производившего осмотр',
        key: 'signature_inspection',
        width: 228,
      },
      {
        title: 'Место нахождения',
        key: 'location',
        width: 228,
      },
      {
        title: 'Дата выдачи в индивидуальное пользование',
        key: 'given_date',
        width: 228,
      },
      {
        title: 'Подпись лица, получившего СИЗ в индивидуальное пользование',
        key: 'siz_signature',
        width: 228,
      },
      {
        title: 'Примечание',
        key: 'note',
        width: 167,
      },
    ],
    hasDates: true,
    name: 'protective_equipment',
    title: 'Журнал учета и содержания средств защиты',
  },
]
