// 13.Журнал> трехступенчатого контроля за состоянием охраны и условий безопасности трудана рабочих местах

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата проведения проверки',
        key: 'check_date',
        width: 520,
        columns: [
          {
            title: 'I  ступень',
            key: 'first_step',
            width: 183,
          },
          {
            title: 'I I  ступень',
            key: 'second_step',
            width: 169,
          },
          {
            title: 'I I I  ступень',
            key: 'third_step',
            width: 168,
          },
        ],
      },
      {
        title: 'Отмеченные нарушения',
        key: 'violation_report',
        width: 209,
      },
      {
        title: 'Мероприятия по устранению нарушения',
        key: 'violation_eliminate',
        width: 184,
      },
      {
        title: 'Сроки выполнения',
        key: 'deadline',
        width: 184,
      },
      {
        title: 'Лицо, ответственное за выполнение (подпись)',
        key: 'signature',
        width: 228,
      },
      {
        key: 'position_signature',
        title: 'Лицо, проводившее Контроль (Ф.И.О., должность, подпись)',
        width: 228,
      },
      {
        key: 'sign',
        title: 'Отметка о выполнении мероприятия (подпись)',
        width: 201,
      },
    ],
    hasDates: true,
    name: 'three_step_control',
    title: 'Журнал трехступенчатого контроля за состоянием охраны и условий безопасности трудана рабочих местах',
  },
]
