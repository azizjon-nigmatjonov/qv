// 28.Журнал>Производство электромонтажных работ

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, Имя, Отчество, ',
        key: 'fullname',
        width: 213,
      },
      {
        title: 'наименование цеха, электроустановки, где работает проверяемый',
        key: 'workshop_naming',
        width: 214,
      },
      {
        title: 'должность стаж работы в этой должности',
        key: 'position',
        width: 350,
      },
      {
        title: 'дата предыдущей проверки, оценка знаний',
        key: 'date_last_review',
        width: 288,
      },
      {
        title: 'дата настоящей проверки и причины',
        key: 'date',
        width: 289,
      },
      {
        title: 'оценка знаний',
        key: 'knowledge_assessment',
        width: 132,
      },
      {
        title: 'подпись проверяющего',
        key: 'signature_reviewer',
        width: 198,
      },
      {
        title: 'подпись проверяемого',
        key: 'signature',
        width: 198,
      },
    ],
    name: 'electrical_work',
    title: 'Производство электромонтажных работ',
    hasDates: true,
  },
]
