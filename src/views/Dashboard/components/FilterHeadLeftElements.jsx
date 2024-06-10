import ReactSelect, { components } from 'react-select'
import { useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useField } from '../../../services'
import { useEffect } from 'react'

const Control = ({ children, ...props }) => <components.Control {...props}>{children}</components.Control>
const style = {
  control: (base) => ({
    ...base,
    maxWidth: 250,
    minWidth: 250,
    border: 0,
    paddingLeft: '4px',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
}

export default function FilterHeaderLeftElements() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const { objectType } = searchParamsMemo
  const [type, setType] = useState('')

  const { pathname } = useLocation()
  const { getObjectCategoryList, getObjectSectorList } = useField({
    getObjectCategoryListParams: {
      type,
      category: searchParamsMemo?.stateProgram,
    },
    getObjectSectorListParams: {
      type,
      category: searchParamsMemo.sector,
    },
    sectorProps: {
      enabled: true,
    },
    categoryProps: {
      enabled: !!searchParamsMemo.stateProgram,
    },
  })

  useEffect(() => {
    if (objectType == 1) {
      setType('b971a882-963d-4a28-a9cd-4b8daf4e792a') //davlat obyektlari
    } else if (objectType == 2) {
      setType('41cade7c-c473-4922-8952-52787ba56a25') //tadbirkorlik obyektlari
    } else {
      setType(undefined)
    }
  }, [objectType])

  const changeStateProgramHandler = (e, action) => {
    let { stateProgram, sector, ...params } = searchParamsMemo
    if (action === 'clear') {
      setSearchParams(params)
    } else {
      setSearchParams({ ...params, stateProgram: e.value })
    }
  }
  const changeSectorHandler = (e, action) => {
    let { sector, ...params } = searchParamsMemo
    if (action === 'clear') {
      setSearchParams(params)
    } else {
      setSearchParams({ ...searchParamsMemo, sector: e.value })
    }
  }
  const changeDifficulityHandler = (e, action) => {
    let { difficulity, ...params } = searchParamsMemo
    if (action === 'clear') {
      setSearchParams(params)
    } else {
      setSearchParams({ ...searchParamsMemo, difficulity: e.value })
    }
  }
  const objectSector = useMemo(() => {
    return getObjectSectorList?.data?.datas ?? []
  }, [getObjectSectorList])

  const objectCategoriesList = useMemo(() => {
    return getObjectCategoryList?.data?.data?.datas
  }, [getObjectCategoryList?.data?.data?.datas])
  const difficulities = useMemo(() => {
    return [
      { label: 'I', value: 'dfcc471f-2d3e-4258-93a9-b9893668e827' },
      { label: 'II', value: 'e8c76645-3e36-4e53-9867-e0b981f065e6' },
      { label: 'III', value: '9b54fb13-a7d4-4b7c-8ca3-c876c2cedb1a' },
      { label: 'IV', value: '00e3b087-214f-4e11-8399-62dccc3e145b' },
    ]
  }, [])
  return (
    <div className="flex gap-4">
      <ReactSelect
        className="border rounded"
        options={objectSector?.map((item) => ({ label: item.title, value: item?.id }))}
        value={
          searchParamsMemo.stateProgram
            ? objectSector
                ?.map((item) => ({ label: item.title, value: item?.id }))
                ?.filter((option) => option?.value === searchParamsMemo.stateProgram).length
              ? objectSector
                  ?.map((item) => ({ label: item.title, value: item?.id }))
                  ?.filter((option) => option?.value === searchParamsMemo.stateProgram)
              : objectSector
                  ?.map((item) => ({ label: item.title, value: item?.id }))
                  ?.filter((option) => option?.value === searchParamsMemo.stateProgram)
            : ''
        }
        onChange={(e, { action }) => {
          changeStateProgramHandler(e, action)
        }}
        isMulti={false}
        isSearchable={false}
        isClearable={true}
        placeholder="Davlat dasturlari"
        components={{ Control }}
        styles={style}
      />
      <ReactSelect
        className="border rounded"
        options={objectCategoriesList?.map((item) => ({ label: item.title, value: item?.id }))}
        value={
          searchParamsMemo?.sector
            ? objectCategoriesList
                ?.map((item) => ({ label: item.title, value: item?.id }))
                ?.filter((option) => option?.value === searchParamsMemo?.sector).length
              ? objectCategoriesList
                  ?.map((item) => ({ label: item.title, value: item?.id }))
                  ?.filter((option) => option?.value === searchParamsMemo?.sector)
              : objectCategoriesList
                  ?.map((item) => ({ label: item.title, value: item?.id }))
                  ?.filter((option) => option?.value === searchParamsMemo?.sector)
            : ''
        }
        onChange={(e, { action }) => {
          changeSectorHandler(e, action)
        }}
        isMulti={false}
        isSearchable={false}
        isClearable={true}
        placeholder="Sohalar"
        components={{ Control }}
        styles={style}
      />
      {!pathname.startsWith('/dashboard-republic/users') && (
        <ReactSelect
          className="border rounded"
          options={difficulities}
          value={difficulities.filter((option) => option?.value === searchParamsMemo.difficulity)}
          onChange={(e, { action }) => {
            changeDifficulityHandler(e, action)
          }}
          isMulti={false}
          isSearchable={false}
          isClearable={true}
          placeholder="Murakkablik toifalari"
          components={{ Control }}
          styles={style}
        />
      )}
    </div>
  )
}
