//Регистрации вводного инструктажа по пожарной безопасности

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Должность, проектная организация',
        key: 'role',
        width: 250,
      },
      {
        title: 'Фамилия, инициалы',
        key: 'name',
        width: 340,
      },
      {
        title: 'Работа. по которой осуществляется авторский надзор',
        key: 'supervision_job',
        width: 233,
      },
      {
        title: 'Дата и номер приказа о назначении литц авторского надзора ',
        key: 'supervision',
        width: 300,
        columns: [
          {
            title: 'Дата',
            key: 'date',
            width: 150,
          },
          {
            title: 'Номер',
            key: 'number',
            width: 150,
          },
        ],
      },
    ],
    name: 'supervision_user',
    title: 'Состав специалистов',
    hasDates: true,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Наименование организация',
        key: 'company_name',
        width: 200,
      },
      {
        title: 'Фамилия, инициалы',
        key: 'name',
        width: 340,
      },
      {
        title: 'Занимаемая должность',
        key: 'company_role',
        width: 233,
      },
      {
        title: 'Номер телефона, место работы ',
        key: 'company',
        width: 400,
        columns: [
          {
            title: 'Номер телефона',
            key: 'phone',
            width: 200,
          },
          {
            title: 'Место работы',
            key: 'mobile',
            width: 200,
          },
        ],
      },
      {
        title: 'Дата',
        key: 'date',
        width: 250,
        columns: [
          {
            title: 'Приезда',
            key: 'start',
            width: 125,
          },
          {
            title: 'Отъезда',
            key: 'end',
            width: 125,
          },
        ],
      },
    ],
    name: 'supervision_company',
    title: 'Регистрация организаций',
    hasDates: true,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата',
        key: 'date',
        width: 150,
      },
      {
        title:
          'Выявление отступлений от проектно-сметной документации, нарушение необходимых строительных норм, правил и технических условий и производство строительных работ',
        key: 'violations',
        width: 340,
      },
      {
        title: 'Указания об устранении выявленных оступленный или нарушений и сроку их исполнения',
        key: 'instruction',
        width: 233,
      },
      {
        title: 'Запись произвел (фамилия, инициалы)',
        key: 'created_name',
        width: 233,
      },
      {
        title: 'Строительно-монтажой организации',
        key: 'organization',
        align: 'center',
        columns: [
          {
            title: 'Наименование',
            key: 'name',
          },
          {
            title: 'Занимаемая',
            key: 'role',
          },
          {
            title: 'Дата',
            key: 'date',
          },
          {
            title: 'Подпись',
            key: 'sign',
          },
        ],
      },
      {
        title: 'Заказчик',
        key: 'customer',
        align: 'center',
        columns: [
          {
            title: 'Наименование',
            key: 'name',
          },
          {
            title: 'Занимаемая',
            key: 'role',
          },
          {
            title: 'Дата',
            key: 'date',
          },
          {
            title: 'Подпись',
            key: 'sign',
          },
        ],
      },
      {
        title: 'Производителя работ',
        key: 'producer',
        align: 'center',
        columns: [
          {
            title: 'Наименование',
            key: 'name',
          },
          {
            title: 'Занимаемая',
            key: 'role',
          },
          {
            title: 'Дата',
            key: 'date',
          },
          {
            title: 'Подпись',
            key: 'sign',
          },
        ],
      },
      {
        title: 'Производителя заказчика',
        key: 'buyer',
        align: 'center',
        columns: [
          {
            title: 'Наименование',
            key: 'name',
          },
          {
            title: 'Занимаемая',
            key: 'role',
          },
          {
            title: 'Дата',
            key: 'date',
          },
          {
            title: 'Подпись',
            key: 'sign',
          },
        ],
      },
    ],
    name: 'supervision',
    title: 'Учетный лист',
    hasDates: true,
  },
]
