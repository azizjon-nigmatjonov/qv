// 3.Журнал>машин и механизмов работающих на объекте

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Организация ',
        key: 'organization',
        width: 179,
      },
      {
        title: 'Наименование маш. мех',
        key: 'naming_mach_mech',
        width: 182,
      },
      {
        title: 'Марка',
        key: 'brand',
        width: 179,
      },
      {
        title: 'Место работ',
        key: 'working_place',
        width: 182,
      },
      {
        title: 'Факт. Отраб м/часы.',
        key: 'work_fact',
        width: 205,
      },
      {
        title: 'Факт. Отраб м/часы.',
        key: 'work_fact',
        width: 205,
      },
      {
        title: 'Ф.И.О Механизатор.',
        key: 'operator_fullname',
        width: 206,
      },
      {
        title: 'Ф.И.О Отв .лицо',
        key: 'responsible_fullname',
        width: 206,
      },
      {
        title: 'Подпись',
        key: 'sign',
        width: 206,
      },
    ],
    body: [
      {
        id: 1,
        organization: 'Абдуллаев Electric',
        naming_mach_mech: 'general director',
        brand: 'lorem ipsum',
        working_place: 'lorem ipsum',
        work_fact: 'Примечание',
        operator_fullname: 'lorem',
        responsible_fullname: 'lorem',
        sign: '',
      },
    ],
    name: 'fire-safety',
    title: 'Журнал>машин и механизмов работающих на объекте',
    hasDates: true,
  },
]
