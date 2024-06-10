import { useNavigate } from 'react-router-dom'
import Renderer from './renderer'
import NoDataPng from '../../assets/images/no-data.png'

export default function MobileTable({
  navigateLink = '',
  isLoading = false,
  data = [],
  dataInfo = {},
  handleClick = () => {},
  emptyDataImage = NoDataPng,
  emptyDataText = 'Ma`lumot mavjud emas',
  linkParam = '',
}) {
  const { navigate } = useNavigate()
  return data.map((element, index) => (
    <div
      className={`p-3 bg-white rounded-md mb-3`}
      key={element.id}
      onClick={() => {
        !linkParam ? navigate(navigateLink) : handleClick(element[linkParam])
      }}
    >
      {dataInfo.topEl && (
        <div className="flex justify-between items-center border-b p-3 pb-4 ">
          {dataInfo?.topEl?.map((item, index) => (
            <Renderer item={item} element={element} key={index} />
          ))}
        </div>
      )}
      {dataInfo.elements && (
        <div>
          {dataInfo?.elements?.map((item, index) => (
            <Renderer item={item} element={element} key={index} />
          ))}
        </div>
      )}
      {dataInfo.bottomEl && (
        <div className="flex justify-between gap-3 p-3 pt-4 items-center border-t">
          {dataInfo?.bottomEl?.map((item, index) => (
            <Renderer item={item} element={element} key={index} />
          ))}
        </div>
      )}
      {!isLoading && data.length === 0 && (
        <div className="h-full  text-center w-full text-[18px] font-[500] opacity-50 py-10">
          <img className="mx-auto mb-5 pointer-events-none" width={200} src={emptyDataImage} alt="Ma'lumot topilmadi" />
          <p>Malumotlar mavjud emas</p>
        </div>
      )}
    </div>
  ))
}

//infos = {topEl: [{key: 'title', render: ()=> {},  }]}
