import { useNavigate } from 'react-router-dom'

import { BasicLayout, BtnFiled, Header } from '../../../components'
import MobileSkleton from '../../../components/MobileSkleton'
import { useClient } from '../../../services'
import { useRole } from '../../../services/useRole'
import { SaveIcon } from '../../../assets/icons'
import NoDataPng from '../../../assets/images/no-data.png'

const RolesList = () => {
  const navigate = useNavigate()

  const { clients } = useClient({
    limit: 0,
    user_type_id: 'b2ae4fc3-fd18-41f8-9d39-371ea09035d8',
    clientsProps: { enabled: true },
  })

  const { roles } = useRole({ offset: 1, limit: 100 })

  return (
    <div className="h-screen">
      <Header
        title="Rollar"
        rightElement={
          <BtnFiled color="blue" onClick={() => navigate('add')} leftIcon={<SaveIcon />}>
            Qo'shish
          </BtnFiled>
        }
      />
      <div className="sidebar-header-calc">
        <BasicLayout>
          <div className="border rounded-md">
            {clients.isLoading && roles.isLoading ? (
              <MobileSkleton />
            ) : clients.data?.client_types?.length ? (
              clients.data?.client_types?.map((client) => (
                <div key={client.id}>
                  <div className="bg-[#F4F6FA] text-[#1A2024] border-b py-3 px-4 text-sm leading-[22px] font-semibold">
                    {client.name}
                  </div>
                  <div>
                    {roles.data?.roles
                      ?.filter((role) => role.client_type_id === client.id)
                      ?.map((role, index) => (
                        <div
                          onClick={() => navigate(role.id)}
                          key={role.id}
                          className={`${
                            roles.data?.roles?.length - 1 === index ? '' : 'border-b'
                          } py-3 px-4 text-sm leading-[22px] text-[#303940] cursor-pointer hover:bg-blue-50 duration-300`}
                        >
                          {role.name}
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full text-center flex justify-center items-center w-full text-[18px] font-[500] opacity-50 py-10">
                <div>
                  <img
                    className="mx-auto mb-5 pointer-events-none"
                    width={200}
                    src={NoDataPng}
                    alt="Ma'lumot topilmadi"
                  />
                  <p>Malumotlar mavjud emas</p>
                </div>
              </div>
            )}
          </div>
        </BasicLayout>
      </div>
    </div>
  )
}

export default RolesList
