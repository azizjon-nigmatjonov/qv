//Журнал входной контроль

export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Наименование и марка материалов и изделий',
        key: 'name_mark_material',
        width: 150,
      },
      {
        title: 'Дата поступления на склад или на объект',
        key: 'date',
        width: 240,
      },
      {
        title: '№ накладной или фактуры',
        key: 'invoice',
        width: 233,
      },
      {
        title: '№ паспорта или сертификата ',
        key: 'passport_or_certificate',
        width: 233,
      },
      {
        title: 'Наименование поставщика',
        key: 'deliver_name',
        width: 384,
      },
      {
        title: 'Един. измер.',
        key: 'unit_measurement',
        width: 384,
      },
      {
        title: 'Обьем поставок',
        key: 'delivery',
        width: 589,
        columns: [
          {
            title: 'К-во',
            key: 'count',
            width: 200,
          },
          {
            title: 'Сумма',
            key: 'delivery.sum',
          },
        ],
      },
      {
        title: 'Наименование дефектов обнаруженных при осмотре',
        key: 'defect_name',
        width: 384,
      },
      {
        title: 'Принято для производства работ',
        key: 'work',
        width: 589,
        columns: [
          {
            title: 'К-во',
            key: 'count_accepted_for_work',
            width: 200,
          },
          {
            title: 'Сумма',
            key: 'summ_accepted_for_work',
          },
        ],
      },
      {
        title: 'Принято на ответственное хранение',
        key: 'safekeeping',
        width: 589,
        columns: [
          {
            title: 'К-во',
            key: 'count_accepted_for_safekeeping',
            width: 200,
          },
          {
            title: 'Сумма',
            key: 'summ_accepted_for_safekeeping',
          },
        ],
      },
      {
        title: 'Подпись матер, отв. лица(производитель работ, мастер)',
        key: 'sign',
        width: 280,
      },
      {
        title: 'Примечание',
        key: 'reason',
        width: 384,
      },
    ],
    title: 'Журнал входной контроль',
    name: 'input_materials',
    hasDates: true,
  },
]
