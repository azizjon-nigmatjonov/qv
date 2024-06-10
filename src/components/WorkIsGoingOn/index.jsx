import ConstructionIcon from '@mui/icons-material/Construction'

export default function WorkIsGoingOn() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black  opacity-50 z-[100]"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[101] ">
        <div className="flex flex-col items-center">
          <ConstructionIcon htmlColor="white" size="large" sx={{ width: 150, height: 150 }} />
          <h1 className="text-white text-[38px] font-bold">
            Sahifada profilaktika ishlari olib borilmoqda!
          </h1>
        </div>
      </div>
    </>
  )
}
