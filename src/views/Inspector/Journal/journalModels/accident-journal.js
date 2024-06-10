// 11.Журнал> регистрации несчастных случаев на производстве
export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата и время Несчастного Случая',
        key: 'accident_date',
        width: 127,
      },
      {
        title: 'Ф.И.О. Пострадавшего',
        key: 'injured_fullname',
        width: 183,
      },
      {
        title: 'Год рождения,',
        key: 'date_of_birth',
        width: 169,
      },
      {
        title: 'Общий стаж работы',
        key: 'work_experience',
        width: 168,
      },
      {
        title: 'Профессия (Должность)',
        key: 'position',
        width: 209,
      },
      {
        title: 'Место Несчастного Случая (Цех, участок)',
        key: 'accident_accident',
        width: 228,
      },
      {
        title: 'Вид происшествия, приведший к несчастному случаю',
        key: 'type_incident',
        width: 228,
      },
      {
        title: 'Краткие обстоятельства и причины несчастного случая',
        key: 'cause_accident',
        width: 228,
      },
      {
        title: '№ Акта о несчастном случае на производстве по форме Н-1 и дата его утверждения',
        key: 'act_number',
        width: 228,
      },
      {
        title: 'Последствия несчастного случая (количество дней нетрудоспособности, инвалидный, смертельный исход)',
        key: 'consequences_accident',
        width: 228,
      },
      {
        title: 'Принятые меры по устранению причин несчастного случая',
        key: 'taken_measures',
        width: 167,
      },
    ],
    hasDates: true,
    name: 'accident_journal',
    title: 'Журнал регистрации несчастных случаев на производстве',
  },
]
