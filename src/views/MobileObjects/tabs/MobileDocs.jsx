import { format } from 'date-fns'
import { useParams } from 'react-router-dom'

import { DocIcon, DownloadIcon } from '../../../assets/icons'
import MobileSkleton from '../../../components/MobileSkleton'
import NoItems from '../../../components/NoItems'
import { useDocument } from '../../../services'
import dateFormatter from '../../../utils/dateFormatter'
import downloadItForMe from '../../../utils/downloadItForMe'

const MobileDocs = () => {
  const offset = 1
  const limit = 1

  const { id } = useParams()

  const { documents } = useDocument({
    documentsQueryProps: {
      enabled: true,
    },
    offset,
    limit,
    objectId: id,
  })

  return (
    <div className="p-4 bg-[#f6f6f6] mobile-header-filter-calc">
      {documents.isLoading ? (
        <MobileSkleton />
      ) : documents.data?.object_docs ? (
        documents.data?.object_docs.map((doc, index) => (
          <div key={doc.id} className={`bg-white rounded-md p-3 text-sm leading-6 ${index === 0 ? '' : 'mt-4'}`}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100">
                <DocIcon className="mx-auto" />
              </div>
              <span className="font-medium">{doc?.name}</span>
            </div>
            <div className="flex justify-between pb-3 border-b mt-3">
              <span className="text-[#48535B]">Hujjat sanasi</span>
              <span className="text-[#1A2024] font-medium">{dateFormatter(format,new Date(doc?.created_at), 'dd.MM.yyyy')}</span>
            </div>
            <div className="flex justify-between pb-3 border-b mt-3">
              <span className="text-[#48535B]">Hujjat raqami</span>
              <span className="text-[#1A2024] font-medium text-right">{doc?.doc_number}</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[#48535B]">Fayl</span>
              <div className="text-[#1A2024] font-medium flex items-center gap-3">
                <span>{doc?.file?.slice(-20)}</span>
                <div
                  className="border rounded-md inline-block p-[5px]"
                  onClick={() => downloadItForMe({ bucketName: 'files', expiresAt: 1, filename: doc?.file })}
                >
                  <DownloadIcon />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoItems />
      )}
    </div>
  )
}

export default MobileDocs
