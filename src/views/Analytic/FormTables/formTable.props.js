import { useMemo, useState } from 'react'
import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetFormTables } from '../../../services/basics/useGetForms'
import { tableHeadData1, tableHeadData2 } from '../data'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

export const useFormTableProps = () => {
  const navigate = useNavigate()
  const { formId } = useParams()
  const { regionId, isRepublic } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])

  const { state } = useLocation()

  function handleClickRow(form_id, category_id, sector_ids, region_id = !isRepublic && regionId, category_name) {
    if (!region_id) {
      navigate(
        {
          pathname: `table2/${form_id}`,
          search: `?${createSearchParams({ stateProgram: category_id, sector_ids: sector_ids.join(',') })}`,
        },
        { state: { formName: category_name || 'Formalar' } }
      )
    } else {
      navigate({
        pathname: `/analyst/objectlist/${formId}/${region_id}`,
        search: `?${createSearchParams({
          stateProgram: searchParamsMemo.stateProgram || category_id,
          sector_ids: searchParamsMemo.sector_ids || sector_ids,
        })}`,
      })
    }
  }
  const { getFormTableQuery, getFormTable2Query } = useGetFormTables({
    formTableProps: {
      enabled: !formId,
    },
    formTable2Props: {
      enabled: !!formId && isRepublic,
    },
    formTable2Params: {
      form_id: formId !== 'form2' ? formId : undefined,
      start_date: searchParamsMemo.startDate || '0001-01-01',
      end_date: searchParamsMemo.endDate || format(new Date(), 'yyyy-MM-dd'),
      category_id: searchParamsMemo.stateProgram || '',
      sector_ids: searchParamsMemo.sector_ids || '',
    },
    formTableParams: {
      start_date: searchParamsMemo.startDate || '0001-01-01',
      end_date: searchParamsMemo.endDate || format(new Date(), 'yyyy-MM-dd'),
      region_id: isRepublic ? '' : regionId,
    },
  })
  const data = useMemo(() => {
    return !formId ? getFormTableQuery : getFormTable2Query
  }, [getFormTable2Query, getFormTableQuery, formId])

  const headData = useMemo(() => {
    if (!!formId) {
      return tableHeadData2
    } else {
      return tableHeadData1
    }
  }, [formId])
  const f2Data = useMemo(
    () => ({
      form_id: 'form2',
      form_number: 2,
      category_id: 'not_null',
      sector_ids: ['not_null'],
      objects: {
        total: data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.total || 0), 0) || '----',
        planned: data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.planned || 0), 0) || '----',
        business: data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.business || 0), 0) || '----',
        registered: data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.registered || 0), 0) || '----',
        stopped: data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.stopped || 0), 0) || '----',
        monitorings: data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.monitorings || 0), 0) || '----',
      },
      given_regulations: {
        total: data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.total || 0), 0) || '----',
        authorship_supervisor:
          data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.authorship_supervisor || 0), 0) ||
          '----',
        internal_supervisor:
          data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.internal_supervisor || 0), 0) || '----',
        technical_supervisor:
          data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.technical_supervisor || 0), 0) ||
          '----',
      },
      completed_regulations: {
        total: data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.total || 0), 0) || '----',
        authorship_supervisor:
          data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.authorship_supervisor || 0), 0) ||
          '----',
        internal_supervisor:
          data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.internal_supervisor || 0), 0) || '----',
        technical_supervisor:
          data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.technical_supervisor || 0), 0) ||
          '----',
      },
    }),
    [data]
  )

  const footerColumns = useMemo(
    () => [
      {
        colSpan: 2,
        title: <span className="font-bold">Jami:</span>,
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.total || 0), 0) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.planned || 0), 0) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.business || 0), 0) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.registered || 0), 0) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.stopped || 0), 0) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.objects?.monitorings || 0), 0) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.total || 0), 0) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.authorship_supervisor || 0), 0) ||
              '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.internal_supervisor || 0), 0) ||
              '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.given_regulations?.technical_supervisor || 0), 0) ||
              '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.completed_regulations?.total || 0), 0) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce(
              (a, b) => a + (b?.completed_regulations?.authorship_supervisor || 0),
              0
            ) || '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.completed_regulations?.internal_supervisor || 0), 0) ||
              '----'}
          </span>
        ),
        align: 'justify-center',
      },
      {
        title: (
          <span className="font-bold">
            {data.data?.data?.results?.reduce((a, b) => a + (b?.completed_regulations?.technical_supervisor || 0), 0) ||
              '----'}
          </span>
        ),
        align: 'justify-center',
      },
    ],
    [data]
  )
  return {
    f2Data,
    data,
    headData,
    handleClickRow,
    footerColumns,
    title: state?.formName,
  }
}
