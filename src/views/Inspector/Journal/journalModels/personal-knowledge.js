// 15.Журнал> учета проверки знаний персонала обслуживающего грузоподъемные краны
export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, Имя, Отчество',
        key: 'fullname',
        width: 209,
      },
      {
        title: 'Специальность, профессия',
        key: 'profession',
        width: 228,
      },
      {
        title: 'Кем выдано,номер и дата выдачи удостоверения',
        key: 'by_whom',
        width: 184,
      },
      {
        title: 'Ежегодные повторные проверки знаний',
        key: 'retests',
        width: 674,
        columns: [
          {
            title: '20_____год.',
            key: 'first_year',
            width: 337,
            children: [
              {
                title: 'Номер протокола, дата',
                key: 'date_protocol',
                width: 169,
              },
              {
                title: 'Оценка',
                key: 'second_ball',
                width: 168,
              },
            ],
          },

          {
            title: '20_____год.',
            key: 'second_year',
            width: 337,
            children: [
              {
                title: 'Номер протокола, дата',
                key: 'date_protocol_second',
                width: 169,
              },
              {
                title: 'Оценка',
                key: 'second_ball',
                width: 168,
              },
            ],
          },
        ],
      },
      {
        title: 'Примечание',
        key: 'note',
        width: 228,
      },
    ],
    hasDates: true,
    name: 'personal_knowledge',
    title: 'Журнал учета проверки знаний персонала обслуживающего грузоподъемные краны',
  },
]
