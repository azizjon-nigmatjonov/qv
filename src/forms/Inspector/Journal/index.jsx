import React, { useState } from 'react'
import { PhotoUpload, Select } from '../../../components'
import ClearIcon from '@mui/icons-material/Clear'
import CustomQuill from '../../../components/CustomQuill'

export function JournalForm({ blocks, control, setValue, watch }) {
  const [text, setText] = useState('')

  return (
    <div className='bg-white rounded-md p-4 testClass'>
      <div className='border rounded-md p-6'>
        <p className='input-label'>Bajarilgan ish turi</p>
        <div className='mb-4'>
          <Select
            options={blocks?.map((item) => ({
              label: item.name,
              value: item.id,
              data: {
                ...item,
              },
            }))}
            isMulti
            name='blocks'
            control={control}
          />
        </div>
        <div className='mb-4'>
          <CustomQuill text={text} setText={setText} />
        </div>
        <div className='grid grid-cols-4 gap-3'>
          <div>
            <span className='input-label'>Foto</span>
            <PhotoUpload
              onChange={(value) =>
                setValue('object_images', [...watch('object_images'), value])
              }
            />
          </div>
          {watch('object_images')?.length > 0 && (
            <div>
              <span className='input-label'>
                Obyekt fotosuratlari 01.09.2021
              </span>
              <div className=''>
                {watch('object_images')?.map((item) => (
                  <div
                    key={item}
                    className='h-[88px] rounded-[8px] relative overflow-hidden'
                  >
                    <img
                      src={`${process.env.REACT_APP_CDN_IMAGE_URL}${item}`}
                      alt='inspector'
                      className='w-full h-full object-cover duration-700 transition-all scale-100 hover:scale-125'
                    />
                    <div
                      onClick={() =>
                        setValue(
                          'object_images',
                          watch('object_images')?.filter(
                            (filename) => filename !== item
                          )
                        )
                      }
                      className='cursor-pointer h-[20px] w-[20px] close-bg rounded-full flex items-center justify-center absolute top-[10px] right-[10px] transition-all scale-100 hover:scale-125'
                    >
                      <ClearIcon
                        style={{ fontSize: '12px' }}
                        className='text-white'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
