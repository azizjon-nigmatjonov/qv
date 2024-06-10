import { Add } from '@mui/icons-material'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

import { BasicLayout, BasicTable, BtnFiled, FilterHeader, Header, Input, MuiTabs, Pagination } from '../../components'
import Switch from '../../components/Switch'
import { useQuestion } from '../../services'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { questionRoleNames } from '../../settings/constants'
import { useQuery } from '../../hooks/useQuery'

function Settings() {
  const navigate = useNavigate()

  const query = useQuery()

  const [activeTab, setActiveTab] = useState(+query.get('tab') || 0)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)

  const { questions, updateQuestionMutation, deleteQuestionMutation, questionRoles, updateQuestionRoleStatusMutation } =
    useQuestion({
      questionRolesProps: { enabled: activeTab === 2 },
      updateQuestionRoleStatusProps: { onSuccess: () => {} },
      updataQuestionProps: {
        onSuccess: () => {
          questions.refetch()
        },
      },
      deleteQuestionProps: {
        onSuccess: () => {
          questions.refetch()
          toast.success("Savol muvaffaqqiyatli o'chirildi")
        },
      },
      offset,
      limit,
      final_question: activeTab === 1 ? true : false,
      questionsQueryProps: { enabled: !!activeTab || !!offset },
    })

  const rolesHeadData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Lavozim',
      key: 'role_id',
      render: (val) => <>{questionRoleNames[val]}</>,
    },
    {
      title: '',
      key: ['role_id', 'status'],
      render: (val) => (
        <Switch
          disabled={false}
          defaultChecked={!val[1]}
          onChange={(e) => {
            updateQuestionRoleStatusMutation.mutate({ role_id: val[0], status: !e })
          }}
        />
      ),
    },
  ]

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Savollar',
      key: 'question',
    },
    {
      title: 'Lavozim',
      key: 'role',
      render: (val) => <>{val?.name}</>,
    },
    {
      title: '',
      key: ['id', 'status'],
      render: (val) => (
        <Switch
          defaultChecked={val[1]}
          onChange={(e) => {
            updateQuestionMutation.mutate({ id: val[0], status: e })
          }}
        />
      ),
    },
  ]

  const tabElements = [
    { key: 0, title: 'Standart' },
    { key: 1, title: 'Qabul qilish' },
    { key: 2, title: 'Rollar' },
  ]

  return (
    <div className="h-screen">
      <Header
        title="Chek-list"
        rightElement={
          activeTab !== 2 && (
            <BtnFiled leftIcon={<Add />} onClick={() => navigate(`${activeTab}/add`)}>
              Qo'shish
            </BtnFiled>
          )
        }
      />
      <FilterHeader
        leftElements={[
          <Input
            key={'search'}
            onChange={() => {}}
            className="pl-[8px] pr-[8px]"
            height={36}
            addonBefore={<SearchIcon fontSize="medium" className="text-primary" />}
            placeholder={'Qidirish...'}
          />,
        ]}
      />
      <div className="sidebar-header-filter-calc">
        <BasicLayout
          header={
            <MuiTabs
              activeTab={activeTab}
              elements={tabElements}
              setActiveTab={setActiveTab}
              offset={offset}
              setOffset={setOffset}
              // getParamsFromLocation={false}
            />
          }
          footer={
            <Pagination
              count={questions.data?.count}
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
          <BasicTable
            offset={offset}
            limit={limit}
            headColumns={activeTab === 2 ? rolesHeadData : headData}
            bodyColumns={activeTab === 2 ? questionRoles.data?.role_status : questions.data?.questions}
            rowLink={activeTab === 1 ? 'accept' : ''}
            hasActions={activeTab !== 2}
            isLoading={activeTab === 2 ? questionRoles.isLoading : questions.isLoading}
            deleteFunc={(id) => deleteQuestionMutation.mutate({ id })}
          />
        </BasicLayout>
      </div>
    </div>
  )
}

export default Settings
