import { Today } from '@mui/icons-material'
import { ObjectMonitoringCard } from './ObjectMonitoringCard'
import NoDataPng from '../../assets/images/no-data.png'

export function ObjectMonitoring({ date = '', title = '', location, objects = [], isLoading, className, isForeman }) {
  const formattedDate = date.split('-')
  return (
    <div className={`p-3 bg-white rounded-[8px] grow max-w-[480px] ${className}`}>
      <div className="flex justify-between items-center">
        <p className="tablet:text-[16px] mobile:text-[15px] font-[600]">Monitoring o`tkaziladigan obyektlar</p>
        <div className="text-[14px] flex min-w-[143px] items-center gap-1 px-4 py-2 rounded-xl bg-[#F6F8F9]">
          <Today htmlColor="#6E8BB7" />
          <span className="text-[#6E8BB7] font-[500] tablet:font-[16px] mobile:font-[14px]">
            {formattedDate[0] ? formattedDate[0] : new Date().getDate()}.{formattedDate[1]}.{formattedDate[2]}
          </span>
        </div>
      </div>
      <div className={`flex flex-col ${!isForeman ? 'gap-y-4' : 'gap-y-2'} mt-3`}>
        {!isForeman
          ? objects?.map((object) => (
              <ObjectMonitoringCard key={object?.id} title={object?.name} location={object?.address} id={object?.id} />
            ))
          : objects?.map((object, index) => (
              <ObjectMonitoringCard
                key={index}
                title={object?.user_surname + ' ' + object?.user_name + ' ' + object?.user_middlename}
                subTitle={object?.role_name}
                phone={object?.phone}
                location={object?.address}
                isForeman={true}
                roleName={object?.role_name}
              />
            ))}
      </div>
      {objects?.length === 0 && (
        <div className="h-full  text-center w-full text-[18px] font-[500] opacity-50 py-10 mt-6">
          <img
            className="mx-auto mb-5 pointer-events-none mobile:w-[100px] tablet:w-[200px]"
            width={200}
            src={NoDataPng}
            alt="Ma'lumot topilmadi"
          />
          <p className="tablet:text-[18px] mobile:text-[16px]">Malumotlar mavjud emas</p>
        </div>
      )}
    </div>
  )
}
