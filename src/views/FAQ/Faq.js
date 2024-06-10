import { useState } from 'react'
import { BasicLayout, BasicTable, BtnFiled, Header, Pagination } from '../../components'
import Switch from '../../components/Switch'
import useFaq from '../../services/useFaq'

import { Add } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { permissions } from '../../settings/permissions'
import { useSelector } from 'react-redux'

import toast from 'react-hot-toast'
import FilterPopup from '../../components/FilterPopup'
import { SUPER_ADMIN_ROLE_ID } from '../../settings/constants'
import CustomizedAccordion from '../../components/CustomizedAccordion'
import MobileSkleton from '../../components/MobileSkleton'

export default function Faq() {
  const path = useLocation()
  const { roleId, userTypeId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isDisabled, setIsDisabled] = useState(false)
  const [selected, setSelected] = useState('')

  const { pathname } = path

  const options = [
    {
      value: '068d66e7-6d9f-4089-ab01-d423f02a27f4',
      user_type_id: 'bd534c9a-f73e-46fd-b407-7742ec97caf0',
      label: 'Qurilish qatnashuvchilari',
    },
    {
      value: 'c9f74a64-77d4-409e-b9be-29b88eb34d20',
      user_type_id: 'b2ae4fc3-fd18-41f8-9d39-371ea09035d8',
      label: 'GASN xodimlari',
    },
  ]

  const isSuperAdmin = roleId === SUPER_ADMIN_ROLE_ID

  const { faqList, updateFaqStatusMutation, deleteFaqMutation } = useFaq({
    deleteFaqProps: {
      onSuccess: () => {
        toast.success("Savol muvaffaqqiyatli o'chirildi")
        faqList.refetch()
      },
    },
    limit,
    status: !isSuperAdmin,
    offset,
    department_id: isSuperAdmin ? selected?.value : options.find((i) => i.user_type_id === userTypeId)?.value,
    updataFaqProps: { onSuccess: () => {} },
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Savol',
      key: 'question',
      render: (val) => <div className="min-w-[300px]">{val}</div>,
    },
    {
      title: 'Javob',
      key: 'answer',
      render: (val) => <div className="min-w-[300px]">{val}</div>,
    },
    {
      title: <FilterPopup title="Bo'lim" options={options} selected={selected} setSelected={setSelected} />,
      key: 'department',
      render: (val) => <span>{val.name}</span>,
    },
    {
      title: '',
      key: ['id', 'status'],
      render: (val) => (
        <Switch
          disabled={isDisabled || !permissions[roleId]?.includes('FAQ/EDIT')}
          defaultChecked={val[1]}
          onChange={(e) => {
            setIsDisabled(true)
            updateFaqStatusMutation.mutate({ id: val[0], status: e })
            setTimeout(() => setIsDisabled(false), 500)
          }}
        />
      ),
    },
  ]

  return (
    <div className="h-screen">
      {pathname === '/m/faq' ? (
        ''
      ) : (
        <Header
          title="Ko'p beriladigan savollar"
          backLink="/inspectors"
          rightElement={
            permissions[roleId]?.includes('FAQ/ADD') && (
              <BtnFiled onClick={() => navigate('add')} leftIcon={<Add />}>
                Qo'shish
              </BtnFiled>
            )
          }
        />
      )}
      <div className="sidebar-header-calc">
        {roleId === SUPER_ADMIN_ROLE_ID ? (
          <BasicLayout
            footer={
              <Pagination
                count={1}
                pageCount={faqList.data?.count}
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
              headColumns={
                permissions[roleId]?.includes('FAQ/COLUMNS')
                  ? headData
                  : headData.filter((i) => !i.key?.includes('status') && i.key !== 'department')
              }
              bodyColumns={faqList.data?.common_questions}
              rowLink=""
              hasActions={permissions[roleId]?.includes('FAQ/COLUMNS')}
              deleteFunc={(id) => deleteFaqMutation.mutate({ id })}
              isLoading={faqList.isLoading}
            />
          </BasicLayout>
        ) : (
          <>
            {faqList.isLoading ? (
              <MobileSkleton />
            ) : (
              <div className="bg-white rounded-lg px-4">
                {faqList.data?.common_questions?.map((faq, index) => (
                  <CustomizedAccordion
                    isLast={faqList?.length - 1 === index}
                    key={faq.id}
                    id={faq.id}
                    header={faq.question}
                  >
                    <div>{faq.answer}</div>
                  </CustomizedAccordion>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
