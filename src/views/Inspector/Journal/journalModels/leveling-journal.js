// 7.Журнал> Нивелировочный


export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Пикеты',
        key: 'pickets',
        width: 209,
      },
      {
        title: 'Отчёты по рейке',
        key: 'rail_reports',
        width: 310,
        columns: [
          {
            title: 'Зад.',
            key: 'back',
            width: 103,
          },
          {
            title: 'Промежут',
            key: 'inbetween',
            width: 103,
          },
          {
            title: 'Перед',
            key: 'front',
            width: 103,
          },
        ],
      },
      {
        title: 'Г.И.',
        key: 'gi',
        width: 253,
      },
      {
        title: 'Абсол. Отметка',
        key: 'absolute_mark',
        width: 253,
      },
      {
        title: 'проектные',
        key: 'projects',
        width: 253,
        columns: [
          {
            title: 'отметка',
            key: 'project_mark',
            width: 127,
          },
          {
            title: 'метр',
            key: 'meter',
            width: 127,
          },
        ],
      },
      {
        key: 'author_name',
        title: 'Геодезист',
        width: 253, 
      },
      {
        key: 'sign',
        title: 'Подпись',
        width: 153,
      }

    ],
    hasDates: true,
    name: 'leveling_journal',
    title: 'Нивелировочный',
  },
]
