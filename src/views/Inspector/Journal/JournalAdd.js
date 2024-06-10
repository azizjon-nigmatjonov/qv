import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { CancelIcon, SaveIcon } from '../../../assets/icons'
import { BasicLayout, BasicTable, BtnFiled, BtnOutlined, Header, Pagination } from '../../../components'
import ConfirmModal from '../../../components/ConfirmModal'
import { useCategory, useJournal, useLog } from '../../../services'

export function JournalAdd() {
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const [filtered, setFiltered] = useState([])
  const [selectedJournals, setSelectedJournals] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleModalOpen = () => setIsOpen(true)
  const handleModalClose = () => setIsOpen(false)

  const { id } = useParams()

  const navigate = useNavigate()

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Bajarilgan harakat',
      key: 'name',
    },
    {
      title: 'Holati',
      key: 'status',
    },
  ]

  const { postRelatedJournalsMutation, journals, relatedJournals } = useJournal({
    postRelatedJournalsMutationParams: {
      object_id: id,
      onSuccess: () => navigate(-1),
      onError: (error) => toast.error(error),
    },
    journalQueryParams: {
      object_id: id,
      limit: 100,
    },
    relatedJournalQueryParams: {
      object_id: id,
    },
  })

  useEffect(() => {
    if (journals?.data?.journals.journals?.length) {
      setFiltered(
        journals?.data?.journals.journals.map((journal, index) => {
          return {
            ...journal,
            status: relatedJournals?.data?.journal_relations?.some((item) => item.journal_id === journal.id),
          }
        })
      )
    }
  }, [journals.data, relatedJournals.data])

  const switchFilterFn = (id, checked) => {
    setSelectedJournals((prev) => {
      if (checked) {
        return [...prev, id]
      } else {
        return prev.filter((item) => item !== id)
      }
    })
    setFiltered((prev) => prev.map((item) => (item.id === id ? { ...item, status: checked } : { ...item })))
  }

  const onSubmit = () => {
    postRelatedJournalsMutation.mutate({
      object_id: id,
      journal_id: selectedJournals,
    })
  }

  // createMutation.mutate({
  //   additional_categories: filtered.filter((item) => item.status).map((i) => i.id),
  //   id,
  //   object_images: [],
  // })

  return (
    <div className="h-screen">
      <Header
        title="Qo’shish"
        backLink={-1}
        rightElement={
          <div className="flex items-center gap-[12px]">
            <BtnOutlined leftIcon={<CancelIcon />} color="red" onClick={() => navigate(-1)}>
              Bekor qilish
            </BtnOutlined>
            <BtnFiled color="blue" leftIcon={<SaveIcon />} onClick={handleModalOpen}>
              Saqlash
            </BtnFiled>
          </div>
        }
      />
      <div className="sidebar-header-calc">
        <BasicLayout>
          <BasicTable
            headColumns={headData}
            bodyColumns={filtered}
            isLoading={journals.isLoading}
            switchFn={switchFilterFn}
          />
        </BasicLayout>
        <ConfirmModal handleClose={handleModalClose} fn={onSubmit} isOpen={isOpen} />
      </div>
    </div>
  )
}
