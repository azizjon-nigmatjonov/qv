import { useLocation, useNavigate } from 'react-router-dom'

import { BasicLayout, BasicTable, BtnFiled, Header } from '../../../components'
import { useRegion } from '../../../services'
import { useLaboratoryRequisite } from '../../../services/laboratory-requisite'
import { AddIcon } from '../../../assets/icons'

const RequisitesList = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isLaboratory = pathname.includes('laboratory-requisites')

  const { regionsRequisite } = useRegion({
    offset: 1,
    limit: 15,
    regionProps: {
      enabled: !isLaboratory,
    },
    regionsRequisiteProps: {
      enabled: true,
    },
  })

  const { laboratoryRequisites } = useLaboratoryRequisite({
    laboratoryRequisitesProps: { enabled: pathname.includes('laboratory-requisites') },
  })

  const headData = [
    {
      title: 'Viloyatlar',
      key: 'region_name_uz',
      render: (val) => <div className="min-w-[400px]">{val}</div>,
    },
    isLaboratory && {
      title: 'Laboratoriya nomi',
      key: 'lab_name',
    },
  ]

  return (
    <div className="h-screen">
      <Header
        title="Rekvizitlar"
        rightElement={
          <BtnFiled color="blue" onClick={() => navigate('edit')} leftIcon={<AddIcon fontSize="small" />}>
            Qo'shish
          </BtnFiled>
        }
      />
      <div className="sidebar-header-calc">
        <BasicLayout>
          <BasicTable
            headColumns={headData}
            bodyColumns={isLaboratory ? laboratoryRequisites.data?.data?.labs : regionsRequisite.data?.requisites}
            rowLink={isLaboratory ? '/settings/laboratory-requisites' : '/settings/requisites'}
            isLoading={false}
          />
        </BasicLayout>
      </div>
    </div>
  )
}

export default RequisitesList
