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

export function JournalListV2() {
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

  const { relatedJournals } = useJournal({
    relatedJournalQueryParams: {
      object_id: id,
    },
  })
  // console.log(permissions[roleId]?.includes('OBJECTS/JOURNAL/ADD'))
  return (
    <div className="h-screen">
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
