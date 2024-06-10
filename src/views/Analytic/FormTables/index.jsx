import { useMemo, useState } from 'react'
import { BtnOutlined, FilterHeader, Header } from '../../../components'
import { CustomDatePicker } from '../../../components/CustomDatePicker'
import FormTableUI from './FormTableUI'
import { Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ArrowDownIcon, DownloadIcon } from '../../../assets/icons'
import { useGetFormTables } from '../../../services/basics/useGetForms'
import fileDownloader from '../../../utils/fileDownloader'
import { format } from 'date-fns'

export default function FormTables() {
  const { id, formId, regionId } = useParams()
  const { state } = useLocation()
  const [range, setRange] = useState([
    {
      key: 'selection',
    },
  ])
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const { statePrograms, sector_ids } = searchParamsMemo
  const [canClear, setCanClear] = useState(false)
  const { getFormExcelQuery } = useGetFormTables({
    formExcelProps: {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running,
      onSuccess: (data) => {
        fileDownloader(data.data)
      },
    },
    formExcelParams: {
      form_id: formId,
      start_date: range[0].startDate || '0001-01-01',
      end_date: range[0].endDate || format(new Date(), 'yyyy-MM-dd'),
      category_id: statePrograms,
      sector_ids,
    },
  })
  function handleDownloadExcel() {
    getFormExcelQuery.refetch()
  }
  return (
    <div className="h-screen">
      {!id && (
        <>
          <Header backLink={!!formId && -1} title={state?.formName || 'Formalar'} />
          <FilterHeader
            leftElements={[
              <CustomDatePicker
                type="range"
                maxDate={new Date()}
                range={range}
                setRange={setRange}
                style={{ width: canClear ? '270px' : '250px' }}
                rightIcon={false}
                months={2}
                direction="column"
                showBtn={false}
                placeholder="Sanani tanlang"
                canClear={canClear}
                setCanClear={setCanClear}
                onRangeFocusChange={() => setCanClear(true)}
                hasQuery
              />,
            ]}
            rigthElements={[
              <BtnOutlined key="download" leftIcon={<DownloadIcon />} onClick={() => handleDownloadExcel()}>
                Yuklab olish
              </BtnOutlined>,
            ]}
          />
        </>
      )}
      <div className={`${regionId && !id && 'p-4'}`}>
        <Outlet />
      </div>
    </div>
  )
}
