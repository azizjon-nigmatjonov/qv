import { format } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'

import { useCategory } from '../../../services'
import MobileSkleton from '../../../components/MobileSkleton'
import { DocIcon, RightArrowIcon } from '../../../assets/icons'
import { JOURNAL_MUALLIFLIK_CATEGORY_ID, JOURNAL_UMIMIY_CATEGORY_ID } from '../../../settings/constants'
import NoItems from '../../../components/NoItems'
import dateFormatter from '../../../utils/dateFormatter'

const MobileJournal = () => {
  const offset = 1
  const limit = 10

  const { id } = useParams()
  const navigate = useNavigate()

  const { categoryByObjectId } = useCategory({
    object_id: id,
    logsQueryProps: {
      enabled: true,
    },
    getLogParams: {
      offset,
      limit,
    },
  })

  return (
    <div className="p-4 bg-[#f6f6f6] mobile-header-tabs-calc">
      {categoryByObjectId.isLoading ? (
        <MobileSkleton />
      ) : categoryByObjectId.data?.category_logs ? (
        categoryByObjectId.data?.category_logs.map((category, index) => (
          <div
            key={category.id}
            onClick={() =>
              category.id === JOURNAL_UMIMIY_CATEGORY_ID
                ? navigate(`journal/${category.id}`)
                : category.id === JOURNAL_MUALLIFLIK_CATEGORY_ID
                ? navigate(`author-journal/${category.id}`)
                : {}
            }
            className={`bg-white flex justify-between items-center rounded-md p-3 ${index ? 'mt-3' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100">
                <DocIcon className="mx-auto" />
              </div>
              <div className="text-sm leading-6">
                <p className="font-medium">{category?.name}</p>
                <p className="text-[#6E7C87]">{dateFormatter(format,new Date(category?.created_at), 'dd.MM.yyyy')}</p>
              </div>
            </div>
            <RightArrowIcon />
          </div>
        ))
      ) : (
        <NoItems />
      )}
    </div>
  )
}

export default MobileJournal
