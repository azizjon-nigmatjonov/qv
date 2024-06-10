import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import MobileSkleton from '../../../components/MobileSkleton'
import { PenaltyIcon } from '../../../assets/icons'
import dateFormatter from '../../../utils/dateFormatter'
import { Tag } from '../../../components'
import NoItems from '../../../components/NoItems'

export default function MobileRegulationList({ data, isLoading }) {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className={`${id ? 'mobile-header-filter-tab-calc' : 'mobile-header-tabs-calc'}  p-4 bg-[#f6f6f6]`}>
      {isLoading ? (
        <MobileSkleton />
      ) : !!data.length ? (
        data?.map((regulation, index) => (
          <div
            key={regulation.id}
            className={`bg-white rounded-md p-3 text-sm leading-6 ${index === 0 ? '' : 'mt-4'}`}
            onClick={() => navigate(!!id ? 'instruction/' + regulation?.id : regulation?.id)}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100">
                <PenaltyIcon className="mx-auto" />
              </div>
              <span className="font-medium">{regulation?.regulation_number}</span>
            </div>
            <div className="flex justify-between pb-3 border-b mt-3">
              <span className="text-[#48535B]">Qoidabuzarlik</span>
              <span className="text-[#1A2024] font-mediumtext-right">{regulation?.all_violations}</span>
            </div>
            <div className="flex justify-between pb-3 border-b mt-3">
              <span className="text-[#48535B]">Yaratilgan sana</span>
              <span className="text-[#1A2024] font-medium text-right">
                {dateFormatter(format, new Date(regulation?.created_at), 'dd.MM.yyyy')}
              </span>
            </div>
            <div className="flex justify-between pb-3 border-b mt-3">
              <span className="text-[#48535B]">Ko'rsatma beruvchi</span>
              <div className="flex flex-col items-end">
                <p className="text-primary text-xs">{regulation?.user?.role_name}</p>
                <p className="text-[#1A2024] text-right">{`${regulation?.user?.user_name} ${regulation?.user?.user_middlename} ${regulation?.user?.user_surname}`}</p>
              </div>
            </div>
            <div className="flex justify-between pb-3 border-b mt-3">
              <span className="text-[#48535B]">Mas'ul xodim</span>
              <div className="flex flex-col items-end">
                <p className="text-primary text-xs">{regulation?.guilty_user?.role_name}</p>
                <p className="text-[#1A2024] text-right">{`${regulation?.guilty_user?.user_name} ${regulation?.guilty_user?.user_middlename} ${regulation?.guilty_user?.user_surname}`}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-[#48535B]">Holati</span>
              <Tag color="green" value={regulation?.regulation_status} />
            </div>
          </div>
        ))
      ) : (
        <NoItems />
      )}
    </div>
  )
}
