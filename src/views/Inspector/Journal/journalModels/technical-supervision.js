//33.Журнал>технического надзора

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'должность',
        key: 'position',
        width: 150,
      },
      {
        title: 'фамилия И.О специалист',
        key: 'fullName',
      },
      {
        title: 'вид работы технического надзора',
        key: 'workType',
        width: 233,
      },
      {
        title: 'дата начала ',
        key: 'date_start',
      },
      {
        title: 'окончания',
        key: 'endDate',
        width: 384,
      },
      {
        title: 'этапов работы',
        key: 'workStage',
        width: 384,
      },
    ],

    name: 'techncalSupervision',
    title: 'Технический надзор',
    hasDates: true,
  },
]
