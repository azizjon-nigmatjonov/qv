// 26.Журнал> Учета проверки правил работы в електроустановках

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, Имя, Отчество, занимемая должность и стаж работы в етой должности',
        key: 'fullname',
        width: 213,
      },
      {
        title: 'Дата предыдущей проверки оценка знаний и групппа по електробезопасности',
        key: 'ball_date',
        width: 214,
      },
      {
        title: 'Дата и причина проверки',
        key: 'reason_review',
        width: 213,
      },
      {
        title: 'Общая оценка знаний, группа по елетробезопасности и заключение комиссии',
        key: 'general_assessment_of_knowledge',
        width: 213,
      },
      {
        title: 'Подпись проверяющего лица',
        key: 'signature',
        width: 213,
      },
      {
        title: 'Дата следующей проверки',
        key: 'date',
      },
    ],
    name: 'electrical_installations',
    title: 'Учета проверки правил работы в електроустановках',
    hasDates: true,
  },
]
