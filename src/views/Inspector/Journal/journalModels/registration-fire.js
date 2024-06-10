// 18.Журнал> регистрации противопожарного инструктажа

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, имя, отчество инструктируемого',
        key: 'instructor_fullname',
        width: 209,
      },
      {
        title: 'Год рождения',
        key: 'date_birth',
        width: 228,
      },
      {
        title: 'Профессия (должность) инструктируемого',
        key: 'position',
        width: 184,
      },
      {
        title: 'Структурное подразделение',
        key: 'subdivision_structure',
        width: 184,
      },
      {
        title: 'Фамилия, инициалы, должность инструктирующего',
        key: 'user_fullname',
        width: 251,
      },
      {
        title: 'Подпись инструктирующего',
        key: 'user_signature',
        width: 168,
      },
      {
        title: 'Подпись инструктируемого',
        key: 'instructor_signature',
        width: 160,
      },
    ],
    name: 'registration_fire',
    title: 'Журнал регистрации противопожарного инструктажа',
    hasDates: true,
  },
]
