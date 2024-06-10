//40.Журнал> Сварочных работ

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата выполненных работ смена',
        key: 'created_at',
        width: 150,
      },
      {
        title: 'Наименования соединяемых елементов марка стали',
        key: 'name_steel_grade',
        width: 340,
      },
      {
        title: 'Место или номер (по чертежу или схеме)',
        key: 'location_number_element',
        width: 233,
      },
      {
        title: 'Отметка о сдаче и приёмкеузла под сварку (должность, фамилия, инициалы, подпись) ',
        key: 'delivery_mark',
        width: 450,
        columns: [
          {
            title: 'должность',
            key: 'role',
            width: 100,
          },
          {
            title: 'имя',
            key: 'name',
            width: 100,
          },
          {
            title: 'инициалы',
            key: 'sign',
            width: 100,
          },
          {
            title: 'дата',
            key: 'date',
            width: 100,
          },
        ],
      },
      {
        title: 'Марка применяемиых сварочных материалов (проволока, флюс, электроды)',
        key: 'materials_mark',
        width: 384,
      },
      {
        title: 'Аимосферные условия (температура воздуха, осадки, скорость ветра)',
        key: 'wheather_condition',
        width: 384,
      },
      {
        title: 'Фамилия, инициалы сварщика, номер удостоверения',
        key: 'welding',
        width: 400,
        columns: [
          {
            title: 'имя',
            key: 'name',
          },
          {
            title: 'Номер',
            key: 'number',
          },
        ],
      },
      {
        title: 'Клеймо',
        key: 'claemo',
        width: 384,
      },
      {
        title: 'Подписи сварщиков, сваривших соединения',
        key: 'welding_sign',
        width: 384,
      },
      {
        title: 'Фамилия, инициалы отвесттвенного за производство работ (мастера, производителя работ)',
        key: 'master_name',
        width: 384,
      },
      {
        title: 'Отметка о приёмке сварного соединения',
        key: 'welding_mark',
        width: 384,
      },
      {
        title: 'Подпись руководителя сварочных работ',
        key: 'master_sign',
        width: 384,
      },
      {
        title: 'Замечания по контрольной проверке',
        key: 'order',
        width: 384,
      },
    ],
    name: 'welding_journal',
    title: 'Asosiy',
    hasDates: true,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'ФИО',
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
        title: 'Дата начало работы на объекте ',
        key: 'start_date',
        width: 233,
      },
      {
        title: 'Отметка о прохождении аттестации и дата',
        key: 'certificate_date_number',
        width: 384,
      },
      {
        title: 'Дата окончания работы на объекте',
        key: 'end_date',
        width: 384,
      },
    ],
    name: 'welding_technical_user',
    title: 'Injinerlar roʻyxati',
    hasDates: true,
  },
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'ФИО',
        key: 'name',
        width: 150,
      },
      {
        title: 'Разряд квалификационный',
        key: 'catigony_qualification',
        width: 340,
      },
      {
        title: 'Номер личного клейка',
        key: 'adhesive_number',
        width: 233,
      },
      {
        title: 'Удостоверение на право производства сварочных работ ',
        key: 'certificate_welding',
        width: 565,
        columns: [
          {
            title: 'Номер',
            key: 'right_number',
          },
          {
            title: 'Срок действия',
            key: 'right_expired_date',
          },
          {
            title: 'Допушен к сварке (швов в пространственном положении',
            key: 'adhesive_number',
          },
        ],
      },
      {
        title: 'Отметка о сварке пробных и контрольных образцов',
        key: 'control_samples',
        width: 384,
      },
    ],
    name: 'welding_worker',
    title: 'Сварочных работ',
    hasDates: true,
  },
]
