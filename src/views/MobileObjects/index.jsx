import DashboardIcon from '@mui/icons-material/Dashboard'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeWorkIcon from '@mui/icons-material/HomeWork'

import { Input, Tag } from '../../components'
import { useObject } from '../../services'
import { OBJECT_STATUS_ID_IN_PROGRESS } from '../../settings/constants'
import MobileSkleton from '../../components/MobileSkleton'
import { useSelector } from 'react-redux'
import NoItems from '../../components/NoItems'
import { MobileFilterHeader } from '../../components/FilterHeader/MobileFilterHeader'
import Search from '@mui/icons-material/Search'
import MobileTable from '../../components/MobileTableCard'
import phoneNumberFormatter from '../../utils/phoneNumberFormatter'

const UserField = ({ user }) => {
  return (
    <div className="flex flex-wrap bg-[#F6F6F6] rounded-md mt-3 p-3">
      <div className="flex items-center justify-between w-full">
        <div>
          <span className="text-[12px] text-[#48535B]">{user?.role_name}</span>
          <p className="text-[14px]">{user?.user_surname + ' ' + user?.user_name}</p>
        </div>
        <p className="text-primary text-sm sm:text-3">{phoneNumberFormatter(user?.phone)}</p>
      </div>
    </div>
  )
}

const MobileObjects = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { userId } = useSelector((state) => state.auth)

  const { objects } = useObject({
    user_id: userId,
    status_id: pathname.includes('archieve') ? 'be3623e7-78f5-48f6-8135-edf3731a838c' : undefined,
    objectsQueryProps: { enabled: true },
  })
  const dataInfo = {
    topEl: [
      {
        key: 'icon',
        title: 'icon',
        render: () => <HomeWorkIcon fontSize="large" color="primary" />,
      },
      {
        key: 'name',
        title: 'name',
        render: ({ name }) => (
          <p style={{ flexGrow: 1, marginLeft: 12 }} className="mobile-title-with-three-dots">
            {name}
          </p>
        ),
      },
    ],
    elements: [
      {
        key: 'users',
        render: ({ users }) => (
          <div className="flex w-full flex-col">
            {users.map((user) => (
              <UserField user={user} />
            ))}
          </div>
        ),
      },
      {
        key: 'address',
        render: ({ address }) => (
          <div className="flex w-full flex-col  bg-[#F6F6F6] my-3 rounded-md p-3  ">
            <p className="text-[12px] text-[#48535B]">Manzil</p>
            <p className="text-[14px]">{address}</p>
          </div>
        ),
      },
    ],
    bottomEl: [
      {
        key: 'holati',
        render: () => <p>Holati</p>,
      },
      {
        key: 'object_status_id',
        title: 'status',
        value: 'object_status'
      },
    ],
  }
  return (
    <div>
      <MobileFilterHeader
        leftElements={[<Input addonAfter={<Search color="primary" />} height={36} placeholder="Qidirish..." />]}
      />
      <div className="mobile-header-calc">
        <div className="p-4">
          {objects.isLoading ? (
            <MobileSkleton />
          ) : (
            <MobileTable
              data={objects.data.objects}
              dataInfo={dataInfo}
              linkParam="id"
              handleClick={(id) => navigate(id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileObjects
