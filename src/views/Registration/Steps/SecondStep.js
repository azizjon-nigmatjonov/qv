import { RightArrowIcon } from '../../../assets/icons'
import { BtnFiled, Card, Input } from '../../../components'
import CustomMap from '../../../components/CustomMap'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useLocation } from 'react-router-dom'
import fileDownloader from '../../../utils/fileDownloader'
import { useDocument } from '../../../services'

const SecondStep = ({ register, scrollToNext, setError, getValues, scrollToPrev, isLinear, errors }) => {
  const { pathname } = useLocation()
  const { expertizaFileQuery } = useDocument({
    expertizaNum: getValues('positive_opinion_number')?.includes('№')
      ? getValues('positive_opinion_number')?.split('№ ')[1]
      : getValues('positive_opinion_number'),
    expertizaFileProps: {
      enabled: !!getValues('positive_opinion_number'),
      onSuccess: (res) => {
        if (!res) {
          setError('positive_opinion_number', {
            type: 'custom',
            message: 'Ushbu ekspertiza raqami Davlat Ekspertiza organing reesterida topilmagan',
          })
        }
      },
      onError: (res) => {
        setError('positive_opinion_number', {
          type: 'custom',
          message: 'Ushbu ekspertiza raqami Davlat Ekspertiza organing reesterida topilmagan',
        })
      },
    },
  })
  return (
    <div className="w-full">
      <Card title="Obyekt to'g'risidagi ma'lumotlar" className="w-1/2">
        <span className="input-label">Obyektning nomi</span>
        {/* <Input disabled widthFull register={register} name="name_building" /> */}
        <textarea
          disabled
          rows={4}
          className="border not-resizable p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary "
          {...register('name_building')}
        />
        {!isLinear && (
          <>
            <span className="input-label mt-4">Kadastr raqami</span>
            <Input disabled widthFull register={register} name="cadastral_number" />

            <span className="input-label mt-4">Ko'chmas mulk turi</span>
            <Input disabled widthFull register={register} name="tip_object" />
            <span className="input-label mt-4">Ko'chmas mulk ko'rinishi</span>
            <Input disabled widthFull register={register} name="vid_object" />
          </>
        )}
        <span className="input-label mt-4">Obyektning joylashuvi</span>
        {/* <Input disabled widthFull register={register} name="location_building" /> */}
        <textarea
          disabled
          rows={2}
          className="border not-resizable p-3 w-full flex items-center border-borderColor hover:border-primary transition-all duration-500 rounded-[6px] focus-within:border-primary"
          {...register('location_building')}
        />
        <span className="input-label mt-4">Viloyat</span>
        <Input disabled widthFull register={register} name={`${isLinear ? 'region_uz_name' : 'region_id'}`} />
        <span className="input-label mt-4">Tuman</span>
        <Input disabled widthFull register={register} name={`${isLinear ? 'district_uz_name' : 'district_id'}`} />
        <span className="input-label mt-4">Xarita</span>
        <CustomMap />
        <span className="input-label mt-4">Obyektning murakkablik toifasi</span>
        <Input disabled widthFull register={register} name="category_object_dictionary" />
        <span className="input-label mt-4">Qurilish-montaj ishlari turi</span>
        <Input disabled widthFull register={register} name="construction_works" />
        {!isLinear && (
          <>
            <span className="input-label mt-4">Arxitektura-shaharsozlik kengashi bayonnomasining raqami</span>
            <Input disabled widthFull register={register} name="number_protocol" />
            <span className="input-label mt-4">Arxitektura-shaharsozlik kengashi bayonnomasining sanasi</span>
            <Input disabled widthFull register={register} name="date_protocol" />
          </>
        )}
        <span className="input-label mt-4">
          Qurilish-montaj ishlarining narxi: yig'ma ekspert xulosasiga muvofiq (QQS, asbob-uskunalar va mijozning boshqa
          xarajatlarisiz)
        </span>
        <Input disabled widthFull register={register} name="cost" />
        <span className="input-label mt-4">
          Parallel loyihalash obyektlari uchun(hukumat qarori, protokol, farmon, qaror raqami)
        </span>
        <Input disabled widthFull register={register} name="object_parallel_design_number" />
        <span className="input-label mt-4">
          Parallel loyihalash obyektlari uchun(hukumat qarori, protokol, farmon, qaror sanasi)
        </span>
        <Input disabled widthFull register={register} name="object_parallel_design_date" />
        <span className="input-label mt-4">
          Davlat dasturi obyektlari bo'yicha(hukumat qarori, protokol, farmon, qaror raqami)
        </span>
        <Input disabled widthFull register={register} name="object_state_program_number" />
        <span className="input-label mt-4">
          Davlat dasturi obyektlari bo'yicha(hukumat qarori, protokol, farmon, qaror sanasi)
        </span>
        <Input disabled widthFull register={register} name="object_state_program_date" />
        <span className="input-label mt-4">Ekspertiza organining nomi</span>
        <Input disabled widthFull register={register} name="name_expertise" />
        <span className="input-label mt-4">Davlat ekspertiza organining ijobiy xulosa raqami</span>
        <div className={`${!!expertizaFileQuery.data ? 'flex gap-3' : ''}`}>
          <Input disabled widthFull register={register} name="positive_opinion_number" />
          {!!expertizaFileQuery.data && (
            <BtnFiled
              onClick={() =>
                fileDownloader(
                  `https://ekspertiza.mc.uz/ru/objects/pdf?id=${
                    getValues('positive_opinion_number')?.includes('№')
                      ? getValues('positive_opinion_number')?.split('№ ')[1]
                      : getValues('positive_opinion_number')
                  }`,
                  true
                )
              }
            >
              Tekshirish
            </BtnFiled>
          )}
        </div>
        <span className="input-label mt-4">Davlat ekspertiza organining ijobiy xulosa sanasi</span>
        <Input disabled widthFull register={register} name="positive_opinion_date" />
        <span className="input-label mt-4">
          Qurilish-montaj ishlarining ayrim litsenziyalanadigan turlarini amalga oshirishda-pudrat tashkilotining
          litsenziya raqami
        </span>
        <Input disabled widthFull register={register} name="contractor_license_number" />
        <span className="input-label mt-4">
          Qurilish-montaj ishlarining ayrim litsenziyalanadigan turlarini amalga oshirishda-pudrat tashkilotining
          litsenziya sanasi
        </span>
        <Input disabled widthFull register={register} name="contractor_license_date" />
        <span className="input-label mt-4">
          Xavfli ishlab chiqarish ob'ektlarining loyiha hujjatlarining sanoat xavfsizligi bo'yicha ekspertiza
          organlarining ijobiy xulosasining raqami
        </span>
        <Input disabled widthFull register={register} name="industrial_security_number" />
        <span className="input-label mt-4">
          Xavfli ishlab chiqarish ob'ektlarining loyiha hujjatlarining sanoat xavfsizligi bo'yicha ekspertiza
          organlarining ijobiy xulosasining sanasi
        </span>
        <Input disabled widthFull register={register} name="industrial_security_date" />
        <div className="flex justify-between mt-4">
          <BtnFiled leftIcon={<ArrowBackIcon fontSize="small" />} onClick={scrollToPrev}>
            Oldingisi
          </BtnFiled>
          <BtnFiled rightIcon={<RightArrowIcon className="mb-1" color="white" />} onClick={scrollToNext}>
            Keyingisi
          </BtnFiled>
        </div>
      </Card>
    </div>
  )
}

export default SecondStep
