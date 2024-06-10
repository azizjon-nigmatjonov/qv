export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, имя, отчество',
        key: 'name',
      },
      {
        title: 'Специаль ность, профессия',
        key: 'role',
      },
      {
        title: 'Кем выдано,номер и дата выдачи удостоверения',
        key: 'ticket',
        columns: [
          {
            title: 'Дата выдачи',
            key: 'date',
            width: 150,
          },
          {
            title: 'Название',
            key: 'name',
          },
          {
            title: '№',
            key: 'number',
          },
        ],
      },
      {
        title: 'П№ путевого листа, Ф.И.О водителя',
        key: 'years',
        align: 'center',
        columns: [
          {
            title: 'год',
            key: 'first',
            align: 'center',
            children: [
              {
                title: 'год',
                key: 'year',
              },
              {
                title: 'Номер прото кола, дата',
                key: 'number',
              },
              {
                title: 'Оценка',
                key: 'rating',
              },
            ],
          },
          {
            title: 'год',
            key: 'second',
            align: 'center',
            children: [
              {
                title: 'год',
                key: 'year',
              },
              {
                title: 'Номер протокола, дата',
                key: 'number',
              },
              {
                title: 'Оценка',
                key: 'rating',
              },
            ],
          },
        ],
      },
      {
        title: 'Примечание',
        key: 'order',
      },
    ],
    name: 'check_crans',
    title: 'Таблица 1',
    hasDates: true,
  },
]
