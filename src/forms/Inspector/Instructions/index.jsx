import { Popover } from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import { AddFile, AddIcon } from '../../../assets/icons'
import {
  BasicTable,
  BtnFiled,
  Card,
  Input,
  Tag,
  Textarea,
} from '../../../components'
import { regulationStatuses, violationStatuses } from '../../../settings/status'
import { useNavigate, useParams } from 'react-router-dom'
import dateFormatter from '../../../utils/dateFormatter'

export function InstructionsForm({
  register,
  regulationStatus,
  watch,
  setValue,
  setIsCreate,
  violations,
  disabled,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const { id, instruction_id } = useParams()
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
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : undefined
  return (
    <>
      <div>
        <div className='w-[50%]'>
          <Card
            title='Yozma ko’rsatma berish'
            rightElement={
              <Tag
                value={watch('regulation_status_id')?.status}
                color={
                  watch('regulation_status_id') &&
                  regulationStatuses.find(
                    (item) => item.id === watch('regulation_status_id').id
                  )?.color
                }
                onClick={(event) => {
                  setAnchorEl(event.currentTarget)
                }}
                className='cursor-pointer'
              />
            }
            bodyClassName='p-4'
          >
            <div className='mb-4'>
              <span className='input-label mb-[4px]'>Yopish muddati</span>
              <Input
                widthFull
                type='date'
                register={register}
                name='deadline'
                defaultValue='2022-05-11'
                disabled={disabled}
              />
            </div>
            <div>
              <span className='input-label mb-[4px]'>Izoh</span>
              <Textarea
                widthFull
                register={register}
                name='commentary'
                disabled={disabled}
                defaultValue='Bajarilgan ishlar bo’yicha yopiq ishlar dalolatnomalari hamda bajarilgan ishlar boyicha laboratioriya sinov hulosalari taqdim etilsin'
              />
            </div>
          </Card>
        </div>
        <Card
          className='mt-4'
          title='Qoidabuzarlik'
          rightElement={
            <BtnFiled
              color='blue'
              leftIcon={<AddIcon />}
              type='submit'
              onClick={() => {
                if (disabled) {
                  navigate(
                    `/inspectors/${id}/instructions/${instruction_id}/violation/add`
                  )
                } else {
                  setIsCreate(false)
                }
              }}
            >
              Qo’shish
            </BtnFiled>
          }
          bodyClassName='p-4 flex flex-col items-center justify-center'
        >
          {violations ? (
            <>
              <BasicTable
                headColumns={headData}
                isLoading={violations?.isLoading}
                bodyColumns={violations?.data?.violations}
                rowLink={`/inspectors/${id}/instructions/${instruction_id}/violation`}
              />
            </>
          ) : (
            <div className='min-h-[370px] flex items-center justify-center flex-col'>
              <AddFile />
              <p className='text-[16px] mt-[18px] text-[#6E7C87]'>
                Ma`lumotlar yo`q
              </p>
            </div>
          )}
        </Card>
      </div>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {regulationStatus?.map((item) => (
          <div
            key={item.id}
            className='text-[16px] font-medium py-2 px-4 hover:bg-gray-100 cursor-pointer'
            onClick={() => {
              setValue('regulation_status_id', item)
              handleClose()
            }}
          >
            {item.status}
          </div>
        ))}
      </Popover>
    </>
  )
}
