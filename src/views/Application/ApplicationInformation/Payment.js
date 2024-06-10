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
import {
  BUHGALTERIYA_BOSH_ROLE_ID,
  BUHGALTERIYA_YETAKCHI_ROLE_ID,
  BUXGALTER_ROLE_ID,
} from '../../../settings/constants'
import dateFormatter from '../../../utils/dateFormatter'
import priceFormatter from '../../../utils/priceFormatter'
import EmptyDataImg from '../../../assets/images/PaymentEmpdtyDataImg.png'
import { IconButton } from '@mui/material'
import { permissions } from '../../../settings/permissions'
import { useObject } from '../../../services'
function Departments() {
  const query = useQuery()
  const { pathname } = useLocation()
  const { roleId, userId } = useSelector((state) => state.auth)
  const shouldShowHeader = !pathname.includes('labaratory')
  const context = useOutletContext()
  const [control, register, reset, setValue, contractByIdQuery, setRightElement] = context ?? []
  const isBuhgalteriya = roleId === BUHGALTERIYA_BOSH_ROLE_ID || roleId === BUHGALTERIYA_YETAKCHI_ROLE_ID

  const [offset, setOffset] = useState(+query.get('offset') || 1)
  const [limit, setLimit] = useState(+query.get('limit') || 10)
  const { t } = useTranslation('common')
  const { id } = useParams()
  const navigate = useNavigate()

  const { object } = useObject({
    id,
  })

  const tabLinks =
    shouldShowHeader && isBuhgalteriya
      ? [
          {
            key: 'all_info',
            title: t('overall.infos'),
            path: `/inspectors/${id}`,
          },
          {
            key: 'payment',
            title: t('payments'),
            path: pathname,
          },
        ]
      : [
          {
            key: 'main-info',
            title: "Asosiy ma'lumotlar",
            path: `/inspectors/${id}`,
          },
          {
            key: 'docs',
            title: 'Hujjatlar',
            path: `/inspectors/${id}/documents`,
          },
          {
            key: 'monitoring',
            title: 'Monitoring',
            path: `/inspectors/${id}/monitoring`,
          },
          {
            key: 'instructions',
            title: "Yozma ko'rsatmalar",
            path: `/inspectors/${id}/instructions`,
          },
          {
            key: 'journal',
            title: 'Ijro hujjatlari',
            path: `/inspectors/${id}/journal`,
          },
          {
            key: 'photo-reports',
            title: 'Foto hisobot',
            path: `/inspectors/${id}/photo-reports`,
          },
          {
            key: 'payment',
            title: 'To`lovlar',
            path: `/inspectors/${id}/payment`,
          },
          {
            key: 'calendar',
            title: 'Nazorat kalendari',
            path: `/inspectors/0c32ffb9-2cae-44d8-acd9-735ede261d1f/calendar/${object.data?.task_id}`,
          },
        ]
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
    objectPaymentsParams: { enabled: !!id && pathname.includes('inspectors') },
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
  useEffect(() => {
    setRightElement &&
      setRightElement(() => ({ fileDownloader, pathname, isBuhgalter, pdf }) => {
        if (isBuhgalter && !pathname.includes('archive')) {
          return (
            <div className="flex align-middle items-center gap-2">
              <BtnFiled color="blue" onClick={() => navigate('add')} leftIcon={<Add />}>
                Qo'shish
              </BtnFiled>
            </div>
          )
        }
      })
  }, [setRightElement, navigate])
  return (
    <>
      {shouldShowHeader && (
        <Header
          title="To'lovlar"
          backLink={-1}
          centerElement={<Tabs elements={tabLinks} />}
          rightElement={
            permissions[roleId].includes('PAYMENT/ADD') &&
            !pathname.includes('archive') && (
              <BtnFiled onClick={() => navigate('add')} leftIcon={<Add />}>
                Qoshish
              </BtnFiled>
            )
          }
        />
      )}
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

export default Departments
