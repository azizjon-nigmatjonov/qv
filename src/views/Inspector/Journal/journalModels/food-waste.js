//9.Журнал> учета пищевых отходов

import { Input } from '../../../../components'
import CustomMuiDatePicker from '../../../../components/CustomMuiDatePicker'

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Дата образования',
        key: 'date',
        width: 127,
        render: (index, parentName) => (
          <CustomMuiDatePicker
            withoutBorder={true}
            control={control}
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            name={`${parentName}.journalBody[${index}].date`}
            className="table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Наименование',
        key: 'name',
        width: 183,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].name`}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            className="border-none text-sm table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Класс опасности',
        key: 'class_danger',
        width: 183,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].class_danger`}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            className="border-none text-sm table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Объем образования, Куб/М',
        key: 'volume_education',
        width: 169,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].volume_education`}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            className="border-none text-sm table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Режим термообработки',
        key: 'treatment_mode',
        width: 245,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].treatment_mode`}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            className="border-none text-sm table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Дата вывоза',
        key: 'pickup_date',
        width: 187,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].pickup_date`}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            className="border-none text-sm table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Пункт назначения',
        key: 'destination',
        width: 187,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].destination`}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            className="border-none text-sm table-input resize-none overflow-hidden"
          />
        ),
      },
    ],
    body: [
      {
        id: 1,
        order: 'lorem',
        date: 'lorem',
        name: 'lorem',
        class_danger: 'lorem',
        volume_education: 'lorem',
        treatment_mode: 'lorem',
        pickup_date: 'lorem',
        destination: 'lorem',
      },
    ],
    name: 'foodWaste',
    title: 'Журнал учета пищевых отходов',
    hasDates: true,
  },
]
