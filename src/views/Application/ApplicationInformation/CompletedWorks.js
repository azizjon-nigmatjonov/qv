import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import { BasicTable, Header, Tabs, BasicLayout, Pagination, BtnFiled, BtnOutlined } from '../../../components'
import ModalGiveReason from '../../../components/ModalGiveReason'
import { useQuery } from '../../../hooks/useQuery'

function CompletedWorks() {
  const query = useQuery()
  const context = useOutletContext()
  const [control, register, reset, setValue, contractByIdQuery, setRightElement] = context ?? []
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation()
  const locationPath = location.pathname.split('/')
  useEffect(() => {
    setRightElement &&
      setRightElement(() => ({ fileDownloader, pdf }) => {
        return (
          <BtnFiled
            color="blue"
            leftIcon={<Add />}
            onClick={() => {
              fileDownloader(pdf, true)
            }}
          >
            File yuklash
          </BtnFiled>
        )
      })
  }, [setRightElement])

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Sana',
      key: 'date',
    },
    {
      title: 'Fayl',
      key: 'file',
    },
    {
      title: 'Izoh',
      key: 'comment',
    },
  ]

  const handleToggle = () => setIsOpen((isOpen) => !isOpen)

  return (
    <>
      <div className="h-screen">
        <div className="sidebar-header-calc">
          <BasicLayout
            footer={
              <Pagination
                count={90}
                pageCount={limit}
                onChange={(pageNumber) => setOffset(pageNumber)}
                currentPage={offset}
                onChangeLimit={(limitNumber) => setLimit(limitNumber)}
                limit={limit}
              />
            }
          >
            <BasicTable
              offset={offset}
              limit={limit}
              headColumns={headData}
              //   bodyColumns={}
              //   rowLink={}
              isLoading={false}
            />
          </BasicLayout>
        </div>
      </div>
      <ModalGiveReason isOpen={isOpen} handleClose={handleToggle} btnText="Tasdiqlash" title="Izoh kiriting" />
    </>
  )
}

export default CompletedWorks
