//Учета поситетелей на обьекта

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, имя отчество',
        key: 'full_name',
        width: 150,
      },
      {
        title: 'Поспортные данные',
        key: 'passport_series',
        width: 340,
      },
      {
        title: 'Время прибытия',
        key: 'input_time',
        width: 233,
      },
      {
        title: 'Время убытия ',
        key: 'output_time',
        width: 233,
      },
      {
        title: 'Примечание',
        key: 'reason',
        width: 384,
      },
    ],
    name: 'input-output-journals',
    title: 'Посетители',
    hasDates: true,
  },
]
