// 19.Журнал> складского учёта товарно материальных ценностей в работ

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Получатель (Ф.И.О)',
        key: 'customer_fullname',
        width: 209,
      },
      {
        title: 'Наименование',
        key: 'naming',
        width: 228,
      },
      {
        title: 'Ед. Из.',
        key: 'ed_iz',
        width: 184,
      },
      {
        title: 'Дата выдача',
        key: 'given_date',
        width: 184,
      },
      {
        title: 'Подпись',
        key: 'signature',
        width: 167,
      },
      {
        title: 'Ед. Из.',
        key: 'second_ed_iz',
        width: 168,
      },
      {
        title: 'Дата возврат',
        key: 'return_date',
        width: 160,
      },
      {
        title: 'Подпись',
        key: 'second_signature',
        width: 109,
      },
      {
        title: 'Примечания',
        key: 'node',
        width: 109,
      },
    ],
    name: 'warehouse_accounting',
    title: '19.Журнал складского учёта товарно материальных ценностей в работ.',
    hasDates: true,
  },
]
