import { useEffect, useMemo, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '../../../hooks/useQuery'
import { useGetForms } from '../../../services/basics/useGetBasicsList'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useAddForms } from '../../../services'

export const useBasicsProps = () => {
  const navigate = useNavigate()
  const query = useQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const [activeTab, setActiveTab] = useState(0)
  const tabElements = useMemo(
    () => [
      { key: 'b971a882-963d-4a28-a9cd-4b8daf4e792a', title: 'Davlat obyektlari' },
      { key: '41cade7c-c473-4922-8952-52787ba56a25', title: 'Tadbirkorlik obyektlari' },
    ],
    []
  )

  const handleOnClick = () =>
    navigate({ pathname: 'add', search: `?${createSearchParams({ type: tabElements[activeTab].key })}` })
  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Forma raqami',
      key: 'form_number',
      render: (value) => <div className="min-w-[140px]">{value}</div>,
    },
    {
      title: 'Dasturga kiritilgan obyektlar soni',
      key: 'planned_objects',
    },
    {
      title: '',
      key: 'id',
      width: 50,
      render: (value) => (
        <IconButton color="error" onClick={(e) => handleDelete(e, value)}>
          <Delete />
        </IconButton>
      ),
    },
  ]

  const { getFormListQuery } = useGetForms({
    limit,
    offset,
    type_id: searchParams.get('type'),
    formsProps: {
      enabled: !!searchParams.get('type'),
    },
  })
  const { deleteFormMutation } = useAddForms({
    deleteFormProps: {
      onSuccess: () => {
        getFormListQuery.refetch()
      },
    },
  })
  const handleDelete = (e, id) => {
    e.stopPropagation()
    deleteFormMutation.mutate({ id })
  }
  useEffect(() => {
    setSearchParams({ type: tabElements[activeTab].key })
  }, [activeTab, setSearchParams, tabElements])
  return {
    handleOnClick,
    headData,
    bodyData: getFormListQuery.data?.data?.forms || [],
    count: getFormListQuery.data?.data?.count || 0,
    isLoading: getFormListQuery.isLoading,
    tabElements,
    setLimit,
    setOffset,
    limit,
    offset,
    activeTab,
    setActiveTab,
    navigate,
  }
}
