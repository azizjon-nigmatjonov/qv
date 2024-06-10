// 6.Журнал> грузоперевозки материалов на объекте


export const tables = () => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'А/база',
        key: 'base',
        width: 127,
      },
      {
        title: 'Номера/машин',
        key: 'number_machine',
        width: 184,
      },
      {
        title: 'Груза подъём',
        key: 'load_lifting',
        width: 168,
      },
      {
        title: 'Раст-я КМ',
        key: 'grow_km',
        width: 154,
      },
      {
        title: 'Количество Ходок',
        key: 'walker_quantity',
        width: 176,
      },
      {
        title: 'Пункт погрузка',
        key: 'item_loading',
        width: 192,
      },
      {
        title: 'Пункт отгрузка',
        key: 'item_shipping',
        width: 192,
      },
      {
        title: 'ЖБИ',
        key: 'jbi',
        width: 391,
        columns: [
          {
            title: 'ЛК-6 шт',
            key: 'lk_six',
            width: 93,
          },
          {
            title: 'ЛК-3 шт',
            key: 'lk_three',
            width: 88,
          },
          {
            title: '1от 300 шт',
            key: 'lk_three_hundred',
            width: 107,
          },
          {
            title: '1от 100 шт',
            key: 'lk_one_hundred',
            width: 103,
          },
        ],
      },
      {
        title: '1РП 300 шт',
        key: 'rp_three_hundred',
        width: 134,
      },
      {
        title: '1РП 300 шт',
        key: 'rp_three_hundred',
        width: 134,
      },
      {
        title: 'БДО-5 шт',
        key: 'bdo_five',
        width: 134,
      },
      {
        title: 'БДО-3 шт',
        key: 'bdo_three',
        width: 134,
      },
    ],
    hasDates: true,
    name: 'mounting_connection',
    title: 'ВЫПОЛНЕНИЯ МОНТАЖНЫХ СОЕДИНЕНИЙ НА БОЛТАХ С КОНТРОЛИРУЕМЫМНАТЯЖЕНИЕ',
  },
]
