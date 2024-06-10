import { useNavigate, useParams } from 'react-router-dom'

import { Add, Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useMonitoring } from '../../../../services/useMonitoring'
import { MobileFilterHeader } from '../../../../components/FilterHeader/MobileFilterHeader'
import MobileSkleton from '../../../../components/MobileSkleton'
import NoItems from '../../../../components/NoItems'
import MobileMonitoringComp from '../../components/monitoring'
const MobileMonitoring = () => {
  const offset = 1
  const limit = 10
  const navigate = useNavigate()
  const { id } = useParams()

  const { monitoringList } = useMonitoring({
    monitoringQueryProps: {
      enabled: true,
    },
    getParams: {
      offset,
      limit,
      object_id: id,
    },
    objectId: id,
  })

  return (
    <>
      <MobileFilterHeader
        leftElements={[
          <div className="h-full flex items-center justify-between w-full">
            <h2>Monitoring tarixi</h2>
          </div>,
        ]}
        rigthElements={[
          <button onClick={() => navigate('monitoring/add')} className="p-1 bg-primary rounded-lg ">
            <Add htmlColor="white" />
          </button>,
        ]}
      />
      <div className="p-4 bg-[#f6f6f6] mobile-header-filter-tab-calc ">
        {monitoringList.isLoading ? (
          <MobileSkleton />
        ) : monitoringList.data.data?.monitory_list ? (
          monitoringList.data.data.monitory_list?.map((monitor, index) => (
            <MobileMonitoringComp key={monitor?.id} monitor={monitor} index={index} />
          ))
        ) : (
          <NoItems />
        )}
      </div>
    </>
  )
}

export default MobileMonitoring
