import { CancelIcon, PenaltyIcon, PersonIcon } from '../../../assets/icons'
import {
  BasicLayout,
  BasicTable,
  Tag,
  Card,
  BtnOutlined,
  BtnFiled,
  Textarea,
} from '../../../components'
import CheckIcon from '@mui/icons-material/Check'
import { format } from 'date-fns'
import { regulationStatuses, violationStatuses } from '../../../settings/status'
import dateFormatter from '../../../utils/dateFormatter'

export function RegulationViewForm({
  register,
  errors,
  violations,
  statusId,
  objectId,
  instructionId,
  onSubmit,
  getValues,
  statusLogs,
}) {
  const status = regulationStatuses.find((item) => item.id === statusId)
  const positions = [
    'Inspektor',
    'Texnik nazoratchi',
    'Mualliflik nazorati',
    'Ichki nazoratchi',
  ]
  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Aniqlangan qoidabuzarlik',
      key: 'title',
    },
    {
      title: 'Blok',
      key: 'blocks',
      render: (blocks) => (
        <div className='flex flex-col gap-2'>
          {blocks?.map((item) => (
            <div
              key={item.id}
              className='bg-blue-tag_bg_color p-1 text-center rounded-[6px] text-[14px] text-primary font-medium'
            >
              {item.name}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Muddat',
      key: 'deadline',
      render: (value) => value && dateFormatter(format,new Date(value), 'dd.MM.yyyy'),
    },
    {
      title: 'Ma`sul xodim',
      key: 'person_name',
    },
    {
      title: 'Fotosuratlar',
      key: ['images', 'fixed_images'],
      render: ([images, fixedImages]) => {
        let photos = []
        if (images) {
          photos = [...images]
        }
        if (fixedImages) {
          photos = [...photos, ...fixedImages]
        }
        return (
          <div className='grid grid-cols-2 gap-1 rounded-[8px] overflow-hidden'>
            {photos?.map((item) => (
              <div key={item}>
                <img
                  src={`${process.env.REACT_APP_CDN_IMAGE_URL}${item}`}
                  alt='inspector'
                  className='w-full h-[40px] object-cover'
                />
              </div>
            ))}
          </div>
        )
      },
    },
    {
      title: 'Holati',
      key: 'status_id',
      render: (value) => {
        const status = violationStatuses.find((item) => item.id === value)
        return <Tag color={status.color} value={status.status} />
      },
    },
  ]

  return (
    <div>
      <div className='w-[90%] p-4 bg-white rounded-[6px]'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center'>
            <div className='w-[48px] h-[48px] rounded-full bg-primary flex items-center justify-center'>
              <PenaltyIcon color='#fff' />
            </div>
            <div className='flex flex-col ml-3'>
              <p className='text-[20px] font-[600] text-[#1A2024]'>
                Yozma ko’rsatma
              </p>
              <div className='flex items-center'>
                <p className='text-[14px]'>01.02.2022- 10.02.2022 </p>
                <p className='text-primary text-[14px] ml-3'>
                  Muddatni uzaytirish
                </p>
              </div>
            </div>
          </div>
          <div>
            <Tag color={status?.color} value={status?.status} />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 mt-4'>
          <div className='col-span-5'>
            <p className='text-[14px] text-[#000] leading-[24px] font-[600] mb-2'>
              Ko’rsatma beruvchi
            </p>
            <div className='flex items-center justify-between px-4 py-3 bg-[#F6F6F6] rounded-[8px] h-[64px]'>
              <div>
                <p className='text-[12px] text-[#48535B] leading-[18px]'>
                  Inspektor
                </p>
                <p className='text-[14px] text-[#000] leading-[24px]'>
                  Rustamov Usmon
                </p>
              </div>
              <p className='text-[14px] text-primary leading-[24px]'>
                +998 (90) 123-45-67
              </p>
            </div>
          </div>
          <div className='col-span-7 '>
            <p className='text-[14px] text-[#000] leading-[24px] font-[600] mb-2'>
              Obyekt
            </p>
            <div className='text-[14px] h-[64px] overflow-y-auto leading-[24px] text-black px-4 py-3 bg-[#F6F6F6] rounded-[8px]'>
              Dexqonobod tumani "Qorashina" shaxarchasini obodonlashtirish
              (sayilgox, piyodalar va velosiped yo‘laklarini qurish)
            </div>
          </div>
          <div className='col-span-12'>
            <p className='text-[14px] text-[#000] leading-[24px] font-[600] mb-2'>
              Ma`sul xodimlar
            </p>
            <div className='grid grid-cols-3 gap-4'>
              <div className='px-4 py-3 border border-borderColor rounded-[8px]'>
                <p className='leading-[24px] text-[16px] font-[600] mb-4'>
                  Texnik nazoratchi
                </p>
                <div className='grid grid-cols-12'>
                  <div className='flex items-center pr-3 border-r border-borderColor col-span-7'>
                    <div className='min-w-[36px] h-[36px] rounded-full bg-[#E0EEFF] flex items-center justify-center'>
                      <PersonIcon />
                    </div>
                    <div className='ml-2'>
                      <p className='text-[14px] leading-[20px] text-[#000]'>
                        Aliyev Valijon
                      </p>
                      <p className='text-[12px] leading-[18px] mt-[2px] text-primary'>
                        +998 (90) 123-45-67
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center pl-3 col-span-5'>
                    <div className='min-w-[36px] h-[36px] rounded-full bg-[#E0EEFF] flex items-center justify-center'>
                      <PenaltyIcon />
                    </div>
                    <div className='ml-2'>
                      <p className='text-[12px] leading-[18px] text-[#48535B]'>
                        Ko`rsatma
                      </p>
                      <p className='text-[12px] leading-[18px] mt-[2px] text-[#000000]'>
                        112233-001/1
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 border border-borderColor rounded-[8px]'>
                <p className='leading-[24px] text-[16px] font-[600] mb-4'>
                  Loyihachi
                </p>
                <div className='grid grid-cols-12'>
                  <div className='flex items-center pr-3 border-r border-borderColor col-span-7'>
                    <div className='min-w-[36px] h-[36px] rounded-full bg-[#E0EEFF] flex items-center justify-center'>
                      <PersonIcon />
                    </div>
                    <div className='ml-2'>
                      <p className='text-[14px] leading-[20px] text-[#000]'>
                        Aliyev Valijon
                      </p>
                      <p className='text-[12px] leading-[18px] mt-[2px] text-primary'>
                        +998 (90) 123-45-67
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center pl-3 col-span-5'>
                    <div className='min-w-[36px] h-[36px] rounded-full bg-[#E0EEFF] flex items-center justify-center'>
                      <PenaltyIcon />
                    </div>
                    <div className='ml-2'>
                      <p className='text-[12px] leading-[18px] text-[#48535B]'>
                        Ko`rsatma
                      </p>
                      <p className='text-[12px] leading-[18px] mt-[2px] text-[#000000]'>
                        112233-001/1
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card title='Izohlar' className='mt-4'>
        <div className='grid grid-cols-12 gap-4'>
          {statusLogs?.map((item, index) => (
            <div className='col-span-6' key={item.id}>
              <div className='flex items-center justify-between px-4 py-3 bg-[#F6F6F6] rounded-[8px] h-[64px]'>
                <div>
                  <p className='text-[12px] text-[#48535B] leading-[18px]'>
                    {positions[index]}
                  </p>
                  <p className='text-[14px] text-[#000] leading-[24px]'>
                    {item.user?.name}
                  </p>
                </div>
                <p className='text-[14px] text-primary leading-[24px]'>
                  {item.user?.phone}
                </p>
              </div>
              <div className='col-span-6 mt-4 h-[104px] px-4 py-2 border border-borderColor rounded-[6px] bg-[#F6F8F9] text-[14px]'>
                {item?.comment}
              </div>
            </div>
          ))}
          {/* <div className='col-span-6'>
            <div className='flex items-center justify-between px-4 py-3 bg-[#F6F6F6] rounded-[8px] h-[64px]'>
              <div>
                <p className='text-[12px] text-[#48535B] leading-[18px]'>
                  Inspektor
                </p>
                <p className='text-[14px] text-[#000] leading-[24px]'>
                  Rustamov Usmon
                </p>
              </div>
              <p className='text-[14px] text-primary leading-[24px]'>
                +998 (90) 123-45-67
              </p>
            </div>
          </div> */}
          {/* <div className='col-span-6 h-[104px] px-4 py-2 border border-borderColor rounded-[6px] bg-[#F6F8F9] text-[14px]'>
            Bajarilgan ishlar bo’yicha yopiq ishlar dalolatnomalari hamda
            bajarilgan ishlar boyicha laboratioriya sinov hulosalari taqdim
            etilsin
          </div>
          <div className='col-span-6 h-[104px] px-4 py-2 border border-borderColor rounded-[6px] bg-[#F6F8F9] text-[14px]'>
            Bajarilgan ishlar bo’yicha yopiq ishlar dalolatnomalari hamda
            bajarilgan ishlar boyicha laboratioriya sinov hulosalari taqdim
            etilsin
          </div> */}
        </div>
      </Card>

      <BasicLayout
        className='mt-4'
        footer={
          <div className='flex justify-end gap-4'>
            <BtnOutlined leftIcon={<CancelIcon />} color='red' type='submit'>
              Rad etish
            </BtnOutlined>
            <BtnFiled
              color='blue'
              onClick={() =>
                onSubmit({
                  commentary: getValues('commentary'),
                  confirm: true,
                })
              }
              leftIcon={<CheckIcon className='text-white' fontSize='small' />}
              disabled={!violations?.data?.violations}
            >
              Tasdiqlash
            </BtnFiled>
          </div>
        }
      >
        <BasicTable
          headColumns={headData}
          isLoading={violations?.isLoading}
          bodyColumns={violations?.data?.violations}
          rowLink={`/inspectors/${objectId}/instructions/${instructionId}/violation`}
        />
      </BasicLayout>
      <Card title='Izoh' className='mt-4 w-[70%]'>
        <Textarea
          widthFull
          register={register}
          name='commentary'
          errors={errors}
          // defaultValue='Bajarilgan ishlar bo’yicha yopiq ishlar dalolatnomalari hamda bajarilgan ishlar boyicha laboratioriya sinov hulosalari taqdim etilsin'
        />
      </Card>
    </div>
  )
}
