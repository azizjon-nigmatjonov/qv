//РАБОТ ПО МОНТАЖУ СТРОИТЕЛЬНЫХ
export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, имя отчество',
        key: 'name',
        width: 150,
      },
      {
        title: 'Специальность и образование',
        key: 'specialty',
        width: 340,
      },
      {
        title: 'Занимаемая должность',
        key: 'role',
        width: 233,
      },
      {
        title: 'Дата начала работы на объекте ',
        key: 'start_date',
        width: 233,
      },
      {
        title: 'Отметка прохождении аттестации и дата аттестации',
        key: 'certificate_number_dt',
        width: 384,
      },
      {
        title: 'Дата окончания работы на объекте',
        key: 'end_date',
        width: 384,
      },
    ],
    name: 'journals_installation_structs_users',
    title: 'Работ по монтажу строительных конструкций',
    hasDates: false,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Наименование актов',
        key: 'act_name',
        width: 150,
      },
      {
        title: 'Дата подписания акта',
        key: 'act_date',
        width: 150,
      },
    ],

    name: 'journals_installation_structs_acts',
    title: 'Акты',
    hasDates: false,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата выполнения работ, смена',
        key: 'completion_date',
        width: 150,
      },
      {
        title:
          'Описание производнимых работ, наименование установливаемых конструкций, их марка, результаты осмотра конструкций',
        key: 'description',
        width: 150,
      },
      {
        title: 'Место установки и номера монтажных схем',
        key: 'location',
        width: 150,
      },
      {
        title: 'Номера технических паспортов на конструкции',
        key: 'passport_number',
        width: 150,
      },
      {
        title: 'Атмосферные условия (температура окружающего воздуха, осадки, скорость ветра',
        key: 'wheather',
        width: 150,
      },
      {
        title: 'бригадира',
        key: 'foreman',
        align: 'center',
        width: 350,
        columns: [
          {
            title: 'ФИО',
            key: 'foreman_name',
            width: 250,
          },
          {
            title: 'подпись',
            key: 'foreman_sign',
          },
        ],
      },
      {
        title:
          'Замечания и предложения по монтажу конструкций руководителей монтажной организации, авторского надзора, технического надзора заказчика',
        key: 'order',
        width: 150,
      },
      {
        title: 'Подпись',
        align: 'center',
        key: 'sign',
        width: 250,
        columns: [
          {
            title: 'Подпись мастера',
            key: 'master_sign',
            width: 100,
          },
          {
            title: 'Подпись лиц осуществляющих',
            key: 'author_sign',
            width: 100,
          },
        ],
      },
      {
        title: 'Примечания',
        key: 'reason',
        width: 250,
      },
    ],

    name: 'journals_installation_structs',
    title: 'Third table',
    hasDates: true,
  },
]
