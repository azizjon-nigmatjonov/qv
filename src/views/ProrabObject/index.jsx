import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

import { Tag } from '../../components'
import { statuses } from '../../settings/status'
import Instruction from '../../components/Instruction'
import UserCard from '../../components/UserCard'
import NoItems from '../../components/NoItems'

export default function ProrabObject({ bodyData, navigate }) {
  const data = bodyData ? bodyData[0] : {}

  const filterByPositionWrapper = () => {
    const types = []

    return (users, type) => {
      if (types.includes(type)) return
      types.push(type)
      return users?.filter((user) => user?.role_name?.toLowerCase() === type?.toLowerCase())
    }
  }

  const filterByPosition = filterByPositionWrapper()

  let filteredUsers = []

  data?.users?.forEach((user) => {
    filteredUsers.push(filterByPosition(data.users, user.role_name))
  })

  filteredUsers = filteredUsers.filter((user) => user)

  const regulations = [
    {
      color: 'black',
      count: data?.regulation?.given ?? 0,
      title: 'Berilgan',
    },
    {
      color: 'green',
      count: data?.regulation?.executed ?? 0,
      title: "Ijrosi ta'minlangan",
    },
    {
      color: 'red',
      count: data?.regulation?.expired ?? 0,
      title: "Muddati o'tgan",
    },
  ]

  return (
    <div>
      {bodyData ? (
        <div onClick={() => navigate(`${data?.id}`)} className="cursor-pointer">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-start gap-x-3">
              <div className='w-[48px]'>
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ color: '#fff', backgroundColor: '#0E73F6', width: '48px', height: '48px' }}
                >
                  <LocationOnOutlinedIcon />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium text-lg max-w-4xl" style={{ lineHeight: '26px' }}>
                  {data?.name}
                </p>
                <address className="not-italic text-sm">{data?.address}</address>
              </div>
            </div>
            <Tag
              value={data?.object_status}
              color={data.object_status_id ? statuses.find((item) => item.id === data.object_status_id)?.color : 'blue'}
            />
          </div>
          <h3 className="mb-2 font-semibold">Ma`sul xodimlar</h3>
          <div className="flex gap-4 mb-6 flex-wrap">
            {filteredUsers?.map((user) => (
              <UserCard key={user[0]?.user_id} position={user[0]?.role_name} usersInfo={[...user]} />
            ))}
          </div>
          <h3 className="mb-2 font-semibold">Yozma ko'rsatmalar</h3>
          <div className="flex gap-x-4">
            {regulations.map((regulation, index) => (
              <Instruction title={regulation.title} color={regulation.color} count={regulation.count} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  )
}
