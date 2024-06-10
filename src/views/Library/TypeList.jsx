import { BasicLayout, BasicTable, FilterHeader, Header } from '../../components'
import { useLibrary } from '../../services'

export default function TypeList() {
  const { getTypes } = useLibrary({
    getTypesProps: {
      enabled: true,
    },
  })

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Nomi',
      key: 'title',
    },
  ]

  return (
    <div className="h-screen">
      <Header title="Kutubxona" backLink={-1} />
      <FilterHeader />
      <div className="sidebar-header-filter-calc">
        <BasicLayout>
          <BasicTable
            headColumns={headData}
            bodyColumns={getTypes.data?.data?.types}
            rowLink="/library"
            isLoading={getTypes.isLoading}
          />
        </BasicLayout>
      </div>
    </div>
  )
}
