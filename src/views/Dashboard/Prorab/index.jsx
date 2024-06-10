import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BasicLayout, MuiTabs } from '../../../components'
import { useObject } from '../../../services'
import {
  ICHKI_NAZORATCHI_ROLE_ID,
  INSPEKTOR_BOSH_ROLE_ID,
  INSPEKTOR_YETAKCHI_ROLE_ID,
  INSPEKTOR_PRASTOY_ROLE_ID,
} from '../../../settings/constants'
import './index.scss'

const WorkProgressGraph = () => (
  <div>
    <table>
      <thead>
        <tr>
          <th colSpan={3} className="py-3 px-4 w-2/5">
            Ishning boshlanish sanasi
          </th>
          <th colSpan={12} className="py-3 px-4">
            2022 - yil
          </th>
        </tr>
        <tr>
          <th rowSpan={2} className="py-3 px-4">
            №
          </th>
          <th rowSpan={2}>Bajariladigan ish</th>
          <th rowSpan={2}>Ishlar soni</th>
          <th colSpan={4}>Yanvar</th>
          <th colSpan={4}>Fevral</th>
          <th colSpan={4}>Mart</th>
        </tr>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
            <input type="text" placeholder="Yer ishlari" className="w-full" />
          </td>
          <td>
            <input type="text" placeholder="104" className="w-full" />
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td colSpan={2} className="font-semibold px-4 py-3">
            Итого
          </td>
          <td className="font-semibold px-4 py-3">385</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default function ProrabDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const { userId } = useSelector((state) => state.auth)

  const { objects } = useObject({
    limit: 1,
    user_id: userId,
    objectsQueryProps: {
      enabled: !!userId,
    },
  })

  const inspectors = [INSPEKTOR_YETAKCHI_ROLE_ID, INSPEKTOR_PRASTOY_ROLE_ID, INSPEKTOR_BOSH_ROLE_ID]

  const users = objects.data?.objects?.[0]?.users?.filter((user) => {
    return user.role_id === ICHKI_NAZORATCHI_ROLE_ID || inspectors.includes(user.role_id)
  })
  const tabElements = [
    {
      title: 'Grafik',
      key: 'graph',
      component: <WorkProgressGraph />,
    },
    {
      title: 'Grafik tarixi',
      key: 'graph-history',
      component: <WorkProgressGraph />,
    },
  ]

  return (
    <div className="col-span-12">
      <div className="flex gap-4 bg-white rounded-md w-2/3 p-3 mb-4">
        {users?.map((user) => (
          <div key={user.user_id} className="bg-[#F6F6F6] p-3 flex justify-between items-center rounded-md w-1/2">
            <div>
              <p className="text-xs text-[#48535B]">{user.role_name}</p>
              <p className="text-sm leading-6">{user.user_name}</p>
              <p className="text-sm leading-6">{user.user_surname}</p>
            </div>
            <div className="text-xs text-[#0E73F6]">{user.phone}</div>
          </div>
        ))}
      </div>
      <BasicLayout className="p-0" header={<MuiTabs elements={tabElements} setActiveTab={setActiveTab} />} />
    </div>
  )
}
