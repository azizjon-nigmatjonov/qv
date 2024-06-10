import { Input } from '../../../../components'

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'order',
      },
      {
        title: 'Фамилия, имя отчество',
        key: 'fullName',
        width: 150,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            name={`${parentName}.journalBody[${index}].fullName`}
            className="border-none table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Поспортные данные',
        key: 'passportInfo',
        width: 340,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].passportInfo`}
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
        title: 'Время прибытия',
        key: 'arrivalTime',
        width: 233,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].arrivalTime`}
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
        title: 'Время убытия ',
        key: 'departureTime',
        width: 233,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].departureTime`}
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
        title: 'Примечание',
        key: 'note',
        width: 384,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].note`}
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
        fullName: 'Абдуллаев Абдулла Абдуллаевич',
        passportInfo: 'VF 1234567',
        arrivalTime: '12:00',
        departureTime: '12:00',
        note: 'Примечание',
      },
    ],
    name: 'table1',
    title: 'Таблица 1',
  },
  {
    head: [
      {
        title: '№',
        key: 'order',
      },
      {
        title: 'должность',
        key: 'position',
        width: 150,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            name={`${parentName}.journalBody[${index}].position`}
            className="border-none table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'фамилия И.О специалист',
        key: 'fullName',
        width: 340,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].fullName`}
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
        title: 'вид работы технического надзора',
        key: 'workType',
        width: 233,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].workType`}
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
        title: 'дата начала ',
        key: 'startDate',
        width: 233,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].startDate`}
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
        title: 'окончания',
        key: 'endDate',
        width: 384,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].endDate`}
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
        title: 'этапов работы',
        key: 'workStage',
        width: 384,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].workStage`}
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
        position: 'director',
        fullName: 'director',
        workType: 'director',
        startDate: 'director',
        endDate: 'director',
        workStage: 'director',
      },
    ],
    name: 'table2',
    title: 'Таблица 2',
  },
]
