import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../../../hooks/useQuery'
import { useGetBasics } from '../../../services'

export const useTableProps = () => {
  const navigate = useNavigate()
  const query = useQuery()

  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)

  const handleOnClick = () => navigate('add')

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Forma raqami',
      key: 'nomer_form',
      innerKey: 'form-number',
      render: (value) => <div className="min-w-[140px]">{value}</div>,
    },
    {
      title: 'Izoh',
      key: 'description',
      render: (value) => <div className="min-w-[318px]">{value}</div>,
    },
    {
      title: 'Prezident qarori',
      key: 'president',
      columns: [
        {
          title: 'Raqami',
          key: 'president_order',
        },
        {
          title: 'Ilovasi',
          key: 'president_appendix',
        },
      ],
    },
    {
      title: 'Vazirlar Mahkamasi Bayoni',
      key: 'ministery',
      columns: [
        {
          title: 'Raqami',
          key: 'ministery_busy',
        },
        {
          title: 'Band',
          key: 'ministery_confirmation',
        },
      ],
    },
    {
      title: 'Dasturga kiritilgan obyektlar soni',
      key: 'inserted_objects',
    },
    {
      title: 'Dasturdan chiqarilgan obyektlar soni',
      key: 'moved_objects',
    },
    {
      title: 'Dasturga qo`shilgan obyektlar soni',
      key: 'planned_objects',
    },
  ]

  const { getBasicsListQuery } = useGetBasics({
    limit,
    offset,
  })

  return {
    handleOnClick,
    headData,
    bodyData: getBasicsListQuery.data?.data?.bases || [],
    isLoading: getBasicsListQuery.isLoading,
    count: getBasicsListQuery.data?.data?.count || 0,
    offset,
    limit,
    setOffset,
    setLimit,
  }
}
