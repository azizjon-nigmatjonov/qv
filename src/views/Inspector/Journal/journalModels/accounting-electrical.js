// 35.Журнал>учета проверки знаний правил работы в электроустановках

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, Имя, Отчество, занимаемая должность и стаж работы в это должности',
        key: 'fullname',
        width: 213,
      },
      {
        title: 'дата предыдущей проверки, оценка знаний и группа электробезопасности',
        key: 'date_review',
        width: 214,
      },
      {
        title: 'дата и причина проверки',
        key: 'checking_reason',
        width: 241,
      },
      {
        title: 'общая оценка знаний группа по электробезопасности и заключение комиссии',
        key: 'generally_ball_electro_safe',
        width: 288,
      },
      {
        title: 'подпись проверяющего лица',
        key: 'signature',
        width: 171,
      },
      {
        title: 'дата следующей проверки',
        key: 'date',
        width: 218,
      },
    ],

    name: 'accounting_electrical',
    title: 'учёта проверки знаний правил работы в электроустановках',
    hasDates: true,
  },
]
