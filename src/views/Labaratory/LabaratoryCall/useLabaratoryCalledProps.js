import { CalendarToday } from '@mui/icons-material'
import { format } from 'date-fns'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLabarantCall } from '../../../services/labaratory'
import { BOSH_PRORAB_ROLE_ID } from '../../../settings/constants'
import { addZero } from '../../../utils/addZero'
import dateFormatter from '../../../utils/dateFormatter'

export const useLabaratoryCalledProps = () => {
  const { userId, roleId } = useSelector((state) => state.auth)

  const [range, setRange] = useState([
    {
      key: 'selection',
    },
  ])

  const [date, setDate] = useState(new Date())
  const [canClear, setCanClear] = useState(false)

  const [objectData, setObjectData] = useState({ object_id: 0, id: 0 })

  const [activeTab, setActiveTab] = useState(0)
  const [offset, setOffset] = useState(1)

  const [limit, setLimit] = useState(10)
  const [isOpen, setIsOpen] = useState(false)

  const debouncedEventHandler = (e) => console.log(e)

  const handleCalendarModalOpen = () => setIsOpen(true)
  const handleCalendarModalClose = () => setIsOpen(false)

  const boxRef = useRef()

  const tabElements = [
    { key: 0, title: 'So’ngi chaqiruvlar' },
    { key: 1, title: 'Chaqiruvlar tarixi' },
  ]

  const isHistory = activeTab === 1

  const { getLabarantQuery, changeLabarantMutation } = useLabarantCall({
    getLabarantQueryProps: {},
    getLabarantQueryParams: {
      user_id: userId,
      limit,
      offset,
      is_archive: isHistory,
    },
    changeLabarantMutationProps: {
      onSuccess: () => {
        getLabarantQuery.refetch()
        handleCalendarModalClose()
      },
    },
  })

  const handleCheckDateSubmit = () =>
    changeLabarantMutation.mutate({
      date: `${date.getFullYear()}-${addZero(date.getMonth()) + 1}-${addZero(date.getDate())}`,
      // date: dateFormatter(format, date, 'yyyy-MM-dd'),
      id: objectData.id,
      object_id: objectData.object_id,
      role_id: roleId,
      user_id: userId,
    })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Shartnoma raqami',
      key: 'contract',
      innerKey: 'contract_num',
      render: (value) => <>{value?.contract_number}</>,
    },
    {
      title: 'Shartnoma sanasi',
      key: 'contract',
      innerKey: 'contract_date',
      render: (value) => <>{dateFormatter(format, value?.contract_date, 'dd.MM.yyyy')}</>,
    },
    {
      title: 'Obyekt nomi',
      key: 'object_name',
    },
    {
      title: 'Sinov turi',
      key: 'test_types',
      render: (values) => values?.map((value) => <span key={value?.id}>{value?.name}</span>),
    },
    {
      title: 'Obyekt manzili',
      key: 'object_address',
    },
    {
      title: 'Chaqiruv vaqti',
      key: 'called_time',
      render: (value) => <span>{dateFormatter(format, value, 'dd.MM.yyyy')}</span>,
    },
    {
      title: 'Buyurtmachi',
      key: 'customer',
      render: (value) => (
        <>
          <p>{value?.full_name}</p>
          <a href={`tel:${value?.phone}`}>{value?.phone}</a>
        </>
      ),
    },
    {
      title: 'Prorab',
      key: 'users',
      render: (value) => {
        const user = value?.find((user) => user?.role_id === BOSH_PRORAB_ROLE_ID) ?? {
          user_name: '---',
          user_surname: '',
          user_middlename: '',
        }

        return (
          <>
            <p>{user?.user_name + ' ' + user?.user_surname + ' ' + user?.user_middlename}</p>
            <a href={`tel:${user?.phone}`}>{user?.phone}</a>
          </>
        )
      },
    },
    {
      title: 'Tashrif kuni',
      key: ['confirmed_date', 'object_id', 'id'],
      render: (value) => {
        return isHistory ? (
          <>{value[0]}</>
        ) : (
          <div
            className="text-primary flex gap-x-2"
            onClick={() => {
              handleCalendarModalOpen()
              setObjectData({ object_id: value[1], id: value[2] })
            }}
          >
            <span>Kunni belgilash</span>
            <CalendarToday htmlColor="primary" />
          </div>
        )
      },
    },
  ]

  return {
    debouncedEventHandler,
    range,
    setRange,
    canClear,
    setCanClear,
    boxRef,
    activeTab,
    tabElements,
    setActiveTab,
    offset,
    limit,
    headData,
    objects: getLabarantQuery.data?.data?.data?.objects,
    setOffset,
    setLimit,
    isOpen,
    setIsOpen,
    handleCalendarModalClose,
    handleCalendarModalOpen,
    isLoading: getLabarantQuery.isLoading,
    handleCheckDateSubmit,
    date,
    setDate,
  }
}
