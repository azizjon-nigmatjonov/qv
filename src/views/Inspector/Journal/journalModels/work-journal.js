// 37.Журнал> Общий журнал работ

import { Input } from '../../../../components'

export const tables = ({ control, register, onChange }) => [
  {
    head: [
      {
        title: '№',
        key: 'tartib_raqami',
      },
      {
        title: 'Фамилия, Имя, Отчество, занимаемая должность, участок работ',
        key: 'user_info',
        width: 320,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            name={`${parentName}.journalBody[${index}].user_info`}
            className="border-none table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Дата начала работ на строительстве объекта',
        key: 'date_start',
        width: 320,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].started_work`}
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
        title: 'Отметка о получении разрешения на право производства работ или о прохождении аттестации',
        key: 'attestation_mark',
        width: 319,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].attestation_mark`}
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
        title: 'Дата окончания работ на строительстве объекта',
        key: 'date_end',
        width: 319,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].ended_work`}
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
        user_info: 'Абдуллаев Абдулла Абдуллаевич',
        started_work: 'VF 1234567',
        attestation_mark: '12:00',
        ended_work: '12:00',
        note: 'Примечание',
      },
    ],
    name: 'table1',
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
        title: 'Наименования актов (с указанием места)',
        key: 'naming_acts',
        width: 639,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            name={`${parentName}.journalBody[${index}].naming_acts`}
            className="border-none table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Дата подписания акта, фамилии, инициалы идолжности подписавших',
        key: 'signature_date',
        width: 639,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].signature_date`}
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
        id: 2,
        naming_acts: 'director',
        signature_date: 'director',
      },
    ],
    name: 'table2',
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
        title: 'Наименования конструктивных частей и элементов, место их расположения со ссылкой на номер чертежей',
        key: 'constructions_naming',
        width: 426,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            name={`${parentName}.journalBody[${index}].constructions_naming`}
            className="border-none table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Резултаты оценка качества',
        key: 'quality_result',
        width: 426,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].quality_result`}
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
        title: 'Должности и подписи лиц, оценивающих качества работ в порядке контроля и надзора',
        key: 'quality_checkers',
        width: 426,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].quality_checkers`}
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
        id: 2,
        constructions_naming: 'lorem ipsum',
        quality_result: 'lorem ipsum',
        quality_checkers: 'lorem ipsum',
      },
    ],
    name: 'table3',
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
        title: 'Наименования специалного журнала и дата его выдачи',
        key: 'journal_naming',
        width: 426,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            name={`${parentName}.journalBody[${index}].journal_naming`}
            className="border-none table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Организация, ведущая журнал, фамилия, инициалы и должность отвественного лица',
        key: 'quality_result',
        width: 426,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].quality_result`}
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
        title: 'Должности и подписи лиц, оценивающих качества работ в порядке контроля и надзора',
        key: 'quality_checkers',
        width: 426,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name={`${parentName}.journalBody[${index}].quality_checkers`}
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
        id: 2,
        journal_naming: 'lorem ipsum',
        quality_result: 'lorem ipsum',
        quality_checkers: 'lorem ipsum',
      },
    ],
    name: 'table4',
    title: 'Таблица 4',
    hasDates: true,
  },
  {
    head: [
      [
        {
          title: 'Дата и смена',
          key: 'date_change',
        },
        {
          title:
            'Краткое описание и условия производства работ (со сслылкой, при необходимости, на работы, выполняемые субподрядными организациями), должность, фамилия, инициалы подпись ответственного лица',
          key: 'short_description',
          width: 1218,
          render: (index, parentName) => (
            <Input
              withBorder={false}
              register={register}
              widthFull
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              name={`${parentName}.journalBody[${index}].short_description`}
              className="border-none table-input resize-none overflow-hidden"
            />
          ),
        },
      ],
      [
        {
          title: 'Дата и смена',
          key: 'date_change',
        },
        {
          title:
            'Краткое описание работ и методы их производства. Перечень работ, выполняемых субподрядными организациями',
          key: 'brief_description',
          width: 568,
          render: (index, parentName) => (
            <Input
              withBorder={false}
              register={register}
              widthFull
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              name={`${parentName}.journalBody[${index}].brief_description`}
              className="border-none table-input resize-none overflow-hidden"
            />
          ),
        },
        {
          title: 'Условия производства работ',
          key: 'work_conditions',
          width: 200,
          render: (index, parentName) => (
            <Input
              withBorder={false}
              register={register}
              widthFull
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              name={`${parentName}.journalBody[${index}].work_conditions`}
              className="border-none table-input resize-none overflow-hidden"
            />
          ),
        },
        {
          title: 'Ф.И.О мастера и бригадира (С указанием профессии)',
          key: 'master_fullname',
          width: 200,
          render: (index, parentName) => (
            <Input
              withBorder={false}
              register={register}
              widthFull
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              name={`${parentName}.journalBody[${index}].master_fullname`}
              className="border-none table-input resize-none overflow-hidden"
            />
          ),
        },
        {
          title: 'Объем выполняемых и принятых у бригад (звеньев) работ',
          key: 'volume_performed',
          width: 250,
          render: (index, parentName) => (
            <Input
              withBorder={false}
              register={register}
              widthFull
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              name={`${parentName}.journalBody[${index}].volume_performed`}
              className="border-none table-input resize-none overflow-hidden"
            />
          ),
        },
      ],
      [
        {
          title: 'Дата',
          key: 'date',
        },
        {
          title: 'Замечания контролирующих органов или ссылка на предписание',
          key: 'remarks',
          width: 609,
          render: (index, parentName) => (
            <Input
              withBorder={false}
              register={register}
              widthFull
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              name={`${parentName}.journalBody[${index}].remarks`}
              className="border-none table-input resize-none overflow-hidden"
            />
          ),
        },
        {
          title: 'Отметки о принятии замечаний к исполнению и о проверке их выполнения',
          key: 'acceptence_mark',
          width: 609,
          render: (index, parentName) => (
            <Input
              withBorder={false}
              register={register}
              widthFull
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              name={`${parentName}.journalBody[${index}].acceptence_mark`}
              className="border-none table-input resize-none overflow-hidden"
            />
          ),
        },
      ],
    ],
    body: [
      {
        id: 5,
        date_change: 'lorem ipsum',
        short_description: 'lorem ipsum',
      },
    ],
    tabElements: [
      { key: 0, title: '1' },
      { key: 1, title: '2' },
      { key: 2, title: '3' },
    ],
    name: 'table5',
    title: 'Таблица 5',
    hasDates: true,
  },
]
