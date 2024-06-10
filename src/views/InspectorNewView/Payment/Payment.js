import { Add, Delete } from '@mui/icons-material'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { DollarIcon } from '../../../assets/icons/icons'
import { BasicTable, Header, Tabs, BasicLayout, Pagination, BtnFiled } from '../../../components'
import { useQuery } from '../../../hooks/useQuery'
import { useLabaratoryPayment } from '../../../services/labaratory/usePayment'
import { useObjectPayment } from '../../../services/useObjectPayments'
import dateFormatter from '../../../utils/dateFormatter'
import priceFormatter from '../../../utils/priceFormatter'
import EmptyDataImg from '../../../assets/images/PaymentEmpdtyDataImg.png'
import { IconButton } from '@mui/material'
import { permissions } from '../../../settings/permissions'
function DepartmentsV2() {
  const query = useQuery()
  const { pathname } = useLocation()
  const { roleId, userId } = useSelector((state) => state.auth)
 
  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const { t } = useTranslation('common')
  const { id } = useParams()

  const headData = [
    {
      title: '№',
      key: 'order',
    },
    {
      title: 'Sana',
      key: 'date_at',
      render: (item) => dateFormatter(format, item, 'dd.MM.yyyy'),
    },
    {
      title: 'Summa',
      key: 'amount',
      render: (item) => priceFormatter(item || 0),
    },
    permissions[roleId]?.includes('PAYMENT/DELETE')
      ? {
          title: '',
          key: 'id',
          width: 50,
          render: (item) => (
            <IconButton onClick={(e) => handleDeletePayment(item, e)} variant="outlined" color="error">
              <Delete />
            </IconButton>
          ),
        }
      : undefined,
  ]
  function handleDeletePayment(id, e) {
    e.stopPropagation()
    if (pathname.includes('labaratory')) {
      deleteLabaratoryPaymentMutation.mutate({ id, user_id: userId })
    } else {
      deletePaymentMutation.mutate({ id, user_id: userId })
    }
  }

  const { deletePaymentMutation } = useObjectPayment({
    deletePaymentMutationProps: {
      onSuccess: () => {
        objectPayments.refetch()
      },
    },
  })
  const { deletePaymentMutation: deleteLabaratoryPaymentMutation } = useLabaratoryPayment({
    deletePaymentMutationProps: {
      onSuccess: () => {
        labaratoryPayments.refetch()
      },
    },
  })
  const { objectPayments } = useObjectPayment({
    offset,
    limit,
    object_id: id,
    objectPaymentsParams: { enabled: !!id },
  })
  const { labaratoryPayments } = useLabaratoryPayment({
    limit,
    offset,
    contract_id: id,
    labaratoryPaymentsParams: { enabled: !!id && pathname.includes('labaratory') },
  })
  const applicationPrice = useMemo(() => {
    if (pathname.includes('inspectors')) {
      return priceFormatter(objectPayments?.data?.data?.total_price)
    }
    if (pathname.includes('labaratory')) {
      return priceFormatter(labaratoryPayments?.data?.data?.total_price)
    }
    return 0
  }, [pathname, objectPayments, labaratoryPayments])
  const applicationPaymentRest = useMemo(() => {
    if (pathname.includes('inspectors')) {
      return priceFormatter(objectPayments?.data?.data?.total_price - (objectPayments?.data?.data?.total_paid || 0))
    }
    if (pathname.includes('labaratory')) {
      return priceFormatter(
        labaratoryPayments?.data?.data?.total_price - (labaratoryPayments?.data?.data?.total_paid || 0)
      )
    }
    return 0
  }, [pathname, objectPayments, labaratoryPayments])
  const footerColumns = useMemo(() => {
    return [
      { title: '' },
      {
        render: () => <p className="text-[14px] font-bold">Jami</p>,
      },
      {
        render: () => (
          <p className="text-[14px] font-bold">
            {priceFormatter(
              pathname.includes('inspectors')
                ? objectPayments?.data?.data?.total_paid
                : labaratoryPayments?.data?.data?.total_paid
            )}
          </p>
        ),
      },
    ]
  }, [objectPayments, pathname, labaratoryPayments])
 
  return (
    <>
      <div className="h-screen">
        <div className="header-calc">
          <BasicLayout
            header={
              <div className="flex w-full justify-start p-4 pb-0 items-center">
                <div className="flex items-center gap-2">
                  <div className="text-[14px] text-[#6E8BB7] font-[400] flex items-center gap-2 bg-[#F4F6FA] py-[10px] px-[8px] rounded-md">
                    <span>
                      <DollarIcon color={'#6E8BB7'} />
                    </span>
                    Shartnoma summasi{' '}
                    <span className="font-bold text-black">
                      {applicationPrice} {t('sum')}
                    </span>
                  </div>
                  <div className="text-[14px] text-[#6E8BB7] font-[400] flex items-center gap-2 bg-[#F4F6FA] py-[10px] px-[8px] rounded-md">
                    <span>
                      <DollarIcon color={'#6E8BB7'} />
                    </span>
                    Qoldiq{' '}
                    <span className="font-bold text-black">
                      {applicationPaymentRest} {t('sum')}
                    </span>
                  </div>
                </div>
              </div>
            }
            footer={
              <Pagination
                count={objectPayments?.data?.data?.count}
                pageCount={limit}
                onChange={(pageNumber) => setOffset(pageNumber)}
                currentPage={offset}
                onChangeLimit={(limitNumber) => setLimit(limitNumber)}
                limit={limit}
              />
            }
          >
            <BasicTable
              rowLink={permissions[roleId].includes('PAYMENT/EDIT') && pathname}
              offset={offset}
              limit={limit}
              headColumns={headData}
              bodyColumns={
                objectPayments?.data?.data?.ObjectPayments || labaratoryPayments?.data?.data?.LabaratoryPayments
              }
              footerColumns={footerColumns}
              //   rowLink={}
              isLoading={objectPayments?.isLoading}
              emptyDataImage={EmptyDataImg}
            />
          </BasicLayout>
        </div>
      </div>
    </>
  )
}

export default DepartmentsV2
