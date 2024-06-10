// 36.Журнал>регистрации вводного инструктажа по охране труда

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'дата проведения инструктажа',
        key: 'date_instruct',
        width: 213,
      },
      {
        title: 'Ф.И.О инструктируемого',
        key: 'instruct_fullname',
        width: 214,
      },
      {
        title: 'профессия должность инструктируемого',
        key: 'position',
        width: 350,
      },
      {
        title: 'наименование производственного подразделения, в которое направляется инструктируемый',
        key: 'production_unit_name',
        width: 289,
      },
      {
        title: 'Ф.И.О инструктирующего',
        key: 'instructor_fullname',
        width: 288,
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
    ],
    name: 'introductory_briefing_standard',
    title: 'регистрации вводного инструктажа по охране труда',
    hasDates: true,
  },
]
