import { useParams } from 'react-router-dom'

import { useMemo, useState } from 'react'
import MobileRegulationList from './regulationList'
import { useSelector } from 'react-redux'
import { useRegulation } from '../../../services'
import TabsWithButtons from '../../../components/Tabs/TabsWithButtons'

const MobileRegulations = () => {
  const offset = 1
  const limit = 10
  const { userId } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState(0)
  const { id } = useParams()

  const { regulationTypes } = useRegulation({
    regulationTypesQueryProps: {
      enabled: true,
    },
  })
  const tabs = useMemo(
    () =>
      regulationTypes.data?.regulation_types?.map((item, index) => {
        return {
          title: item?.type,
          key: index,
          value: item?.id,
          // component: (
          //   <MobileRegulationList data={regulationsByObjectId?.data} isLoading={regulationsByObjectId?.isLoading} />
          // ),
        }
      }),
    [regulationTypes.data?.regulation_types]
  )
  const { regulationsByObjectId, regulationByUser } = useRegulation({
    regulationParams: {
      limit,
      offset,
      type_id: tabs?.find((item) => item.key === activeTab)?.value,
    },
    objectId: id,
    regulationProps: {
      enabled: !!id && regulationTypes.isSuccess && tabs?.length > 0,
    },
    regulationByUserParams: {
      limit,
      offset,
      user_id: activeTab === 0 ? userId : null,
      inspector_id: activeTab === 1 ? userId : null,
    },
    regulationByUserProps: {
      enabled: !id && regulationTypes.isSuccess && tabs?.length > 0,
    },
  })

  const tabElements = useMemo(
    () =>
      tabs?.map((item, index) => {
        return {
          ...item,
          component: (
            <MobileRegulationList
              data={!!id ? regulationsByObjectId?.data?.object_regulations : regulationByUser?.data?.regulations}
              isLoading={!!id ? regulationsByObjectId?.isLoading : regulationByUser?.isLoading}
            />
          ),
        }
      }),
    [
      regulationsByObjectId?.data,
      regulationsByObjectId?.isLoading,
      tabs,
      regulationByUser.data,
      regulationByUser.isLoading,
      id,
    ]
  )
  return (
    <>
      {/* <MobileFilterHeader
        className="items-end"
        title={
          <div className="flex justify-between w-full items-center">
          </div>
        }
      /> */}
      <TabsWithButtons tabs={tabElements} setActiveTab={setActiveTab} />
    </>
  )
}

export default MobileRegulations
