import { useParams } from 'react-router-dom'
import { BasicLayout, BasicTable, Pagination } from '../../../components'
import { hoc } from '../../../utils/hoc'
import { useFormTableProps } from './formTable.props'

const FormTableUI = hoc(useFormTableProps, ({ f2Data, data, headData, handleClickRow, footerColumns }) => {
  const { formId } = useParams()
  return (
    <div className="sidebar-header-calc">
      <BasicLayout>
        <BasicTable
          desiredRowName="form_id"
          desiredRowName2="category_id"
          desiredRowName3="sector_ids"
          desiredRowName4="region_id"
          desiredRowName5="category_name"
          isLoading={data?.isLoading}
          headColumns={headData}
          bodyColumns={!formId ? [f2Data, ...(data?.data?.data?.results || [])] : data?.data?.data?.results}
          clickHandler={handleClickRow}
          colTextCenter={true}
          footerColumns={footerColumns}
          customMaxHeight={'calc(100vh - 178px)'}
        />
      </BasicLayout>
    </div>
  )
})

export default FormTableUI
