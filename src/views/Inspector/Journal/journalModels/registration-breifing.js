// 27.Журнал> Регистрации инструктажа на рабочем месте

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'дата проведения инструктажа',
        key: 'date_review',
        width: 155,
      },
      {
        title: 'Фамилия, Имя, Отчество, инструктируемога',
        key: 'instruct_fullname',
        width: 214,
      },
      {
        title: 'профессия, должность инструктируемога',
        key: 'instruct_position',
        width: 213,
      },
      {
        title: 'инструктаж: первичный на рабочем месте, повторный, внеплановый текущий',
        key: 'first_at_work',
        width: 350,
      },
      {
        title: 'номер инструкции или её название',
        key: 'name_instructing',
        width: 213,
      },
      {
        title: 'Фамилия, Имя, Отчество, инструктирующего',
        key: 'instructor_fullname',
      },
      {
        title: 'подпись',
        key: 'signature',
        columns: [
          {
            title: 'инструктирующего',
            key: 'signature_instructor',
            width: 166,
          },
          {
            title: 'инструктируемого',
            key: 'signature_instruct',
            width: 166,
          },
        ],
      },
      {
        title: 'Допуск к работе произвел',
        key: 'permit_to_work',
        columns: [
          {
            title: 'Фамилия, Имя, Отчество',
            key: 'permit_fullname',
            width: 180,
          },
          {
            title: 'подпись',
            key: 'signature_permit',
            width: 180,
          },
        ],
      },
    ],
    name: 'registration_breifing',
    title: 'Регистрации инструктажа на рабочем месте',
    hasDates: true,
  },
]
