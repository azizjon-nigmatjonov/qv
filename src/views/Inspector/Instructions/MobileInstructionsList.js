import { PenaltyIcon } from '../../../assets/icons'
import MobileTable from '../../../components/MobileTableCard'

const BasicList = ({ title, desc }) => (
  <div className="flex justify-between py-3">
    <span className="text-sm text-[#48535B]">{title}</span>
    <span className="text-[#1A2024] font-medium text-sm">{desc}</span>
  </div>
)

export const MobileInstructionsList = ({ data, activeTab }) => {
  const dataInfo = {
    topEl: [
      {
        key: 'icon',
        title: 'icon',
        render: (element) => {
          return (
            <div className="flex gap-x-3">
              <PenaltyIcon color="#367CF4" /> <span className="text-sm font-medium">{element?.regulation_number}</span>
            </div>
          )
        },
      },
    ],
    elements: [
      {
        key: 'violation_count',
        title: 'Qoidabuzarlik',
        render: (element) => <BasicList title="Qoidabuzarlik" desc={element?.violation_count} />,
      },
      {
        key: 'deadline',
        title: 'Tugash muddati',
        render: (element) => <BasicList title="Tugash muddati" desc={element?.deadline} />,
      },
      // {
      //   key: 'created_at',
      //   title: 'Yaratilgan sanasi',
      // },
      // {
      //   key: 'user',
      //   title: 'Inspektor',
      // },
      // {
      //   key: 'guilty_user',
      //   title: "Ma'sul xodimlar",
      // },
      // {
      //   key: 'act_status',
      //   title: "O'zgarish",
      // },
      // {
      //   key: 'regulation_status_id',
      //   title: 'Holati',
      // },
    ],
  }
  return <MobileTable dataInfo={dataInfo} data={data} />
}
