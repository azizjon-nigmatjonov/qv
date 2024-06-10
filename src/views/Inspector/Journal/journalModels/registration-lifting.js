// учета и периодического осмотра состояния съемных грузозахватных приспособлений (СГЭП) и тары

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: '№ СГЭП или тары',
        key: 'number',
        width: 209,
      },
      {
        title: 'Наименование СГЭП или тары',
        key: 'name',
        width: 228,
      },
      {
        title: 'Грузоподъемность СГЭП или тары',
        key: 'lift',
        width: 184,
      },
      {
        title: 'Изготовитель',
        key: 'creater',
        width: 184,
      },
      {
        title: '№ паспорта, дата испытания',
        key: 'passport',
        width: 300,
        columns: [
          {
            title: 'номер',
            key: 'num',
            width: 150,
          },
          {
            title: 'дата',
            key: 'date',
            width: 150,
          },
        ],
      },
      {
        title: 'Дата',
        key: 'date',
        width: 146,
      },
      {
        title: 'Результат',
        key: 'result',
        width: 146,
      },
      {
        title: 'Должность, Ф.И.О.',
        key: 'user',
        width: 300,
        columns: [
          {
            key: 'name',
            title: 'Имя',
            width: 150,
          },
          {
            key: 'role',
            title: 'должность',
            width: 150,
          },
        ],
      },
      {
        title: 'Подпись производившего осмотр',
        key: 'sign',
        width: 146,
      },
    ],
    name: 'registration_lifting',
    title: 'Учета и периодического осмотра состояния съемных грузозахватных приспособлений (СГЭП) и тары',
    hasDates: true,
  },
]
