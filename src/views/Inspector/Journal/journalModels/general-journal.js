///Проиводства бетонных работ


export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, Имя, Отчество, занимаемая должность, участок работ',
        key: 'name',
        width: 150,
      },
      {
        title: 'Дата начала работ на строителсьстве объекта',
        key: 'start_date',
        width: 340,
      },
      {
        title: 'Отметка о получении разрешения на право производства работ или о прохождении аттестации',
        key: 'mark',
        width: 233,
      },
      {
        title: 'Дата окончания работ на строительстве объекта ',
        key: 'end_date',
        width: 233,
      },
    ],
    name: 'general_object',
    title: 'Таблица 1',
    hasDates: true,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Наименование актов ( с указанием места расположения)',
        key: 'act_location_name',
      },
      {
        title: 'Дата подписания акта, фамилии, инициалы и должности потписавших',
        key: 'act_info',
        columns: [
          {
            title: 'Дата',
            key: 'date',
            width: 150,
          },
          {
            title: 'ФИО',
            key: 'name',
          },
          {
            title: 'Должность',
            key: 'role',
          },
        ],
      },
    ],
    name: 'general_act',
    title: 'Таблица 2',
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
      },
      {
        title: 'Наименование конструктивных чатей и элементов, место их росположения со ссылкой на номер чертежей',
        key: 'construct_name',
      },
      {
        title: 'Результаты оценка качества',
        key: 'result',
      },
      {
        title: 'Должности и подписи лиц, оценивающих качество работ в порядке контроля и надзора',
        key: 'user',
        columns: [
          {
            title: 'Должность',
            key: 'role',
          },
          {
            title: 'Подпись',
            key: 'sign',
          },
        ],
      },
    ],
    name: 'general',
    title: 'Таблица 3',
    hasDates: true,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Наименование специального журнала и дата его выдачи',
        key: 'special',
      },
      {
        title: 'Организация, ведущая журнал, фамилия, инициалы и должность ответственного лица',
        key: 'user',
        columns: [
          {
            title: 'Наименование организации',
            key: 'name',
          },
          {
            title: 'Должность',
            key: 'role',
          },
        ],
      },

      {
        title: 'Дата сдачи приемки журнала и подписи должности лиц',
        key: 'journal',
        columns: [
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
    name: 'general_special',
    title: 'Таблица 4',
    hasDates: true,
  },

  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата и смена',
        key: 'date',
        width: 150,
      },
      {
        title:
          'Краткое описание и условия производства работ (со ссылкой, при необходимости, на работы, выполняемые субподрядными организациями), должность, фамилия, инициалы подиись ответственного лица',
        key: 'worker_fio',
        columns: [
          {
            title: 'Должность',
            key: 'role',
          },
          {
            title: 'ФИО',
            key: 'name',
          },
          {
            title: 'Подпись',
            key: 'sign',
          },
        ],
        // width: 800,
      },
    ],
    name: 'general_work',
    title: 'Таблица 5',
    hasDates: true,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата и смена',
        key: 'date',
        width: 150,
      },
      {
        title:
          'Краткое описание работ и методы кх производства. \nПеречень работ, выхолняемых субподрядными организациями',
        key: 'description',
        // width: 800,
      },
      {
        title: 'Условия производства работ',
        key: 'terms',
      },
      {
        title: 'ФИО, мастера и бридира (с указанием их подписей)',
        key: 'master_name',
      },
      {
        title: 'Объем выполненных и принятых у бригады работ',
        key: 'work',
      },
    ],
    name: 'general_master',
    title: 'Таблица 6',
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
        title: 'Замечания контролирующих органов или ссылка на предписание',
        key: 'note_agency',
        // width: 800,
      },
      {
        title: 'Отметки о принятии замечаний к исполнению и о проверке их исполнения',
        key: 'note_mark',
      },
    ],
    name: 'general_note',
    title: 'Таблица 7',
    hasDates: true,
  },
]
