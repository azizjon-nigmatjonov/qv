// 8.Журнал> ИЗГОТОВЛЕНИЯ БУРОНАБИВНЫХ СВАЙ


export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: '№ п/п свай по плану',
        key: 'svay_plan',
        width: 82,
      },
      {
        title: 'Дата, смена',
        key: 'date_change',
        width: 127,
      },
      {
        title: 'Диаметр скважины, м',
        key: 'diameters_wells',
        width: 127,
      },
      {
        title: 'Абсолютная отметка поверхности грунта',
        key: 'absolute_mark',
        width: 127,
      },
      {
        title: 'Бурение ствола',
        key: 'borehole_drilling',
        width: 536,
        columns: [
          {
            title: 'Глубина м',
            key: 'depth',
            width: 184,
          },
          {
            title: 'Абсолютная отметка забоя ',
            key: 'bottomhole_mark',
            width: 352,
            columns: [
              {
                title: 'по проекту',
                key: 'project',
                width: 176,
              },
              {
                title: 'фактическая',
                key: 'actual',
                width: 176,
              },
            ],
          },
        ],
      },
      {
        title: 'Длина арматурного каркаса, м',
        key: 'cage_length',
        width: 192,
      },
      {
        title: 'Бетонирование способом ВПТ',
        key: 'vpt_concreting',
        width: 352,
        columns: [
          {
            title: 'Объем уложенного бетона, м3',
            key: 'volume_concrete',
            width: 176,
          },
          {
            title: 'Минимальное заглубление низа бетонолитной трубы в бетон, м',
            key: 'minimum_penetration',
            width: 176,
          },
        ],
      },
      {
        title: 'Абсолютная отметка головы сваи',
        key: 'elevation_pile_head',
        width: 192,
      },
      {
        title: 'Абсолютная отметка после отбивки оголовок сваи',
        key: 'mark_after_breaking',
        width: 192,
      },
      {
        title: 'Исполнители (подписи)(прораб, буровой мастер)',
        key: 'performs',
        width: 192,
      },
      {
        title: 'Примечание',
        key: 'node',
        width: 192,
      },
    ],
    hasDates: true,
    name: 'leveling_journal',
    title: 'Нивелировочный',
  },
]
