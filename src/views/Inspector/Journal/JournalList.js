import { useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { AddIcon } from '../../../assets/icons'
import { useCategory, useJournal, useObject } from '../../../services'
import { permissions } from '../../../settings/permissions'
import { BasicLayout, BasicTable, Header, Tabs, Pagination, BtnFiled } from '../../../components'
import { JOURNAL_MUALLIFLIK_CATEGORY_ID, JOURNAL_UMIMIY_CATEGORY_ID } from '../../../settings/constants'
import { useQuery } from '../../../hooks/useQuery'

export function JournalList() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const query = useQuery()

  const { id } = useParams()
  const { roleId, userId } = useSelector((state) => state.auth)

  const { object } = useObject({
    id,
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Nomi',
      key: 'journal_name',
    },
  ]

  const tabLinks = [
    {
      key: 'Asosiy ma’lumotlar',
      title: 'Asosiy ma’lumotlar',
      path: `/inspectors/${id}`,
    },
    {
      key: 'Hujjatlar',
      title: 'Hujjatlar',
      path: `/inspectors/${id}/documents`,
    },
    {
      key: 'monitoring',
      title: 'Monitoring',
      path: `/inspectors/${id}/monitoring`,
    },
    {
      key: 'instructions',
      title: "Yozma ko'rsatmalar",
      path: `/inspectors/${id}/instructions`,
    },
    {
      key: 'journal',
      title: 'Ijro hujjatlari',
      path: `/inspectors/${id}/journal`,
    },
    {
      key: 'photo-reports',
      title: 'Foto hisobot',
      path: `/inspectors/${id}/photo-reports`,
    },
    {
      key: 'payment',
      title: 'To`lovlar',
      path: `/inspectors/${id}/payment`,
    },
    {
      key: 'calendar',
      title: 'Nazorat kalendari',
      path: `/inspectors/0c32ffb9-2cae-44d8-acd9-735ede261d1f/calendar/${object.data?.task_id}`,
    },
  ]

  const { relatedJournals } = useJournal({
    relatedJournalQueryParams: {
      object_id: id,
    },
  })
  // console.log(permissions[roleId]?.includes('OBJECTS/JOURNAL/ADD'))
  return (
    <div className="h-screen">
      <Header
        title={`${pathname?.includes('journals') ? 'Ijro hujjatlari' : ''}`}
        backLink={-1}
        centerElement={!pathname?.includes('journals') && <Tabs elements={tabLinks} />}
      />
      <div className="sidebar-header-calc">
        <BasicLayout
          rightElement={
            permissions[roleId]?.includes('OBJECTS/JOURNAL/ADD') && (
              <NavLink to="add">
                <BtnFiled color="blue" leftIcon={<AddIcon />}>
                  Qo'shish
                </BtnFiled>
              </NavLink>
            )
          }
          title={pathname?.includes('journal') && 'Ijro hujjatlari'}
        >
          <BasicTable
            desiredRowName="id"
            desiredRowName2="unique_name"
            desiredRowName3="journal_id"
            headColumns={headData}
            clickHandler={(journal_relation_id, journalName, journal_id) =>
              pathname?.includes('journals')
                ? {}
                : journal_id === JOURNAL_MUALLIFLIK_CATEGORY_ID
                ? navigate(`/inspectors/${id}/author-journal/${journal_id}`)
                : journal_id === JOURNAL_UMIMIY_CATEGORY_ID
                ? navigate(`/inspectors/${id}/general-journal/${journal_id}`)
                : navigate(`/inspectors/${id}/journal/${journalName}/${journal_id}/${journal_relation_id}`)
            }
            bodyColumns={relatedJournals.data?.journal_relations}
            isLoading={relatedJournals.isLoading}
          />
        </BasicLayout>
      </div>
    </div>
  )
}
