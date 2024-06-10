import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { BasicLayout, Header, Pagination, BtnFiled, FilterHeader, BtnOutlined, MuiTabs } from '../../../components'
import { BasicTableEditable } from '../../../components/Tables/BasicTableEditable'
import MonthPicker from '../../../components/MonthPicker'
import { AUTHOR_SUPERVISOR_ROLE_ID, BOSH_PRORAB_ROLE_ID, TEXNIK_NAZORATCHI_ROLE_ID } from '../../../settings/constants'
import { useCategory, useJournal } from '../../../services'
import { AddIcon, CancelIcon, CheckboxIcon, SaveIcon } from '../../../assets/icons'
import { permissions } from '../../../settings/permissions'
import dateFormatter from '../../../utils/dateFormatter'

export function AuthJournalList() {
  const { pathname } = useLocation()
  const { name, userId, roleId } = useSelector((state) => state.auth)
  const { id } = useParams()
  const navigate = useNavigate()

  const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })
  const [authors, setAuthors] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [constructions, setConstructions] = useState([])
  const [producerWorks, setProducerWorks] = useState([])
  const [disableBtn, setDisableBtn] = useState([false, false])
  const [disableAdd, setDisableAdd] = useState(false)

  const { createMutation, authorJournals, updateMutation } = useJournal({
    createMutationProps: {
      onSuccess: () => {
        navigate(-1)
        authorJournals.refetch()
        setDisableBtn([false, false])
        setDisableAdd(false)
      },
    },
    authorJournalParams: {
      object_id: id,
      authors_status_accept: activeTab === 1 ? 'true' : undefined,
    },
    updateMutationProps: {
      onSuccess: () => {
        navigate(-1)
        authorJournals.refetch()
      },
    },
  })

  const initialData = {
    date: '',
    violation: '',
    instruction: '',
    username: name,
    representative: {
      construction: '',
      customer: '',
    },
    instructions: {
      producer_work: '',
      producer_customer: '',
    },
  }

  const [bodyColumns, setBodyColums] = useState([])

  useEffect(() => {
    if (authorJournals.data?.items) {
      setBodyColums(
        authorJournals.data.items.map((item) => {
          const prorab = item?.participants?.find(
            (data) => data.status_understand_confirm === 'true' && data.user.role_id === BOSH_PRORAB_ROLE_ID
          )
          const customer = item?.participants?.find(
            (data) => data.status_understand_confirm === 'true' && data.user.role_id === TEXNIK_NAZORATCHI_ROLE_ID
          )
          const authorProrab = item?.participants?.find(
            (data) => data.authors_status_accept === 'true' && data.user.role_id === BOSH_PRORAB_ROLE_ID
          )
          const authorCustomer = item?.participants?.find(
            (data) => data.authors_status_accept === 'true' && data.user.role_id === TEXNIK_NAZORATCHI_ROLE_ID
          )
          return {
            ...initialData,
            id: item.journal_id,
            instruction: item.instruction,
            violation: item.violation,
            username: item.user.user_name + ' ' + item.user.user_surname,
            date: item.created_at,
            representative: {
              construction: prorab ? prorab?.user?.user_name + ' ' + prorab?.user?.user_surname : '',
              construction_updated_at: prorab?.updated_at,
              customer: customer ? customer?.user?.user_name + ' ' + customer?.user?.user_surname : '',
              customer_updated_at: customer?.updated_at,
            },
            instructions: {
              producer_work: authorProrab ? authorProrab.user.user_name + ' ' + authorProrab.user.user_surname : null,
              producer_work_updated_at: authorProrab?.updated_at,
              producer_customer: authorCustomer
                ? authorCustomer.user.user_name + ' ' + authorCustomer.user.user_surname
                : null,
              producer_customer_updated_at: authorCustomer?.updated_at,
            },
          }
        })
      )

      const arr = []
      const works = []
      const values = []
      authorJournals.data.items.forEach((item) => {
        const value = item.participants.find(
          (data) =>
            data.status_done === 'false' &&
            data.status_understand_confirm === 'false' &&
            data.authors_status_accept === 'false' &&
            data.user.role_id === roleId &&
            data.user.user_id === userId
        )

        const producer = item.participants.find(
          (data) =>
            data.status_done === 'false' &&
            data.status_understand_confirm === 'true' &&
            data.authors_status_accept === 'false' &&
            data.user.role_id === roleId &&
            data.user.user_id === userId
        )
        const author = item.participants.find((data) => item.user.role_id === roleId && item.user.user_id === userId)
        if (author) {
          values.push(item)
        }
        if (producer) {
          works.push(item.journal_id)
        }
        if (value) {
          arr.push(item.journal_id)
        }
      })
      setAuthors(values)
      setConstructions(arr)
      setProducerWorks(works)
    } else {
      setBodyColums([])
    }
  }, [authorJournals.data])

  const onChange = (e, index, inputIndex) => {
    const rows = [...bodyColumns]
    rows[index][e.target.name] = e.target.value

    setBodyColums(rows)
    if (e.target.value) {
      setDisableBtn((prev) => {
        prev[inputIndex] = true
        return prev
      })
    } else {
      setDisableBtn((prev) => {
        prev[inputIndex] = false
        return prev
      })
    }
  }

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Дата',
      key: 'date',
      width: 100,
      render: (date) => {
        return date && dateFormatter(format, new Date(date), 'dd.MM.yyyy')
      },
    },
    {
      title:
        'Выявления отступления от проектно-сметной документации, нарушение требований строительных норм, правил и технических условий по производству строительно-монтажных работ',
      key: ['violation', 'id'],
      width: 340,
      render: (value, index) => (
        <textarea
          onKeyDown={(e) => {
            e.target.style.height = 'inherit'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          rows={value[0] ? Math.floor(value[0].length / 58) : 2}
          name="violation"
          className="table-input resize-none overflow-hidden"
          value={value[0]}
          disabled={value[1]}
          onChange={(e) => onChange(e, index, 0)}
        />
      ),
    },
    {
      title: 'Указания об устранении выявленных оступлений или нарушений и сроки их исполнения',
      key: ['instruction', 'id'],
      width: 233,
      render: (value, index) => (
        <textarea
          onKeyDown={(e) => {
            e.target.style.height = 'inherit'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          rows={value[0] ? Math.floor(value[0].length / 40) : 2}
          name="instruction"
          className="table-input resize-none overflow-hidden"
          value={value[0]}
          disabled={value[1]}
          onChange={(e) => onChange(e, index, 1)}
        />
      ),
    },
    {
      title: 'Запись произвел (фамилия, инициалы)',
      key: 'username',
      width: 233,
    },
    {
      title: 'С записью ознакомлен представитель (фамилия, инициалы, должность, дата)',
      key: 'representative',
      width: 384,
      columns: [
        {
          title: 'Строительно-монтажной организации',
          key: ['representative', 'id'],
          render: (value) => {
            return value[1] && roleId === BOSH_PRORAB_ROLE_ID && constructions.includes(value[1]) ? (
              <BtnFiled
                onClick={() => {
                  updateMutation.mutate({
                    authors_status_accept: '',
                    status_done: '',
                    status_understand_confirm: 'true',
                    user_id: userId,
                    id: value[1],
                  })
                }}
                size="medium"
                color="blue"
                leftIcon={<CheckboxIcon />}
                className="m-auto"
              >
                Tanishdim
              </BtnFiled>
            ) : (
              <div>
                <p>{value[0].construction}</p>
                <p>
                  {value[0].construction_updated_at
                    ? dateFormatter(format, new Date(value[0].construction_updated_at), 'dd.MM.yyyy')
                    : ''}
                </p>
              </div>
            )
          },
        },
        {
          title: 'Заказчика',
          key: ['representative', 'id', 'customer'],
          render: (value) => {
            return value[1] && roleId === TEXNIK_NAZORATCHI_ROLE_ID && constructions.includes(value[1]) ? (
              <BtnFiled
                onClick={() => {
                  updateMutation.mutate({
                    authors_status_accept: '',
                    status_done: '',
                    status_understand_confirm: 'true',
                    user_id: userId,
                    id: value[1],
                  })
                }}
                size="medium"
                color="blue"
                leftIcon={<CheckboxIcon />}
                className="m-auto"
              >
                Tanishdim
              </BtnFiled>
            ) : (
              <div>
                <p>{value[0].customer}</p>
                <p>
                  {value[0].customer_updated_at
                    ? dateFormatter(format, new Date(value[0].customer_updated_at), 'dd.MM.yyyy')
                    : ''}
                </p>
              </div>
            )
          },
        },
      ],
    },
    {
      title: 'Отметка о выполнении указаний (фамилия, инициалы, должность, дата)',
      key: 'instructions',
      width: 589,
      columns: [
        {
          title: 'Производителя работ',
          key: ['instructions', 'id'],
          render: (value) => {
            if (value[1] && !value[0].producer_work) {
              if (producerWorks.includes(value[1]) && roleId === BOSH_PRORAB_ROLE_ID) {
                return (
                  <BtnFiled
                    onClick={() => {
                      updateMutation.mutate({
                        authors_status_accept: '',
                        status_done: 'true',
                        status_understand_confirm: '',
                        user_id: userId,
                        id: value[1],
                      })
                    }}
                    size="medium"
                    color="blue"
                    leftIcon={<CheckboxIcon />}
                    className="m-auto"
                  >
                    Bajarildi
                  </BtnFiled>
                )
              }
              if (authors.map((item) => item.journal_id).includes(value[1])) {
                const user = authors
                  .find((item) => item.journal_id === value[1])
                  .participants.find((value) => value.user.role_id === '5e4fe86a-adc5-4535-b586-264061cafcb5')

                return (
                  roleId === AUTHOR_SUPERVISOR_ROLE_ID &&
                  user.authors_status_accept === 'false' &&
                  user.status_done === 'true' &&
                  user.status_understand_confirm === 'true' && (
                    <>
                      <div className="text-sm font-medium mb-2 text-left">
                        {user.user.user_name + ' ' + user.user.user_surname}
                      </div>
                      <div className="flex items-center gap-2">
                        <BtnOutlined
                          onClick={() => {
                            updateMutation.mutate({
                              authors_status_accept: '',
                              status_done: 'false',
                              status_understand_confirm: '',
                              user_id: user.user.user_id,
                              id: value[1],
                            })
                          }}
                          size="medium"
                          color="red"
                          leftIcon={<CancelIcon />}
                        >
                          Bekor qilish
                        </BtnOutlined>
                        <BtnFiled
                          onClick={() => {
                            updateMutation.mutate({
                              authors_status_accept: 'true',
                              status_done: '',
                              status_understand_confirm: '',
                              user_id: user.user.user_id,
                              id: value[1],
                            })
                          }}
                          size="medium"
                          color="blue"
                          leftIcon={<CheckboxIcon />}
                        >
                          Tasdiqlash
                        </BtnFiled>
                      </div>
                    </>
                  )
                )
              }
            } else {
              return (
                <div>
                  <p>{value[0].producer_work}</p>
                  <p>
                    {value[0].producer_work_updated_at
                      ? dateFormatter(format, new Date(value[0].producer_work_updated_at), 'dd.MM.yyyy')
                      : ''}
                  </p>
                </div>
              )
            }
          },
        },
        {
          title: 'Представителя заказчика',
          key: ['instructions', 'id'],
          render: (value) => {
            if (value[1] && !value[0].producer_customer) {
              if (producerWorks.includes(value[1]) && roleId === TEXNIK_NAZORATCHI_ROLE_ID) {
                return (
                  <BtnFiled
                    onClick={() => {
                      updateMutation.mutate({
                        authors_status_accept: '',
                        status_done: 'true',
                        status_understand_confirm: '',
                        user_id: userId,
                        id: value[1],
                      })
                    }}
                    size="medium"
                    color="blue"
                    leftIcon={<CheckboxIcon />}
                    className="m-auto"
                  >
                    Bajarildi
                  </BtnFiled>
                )
              }
              if (authors.map((item) => item.journal_id).includes(value[1])) {
                const user = authors
                  .find((item) => item.journal_id === value[1])
                  .participants.find((value) => value.user.role_id === '6126cbeb-b0b8-4059-9758-14ff3c35473f')

                return (
                  roleId === AUTHOR_SUPERVISOR_ROLE_ID &&
                  user.authors_status_accept === 'false' &&
                  user.status_done === 'true' &&
                  user.status_understand_confirm === 'true' && (
                    <>
                      <div className="text-sm font-medium mb-2 text-left">
                        {user.user.user_name + ' ' + user.user.user_surname}
                      </div>
                      <div className="flex items-center gap-2">
                        <BtnOutlined
                          onClick={() => {
                            updateMutation.mutate({
                              authors_status_accept: '',
                              status_done: 'false',
                              status_understand_confirm: '',
                              user_id: user.user.user_id,
                              id: value[1],
                            })
                          }}
                          size="medium"
                          color="red"
                          leftIcon={<CancelIcon />}
                        >
                          Bekor qilish
                        </BtnOutlined>
                        <BtnFiled
                          onClick={() => {
                            updateMutation.mutate({
                              authors_status_accept: 'true',
                              status_done: '',
                              status_understand_confirm: '',
                              user_id: user.user.user_id,
                              id: value[1],
                            })
                          }}
                          size="medium"
                          color="blue"
                          leftIcon={<CheckboxIcon />}
                        >
                          Tasdiqlash
                        </BtnFiled>
                      </div>
                    </>
                  )
                )
              }
            } else {
              return (
                <div>
                  <p>{value[0].producer_customer}</p>
                  <p>
                    {value[0].producer_customer_updated_at
                      ? dateFormatter(format, new Date(value[0].producer_customer_updated_at), 'dd.MM.yyyy')
                      : ''}
                  </p>
                </div>
              )
            }
          },
        },
      ],
    },
  ]

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  const { categories } = useCategory({
    logsQueryProps: {
      enabled: true,
    },
    getLogParams: {
      offset,
      limit,
    },
  })

  const onSumbit = () =>
    createMutation.mutate({
      object_id: id,
      user_id: userId,
      journals: bodyColumns
        .filter((item) => !item.id)
        .map((item) => ({
          instruction: item.instruction,
          violation: item.violation,
        })),
    })

  const tabElements = [
    {
      key: 0,
      title: 'Yangi',
    },
    {
      key: 1,
      title: 'Tarix',
    },
  ]

  return !pathname.includes('m/objects') ? (
    <div className="h-screen">
      <Header
        title="Mualliflik nazorati jurnali"
        backLink={-1}
        rightElement={
          permissions[roleId]?.includes('AUTHOR-JOURNAL/CREATE') && (
            <div className="flex items-center gap-[12px]">
              <BtnOutlined leftIcon={<CancelIcon />} color="red" onClick={() => navigate(-1)}>
                Bekor qilish
              </BtnOutlined>
              <BtnFiled
                disabled={!(disableBtn.filter((i) => i).length > 1 && !createMutation.isLoading)}
                color="blue"
                isLoading={createMutation.isLoading}
                leftIcon={<SaveIcon />}
                onClick={onSumbit}
              >
                Saqlash
              </BtnFiled>
            </div>
          )
        }
      />

      <FilterHeader leftElements={[<MonthPicker date={date} setDate={setDate} />]} />
      <div className="sidebar-header-filter-calc">
        <BasicLayout
          title={!pathname.includes('journals') && 'Ijro hujjatlari'}
          header={
            <MuiTabs
              activeTab={activeTab}
              getParamsFromLocation={false}
              elements={tabElements}
              setActiveTab={setActiveTab}
            />
          }
          rightElement={
            permissions[roleId]?.includes('AUTHOR-JOURNAL/CREATE') && (
              <BtnFiled
                className="justify-self-end"
                disabled={disableAdd}
                color="blue"
                leftIcon={<AddIcon />}
                onClick={() => {
                  setBodyColums((prev) => [initialData, ...prev])
                  setDisableAdd(true)
                }}
              >
                Qo'shish
              </BtnFiled>
            )
          }
          footer={
            <Pagination
              count={authorJournals.data?.count}
              pageCount={limit}
              onChange={(pageNumber) => setOffset(pageNumber)}
              currentPage={offset}
              onChangeLimit={(limitNumber) => {
                setLimit(limitNumber)
              }}
              limit={limit}
            />
          }
        >
          <BasicTableEditable headColumns={headData} bodyColumns={bodyColumns} isLoading={categories.isLoading} />
        </BasicLayout>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-md p-4">
      <BasicTableEditable headColumns={headData} bodyColumns={bodyColumns} isLoading={categories.isLoading} />
    </div>
  )
}
