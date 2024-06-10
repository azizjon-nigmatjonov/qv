import { Add } from '@mui/icons-material'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { BasicTable, Header, Tabs, BasicLayout, Pagination, Tag, BtnFiled } from '../../../components'
import { useQuery } from '../../../hooks/useQuery'
import { useContract } from '../../../services/labaratory/useContract'
import dateFormatter from '../../../utils/dateFormatter'

function Departments() {
  const query = useQuery()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState(0)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const navigate = useNavigate()
  const location = useLocation()
  const locationPath = location.pathname.split('/')
  const [control, register, reset, setValue, contractByIdQuery, setRightElement] = useOutletContext()

  useEffect(() => {
    setRightElement(() => () => <div></div>)
  }, [setRightElement, navigate])

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Bo`lim',
      key: 'department',
      render: (item) => item || '----',
    },
    {
      title: 'FISH',
      key: 'full_name',
      render: (item) => item || '----',
    },
    // {
    //   title: 'STIR PINFL',
    //   key: 'stir_pinfl',
    // },
    {
      title: 'Sana',
      key: 'created_at',
      render: (date) => {
        return dateFormatter(format, date, 'dd.MM.yyyy')
      },
    },
    // {
    //   title: 'Fayl',
    //   key: 'file',
    // },
    {
      title: 'Izoh',
      key: 'comment',
      render: (item) => item || '----',
    },
    {
      title: 'Holati',
      key: ['status', 'comment'],
      render: ([status, comment]) => {
        console.log(status, comment)
        return (
          <Tag
            color={!!status ? 'green' : !!comment ? 'red' : 'yellow'}
            value={!!status ? 'Qabul qilindi' : !!comment ? 'Rad etildi' : 'Jarayonda'}
          />
        )
      },
    },
  ]

  const { contractActionQuery } = useContract({
    id,
    getContractActionProps: {
      enabled: true,
    },
  })

  return (
    <>
      <div className="h-screen">
        <div className="sidebar-header-calc">
          <BasicLayout>
            <BasicTable
              offset={offset}
              limit={limit}
              headColumns={headData}
              bodyColumns={contractActionQuery.data?.data?.actions}
              //   rowLink={}
              isLoading={false}
            />
          </BasicLayout>
        </div>
      </div>
    </>
  )
}

export default Departments
