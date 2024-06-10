import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { BasicLayout, BasicTable, BtnFiled, Header, MuiTabs, Pagination } from '../../../components'
import { useField } from '../../../services'
import { SaveIcon } from '../../../assets/icons'
import NoDataPng from '../../../assets/images/no-data.png'
import { useQuery } from '../../../hooks/useQuery'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { IconButton } from '@mui/material'
import { Delete, Edit, Remove } from '@mui/icons-material'

const FieldsList = () => {
  const navigate = useNavigate()
  const query = useQuery()

  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [activeTab, setActiveTab] = useState(+query.get('tab') || 0)
  const [activeTabInner, setActiveTabInner] = useState(0)
  const [leftData, setLeftData] = useState({})
  const [rightData, setRightData] = useState({})
  const [objectCategoriesList, setObjectCategoriesList] = useState([])
  const [type, setType] = useState('b971a882-963d-4a28-a9cd-4b8daf4e792a')
  const [errorMessage, setErrorMessage] = useState(false)
  const tabElements = [
    {
      key: 0,
      title: 'Dastur',
    },
    {
      key: 1,
      title: 'Soha',
    },
    {
      key: 2,
      title: 'Birlashtirish',
    },
  ]
  const thirdTabElements = [
    {
      key: 0,
      title: 'Davlat',
    },
    {
      key: 1,
      title: 'Tadbirkorlik',
    },
  ]

  const { createMergedListMutation, getObjectCategoryList, getObjectSectorList } = useField({
    createMergedListProps: {
      onSuccess: () => {
        toast.success('Yaratildi')
        setRightData({})
      },
    },
    getObjectSectorListParams: {
      limit,
      offset,
      type,
    },
    getObjectCategoryListParams: {
      type,
      limit,
      offset,
    },
    objectQueryProps: {
      enabled: true,
    },
    sectorProps: {
      enabled: activeTab === 2 || activeTab === 0,
    },
    categoryProps: {
      enabled: activeTab === 2 || activeTab === 1,
    },
  })

  const handleTableAction = (status, value) => {
    if (status === 'left') {
      setLeftData(value)
    }
    if (status === 'right') {
      setRightData(value)
    }
  }

  const handleSubmit = () => {
    if (activeTab === 2) {
      if (leftData?.id && rightData?.id) {
        createMergedListMutation.mutate({
          sector: leftData.id,
          category: rightData.id,
        })
      } else setErrorMessage(true)
    } else navigate(`add/${activeTab === 0 ? 'category' : 'sector'}`)
  }

  const extraRightHeader = (
    <div className="flex items-center space-x-10">
      {errorMessage ? <p className="text-red-500 font-medium ml-10">Iltimos dastur va soha tanlang</p> : ''}
      <BtnFiled color="blue" onClick={() => handleSubmit()} leftIcon={<SaveIcon />}>
        Qo'shish
      </BtnFiled>
    </div>
  )

  const extraCenterHeader = (
    <MuiTabs offset={offset} limit={limit} activeTab={activeTab} elements={tabElements} setActiveTab={setActiveTab} />
  )

  const objectSectorList = useMemo(() => {
    return getObjectSectorList?.data?.datas ?? []
  }, [getObjectSectorList])

  function handleEditClick(e, id) {
    e.stopPropagation()
    navigate(`${id}/${activeTab === 0 ? 'category' : 'sector'}`)
  }
  function handleDelete(e, id, type) {
    e.stopPropagation()
  }
  useEffect(() => {
    if (activeTabInner === 1) {
      setType('41cade7c-c473-4922-8952-52787ba56a25')
    } else setType('b971a882-963d-4a28-a9cd-4b8daf4e792a')
  }, [activeTabInner])

  useEffect(() => {
    setObjectCategoriesList(getObjectCategoryList?.data?.data?.datas)
  }, [getObjectCategoryList])

  return (
    <div className="h-screen">
      <Header title="Rollar" rightElement={extraRightHeader} centerElement={extraCenterHeader} />
      <div className="sidebar-header-calc">
        <BasicLayout
          header={
            <MuiTabs
              getParamsFromLocation={false}
              activeTab={activeTabInner}
              elements={thirdTabElements}
              setActiveTab={setActiveTabInner}
            />
          }
          footer={
            (activeTab === 0 || activeTab === 1) && (
              <Pagination
                count={activeTab === 0 ? getObjectSectorList?.data?.count : getObjectCategoryList?.data?.count}
                pageCount={limit}
                onChange={(pageNumber) => setOffset(pageNumber)}
                currentPage={offset}
                onChangeLimit={(limitNumber) => setLimit(limitNumber)}
                limit={limit}
              />
            )
          }
        >
          {activeTab === 0 ? (
            <>
              <BasicTable
                desiredRowName="id"
                desiredRowName2="title"
                headColumns={[
                  { title: '№', key: 'order' },
                  { title: 'Dastur nomi', key: 'title' },
                  {
                    title: '',
                    key: 'id',
                    render: (val) => (
                      <IconButton color="primary" onClick={(e) => handleEditClick(e, val)}>
                        <Edit />
                      </IconButton>
                    ),
                    width: 40,
                  },
                  {
                    title: '',
                    key: 'id',
                    render: (val) => (
                      <IconButton color="error" onClick={(e) => handleDelete(e, val, 'category')}>
                        <Delete />
                      </IconButton>
                    ),
                    width: 40,
                  },
                ]}
                clickHandler={(id, title) => {
                  navigate(
                    `list/${id}/${
                      activeTabInner === 0
                        ? 'b971a882-963d-4a28-a9cd-4b8daf4e792a'
                        : '41cade7c-c473-4922-8952-52787ba56a25'
                    }`
                  )
                }}
                limit={limit}
                offset={offset}
                bodyColumns={objectSectorList}
                customMaxHeight="calc(100vh - 274px)"
              />
            </>
          ) : (
            ''
          )}
          {activeTab === 1 ? (
            <>
              {/* <div className="border rounded-md mt-5">
                {objectCategoriesList?.map((item) => (
                  <div
                    key={item.id}
                    className={`border-b py-3 px-4 text-sm leading-[22px] text-[#303940] cursor-pointer hover:bg-blue-50 duration-300`}
                  >
                    {item.title}
                  </div>
                ))}
              </div> */}
              <BasicTable
                desiredRowName="id"
                headColumns={[
                  { title: '№', key: 'order' },
                  { title: 'Soha nomi', key: 'title' },
                  {
                    title: '',
                    key: 'id',
                    render: (val) => (
                      <IconButton color="error" onClick={(e) => handleDelete(e, val, 'sector')}>
                        <Delete />
                      </IconButton>
                    ),
                    width: 40,
                  },
                ]}
                clickHandler={(id) => {
                  navigate(id + '/' + activeTab === 0 ? 'category' : 'sector')
                }}
                limit={limit}
                offset={offset}
                bodyColumns={objectCategoriesList}
                customMaxHeight="calc(100vh - 274px)"
              />
            </>
          ) : (
            ''
          )}
          {activeTab === 2 ? (
            <>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <h2 className="text-xl font-medium mb-2">Dastur</h2>
                  <div className="border rounded-md h-[450px] overflow-y-scroll">
                    {objectSectorList?.map((item) => (
                      <div
                        key={item.id}
                        className={`${
                          leftData?.id && item.id === leftData.id ? 'bg-blue-50' : ''
                        } border-b py-3 px-4 text-sm leading-[22px] text-[#303940] cursor-pointer hover:bg-blue-50 duration-300`}
                        onClick={(e) => {
                          handleTableAction('left', item)
                          e.preventDefault()
                        }}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-medium mb-2">Soha</h2>
                  <div className="border rounded-md h-[450px] overflow-y-scroll">
                    {objectCategoriesList?.map((item) => (
                      <div
                        key={item.id}
                        className={`${
                          rightData?.id && item.id === rightData.id ? 'bg-blue-50' : ''
                        } border-b py-3 px-4 text-sm leading-[22px] text-[#303940] cursor-pointer hover:bg-blue-50 duration-300`}
                        onClick={(e) => {
                          handleTableAction('right', item)
                          e.preventDefault()
                        }}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {leftData?.id && rightData?.id ? (
                <div className="border rounded-md mt-5">
                  <div className="grid grid-cols-2">
                    <span className="border-r p-3 font-medium">{leftData.title}</span>
                    <span className="p-3 font-medium">{rightData.title}</span>
                  </div>
                </div>
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}
          {/* {!objectSectorList?.length && !objectCategoriesList?.length ? (
            <div className="border rounded-md">
              <div className="h-full text-center flex justify-center items-center w-full text-[18px] font-[500] opacity-50 py-10">
                <div>
                  <img
                    className="mx-auto mb-5 pointer-events-none"
                    width={200}
                    src={NoDataPng}
                    alt="Ma'lumot topilmadi"
                  />
                  <p>Malumotlar mavjud emas</p>
                </div>
              </div>
            </div>
          ) : ''} */}
        </BasicLayout>
      </div>
    </div>
  )
}

export default FieldsList
