import { useParams } from 'react-router-dom'
import { BasicLayout, Header } from '../../../components'
import { useEffect, useMemo } from 'react'
import { useState } from 'react'
import NoDataPng from '../../../assets/images/no-data.png'
import { useField } from '../../../services'

const FieldsEdit = () => {
  const { id, type } = useParams()
  const { getObjectCategoryList } = useField({
    getObjectCategoryListParams: {
      type,
      sector_id: id,
    },
    categoryProps: {
      enabled: true,
    },
  })

  const objectCategoriesList = useMemo(() => {
    return getObjectCategoryList?.data?.data?.datas
  }, [getObjectCategoryList])
  console.log(getObjectCategoryList?.data)
  return (
    <div className="h-screen">
      <Header title={''} backLink={-1} />
      <div className="p-4">
        <BasicLayout>
          {objectCategoriesList?.length ? (
            <div className="border rounded-md mt-5">
              {objectCategoriesList?.map((item) => (
                <div
                  key={item.id}
                  className={`border-b py-3 px-4 text-sm leading-[22px] text-[#303940] cursor-pointer hover:bg-blue-50 duration-300`}
                >
                  {item.title}
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-md mt-5">
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
            </div>
          )}
        </BasicLayout>
      </div>
    </div>
  )
}

export default FieldsEdit
