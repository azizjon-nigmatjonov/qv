// 2.Журнал>ВЫПОЛНЕНИЯ МОНТАЖНЫХ СОЕДИНЕНИЙ НА БОЛТАХ С КОНТРОЛИРУЕМЫМНАТЯЖЕНИЕМ

import { Input } from '../../../../components'

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Номер чертежа КМД и наименование узла (стыка) в соединении',
        key: 'number_kmd',
        width: 233,
      },
      {
        title: 'Постановка болтов',
        key: 'bolt_setting',
        width: 655,
        columns: [
          {
            title: 'Число поставленных болтов в соединении',
            key: 'supplied_bolts',
            width: 182,
          },
          {
            title: 'Номер сертификата на болты',
            key: 'certificate_number',
            width: 125,
          },
          {
            title: 'Способ обработки контактных  поверхностей',
            key: 'contact_surfaces',
            width: 173,
          },
          {
            title: 'Расчетный момент закручивания или угол поворота гайки',
            key: 'estimated_torque',
            width: 173,
          },
        ],
      },
      {
        title: 'Результаты контроля',
        key: 'control_results',
        width: 1000,
        columns: [
          {
            title: 'Обработка контактных поверхностей',
            key: 'surface_contact',
            width: 147,
          },
          {
            title: 'Число проверенных болтов',
            key: 'checked_bolts',
            width: 176,
          },
          {
            title: 'Результаты проверки момента закручивания или угла поворота',
            key: 'angle_result',
            width: 182,
          },
          {
            title: 'Номер клейма, подпись бригадира',
            key: 'foreman_signature',
            width: 175,
          },
          {
            title: 'Подпись лица ответственного за постановку болтов',
            key: 'bolt_responsible_signature',
            width: 182,
          },
          {
            title: 'Подпись представителя заказчика',
            key: 'customer_signature',
            width: 155,
          },
        ],
      },
      {
        title: 'Примечание',
        key: 'note',
        width: 155,
      },
    ],
    hasDates: true,
    name: 'mounting_connection',
    title: 'ВЫПОЛНЕНИЯ МОНТАЖНЫХ СОЕДИНЕНИЙ НА БОЛТАХ С КОНТРОЛИРУЕМЫМНАТЯЖЕНИЕ',
  },
]
