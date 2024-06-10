//4.Журнал>регистрации вводного инструктажа по пожарной безопасности

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
        title: 'дата проведения инструктажа',
        key: 'date',
        width: 150,
        render: () => (
          <CustomMuiDatePicker
            withoutBorder={true}
            control={control}
            defaultValue={new Date()}
            disabled
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            name="happened_time"
            className="table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'Ф.И.О. сотрудника, прошедшего инструктаж',
        key: 'name_instructed_user',
        width: 340,
        render: () => (
          <Input
            withBorder={false}
            register={register}
            name="name_instructed_user"
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
        title: 'профессия должность инструктируемого',
        key: 'role_instructed_user',
        width: 233,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name="role_instructed_user"
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
        title: 'наименование производственного подразделения, в которое направляется инструктируемый ',
        key: 'name_subdivision',
        width: 233,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name="name_subdivision"
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
        title: 'Ф.И.О инструктирующего',
        key: 'name_executor',
        width: 384,
        render: (index, parentName) => (
          <Input
            withBorder={false}
            register={register}
            name="name_executor"
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
        title: 'подпись',
        key: 'sign',
        width: 300,
        align: 'center',
        columns: [
          {
            title: 'инструктирующего',
            key: 'sign_executor',
            width: 150,
          },
          {
            title: 'инструктируемого',
            key: 'sign_insructed_user',
            width: 150,
          },
        ],
      },
    ],
    name: 'fire_safety_journal',
    title: 'Журнал регистрации инструктажа по охране труда',
    hasDates: true,
  },
]
