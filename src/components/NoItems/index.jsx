import NoDataPng from '../../assets/images/no-data.png'

const NoItems = () => {
  return (
    <div className="text-center w-full text-[18px] font-[500] opacity-50 py-10 h-full flex flex-col justify-center items-center">
      <img className="mx-auto mb-5 pointer-events-none" width={200} src={NoDataPng} alt="Ma'lumot topilmadi" />
      <p>Malumotlar mavjud emas</p>
    </div>
  )
}

export default NoItems
