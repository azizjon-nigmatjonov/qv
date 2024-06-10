import { Cancel, Check, Download, Edit } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate, NavLink, Outlet, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { DownloadIcon } from '../../../assets/icons'
import { ArrowRightMagical, WarningIcon } from '../../../assets/icons/icons'
import { Header, Tabs, Card, BasicTable, BtnOutlined, BtnFiled, Tag, Input } from '../../../components'
import StatusModal from '../../../components/StatusModal'
import ContractInfoForm from '../../../forms/Laboratory/ContractInfoForm'
import CustomerInfoForm from '../../../forms/Laboratory/CustomerInfoForm'
import PerformerInfoForm from '../../../forms/Laboratory/PerformerInfoForm'
import { useDistrict } from '../../../services'
import { useContract } from '../../../services/labaratory/useContract'
import fileDownloader from '../../../utils/fileDownloader'
import priceFormatter from '../../../utils/priceFormatter'

function AllInformation() {
  const [control, register, reset, setValue, contractByIdQuery, setRightElement] = useOutletContext()
  const { id } = useParams()
  const { regionId } = useSelector((state) => state.auth)
  const { districts } = useDistrict({ regionId })

  const headData = [
    { title: '№', key: 'order' },
    {
      title: 'Mahsulot nomi',
      key: 'test_type_name',
    },
    {
      title: 'O`lchov birligi',
      key: 'measurement',
    },
    {
      title: 'Miqdori',
      key: 'amount',
    },
    {
      title: 'Narxi',
      key: 'price',
      render: (item) => {
        return priceFormatter(item)
      },
    },
    {
      title: 'Umimiy qiymati',
      key: ['amount', 'price'],
      render: (value) => {
        return <p>{priceFormatter(value[0] * value[1])}</p>
      },
    },
    {
      title: 'QQS',
      key: 'QQS',
      columns: [
        {
          title: 'Stavkasi',
          key: 'rate',
          render: () => <p>15%</p>,
        },
        {
          title: 'Summasi',
          key: ['amount', 'price'],
          render: (value) => {
            return <p>{priceFormatter(value[0] * value[1] * 0.15)}</p>
          },
        },
      ],
    },
    {
      title: 'QQS hisobga olgan holda',
      key: ['amount', 'price'],
      render: (value) => {
        return <p>{priceFormatter(value[0] * value[1] * 1.15)}</p>
      },
    },
  ]
  function handleSum(a, b) {
    return (parseFloat(a) + parseFloat(b || 0)).toFixed(2)
  }
  const computedTotalPrice = useMemo(() => {
    return contractByIdQuery?.data?.data?.smetas?.reduce((acc, item) => {
      return handleSum(acc, item.amount * item.price)
    }, 0)
  }, [contractByIdQuery])
  const computedTotalTaxSumma = useMemo(() => {
    return contractByIdQuery?.data?.data?.smetas?.reduce((acc, item) => {
      return handleSum(acc, item.amount * item.price * 0.15)
    }, 0)
  }, [contractByIdQuery])
  const computedTotalWithTax = useMemo(() => {
    return contractByIdQuery?.data?.data?.smetas?.reduce((acc, item) => {
      return handleSum(acc, item.amount * item.price * 1.15)
    }, 0)
  }, [contractByIdQuery])
  const footerData = [
    {
      title: 'Jami',
      key: 'Total',
      colSpan: 4,
      align: 'justify-end',
      render: () => <p className="font-bold">Jami:</p>,
    },
    {
      key: 'general_price_footer',
      align: 'justify-end',
      render: () => <p>{priceFormatter(computedTotalPrice)}</p>,
    },
    {
      key: 'with_tax_footer',
      colSpan: 2,
      align: 'justify-end',
      render: () => <p>{priceFormatter(computedTotalTaxSumma)}</p>,
    },
    {
      key: 'overall_price_footer',
      align: 'justify-end',
      render: () => <p>{priceFormatter(computedTotalWithTax)}</p>,
    },
  ]
  useEffect(() => {
    setValue('contract_price', priceFormatter(computedTotalWithTax))
  }, [computedTotalWithTax, setValue])
  useEffect(() => {
    setRightElement(
      () =>
        ({
          isStatusNew,
          pathname,
          isBuhgalter,
          setIsCancelModalOpen,
          handleAcceptApplication,
          handleClickSendToDepartments,
          contractStatus,
          isYurist,
          isInspeksiya,
          id,
        }) => {
          if (isStatusNew) {
            return (
              <div className="flex gap-2">
                <NavLink to={`/labaratory/${id}/edit`}>
                  <BtnOutlined color="blue" leftIcon={<Edit />}>
                    O`zgartirish
                  </BtnOutlined>
                </NavLink>
                <BtnFiled leftIcon={<ArrowRightMagical />} onClick={() => handleClickSendToDepartments()} color="blue">
                  Bo`limlarga yuborish
                </BtnFiled>
              </div>
            )
          }
          if (
            (isBuhgalter || isYurist || isInspeksiya) &&
            !pathname.includes('archive') &&
            contractStatus?.value === 'in_process'
          ) {
            return (
              <div className="flex align-middle items-center gap-2">
                <BtnOutlined
                  color="red"
                  onClick={() => {
                    setIsCancelModalOpen(true)
                  }}
                  leftIcon={<Cancel />}
                >
                  Bekor qilish
                </BtnOutlined>
                <BtnFiled color="blue" leftIcon={<Check />} onClick={() => handleAcceptApplication()}>
                  Qabul qilish
                </BtnFiled>
              </div>
            )
          }
          if (isBuhgalter && pathname.includes('archive') && contractStatus?.value === 'accepted') {
            return (
              <div className="flex align-middle items-center gap-2">
                <BtnOutlined color="red" onClick={() => setIsCancelModalOpen(true)} leftIcon={<Cancel />}>
                  Shartnomani bekor qilish
                </BtnOutlined>
              </div>
            )
          }
          return (
            <div className="flex align-middle items-center gap-2">
              <BtnFiled
                color="blue"
                leftIcon={<Download htmlColor="white" />}
                onClick={() => fileDownloader(contractByIdQuery?.data?.data?.pdf)}
              >
                {' '}
                Yuklab olish
              </BtnFiled>
              {contractStatus?.text && <Tag color={contractStatus?.color} value={contractStatus?.text} />}
            </div>
          )
        }
    )
  }, [setRightElement, id])
  return (
    <>
      <div className="h-screen">
        <div className="header-calc">
          <div className="grid grid-cols-12 gap-4 auto-rows-min">
            <PerformerInfoForm disabled={true} register={register} control={control} />
            <CustomerInfoForm
              disabled={true}
              beingCreated={false}
              register={register}
              districts={districts?.data?.districts?.map((el) => ({
                value: id,
                label: el?.uz_name,
              }))}
              control={control}
            />
          </div>
          <Card
            className="my-4"
            title="Jadvalni shakllantirish"
            children={
              <div>
                <BasicTable
                  headColumns={headData}
                  bodyColumns={contractByIdQuery?.data?.data?.smetas}
                  footerColumns={footerData}
                  isLoading={contractByIdQuery?.isLoading}
                />
                <div className="mt-2">
                  <span className="input-label col-span-4">Summani so’z bilan kiritish</span>
                  <Input widthFull register={register} name="overal_sum_in_words" />
                </div>
              </div>
            }
          />
          <ContractInfoForm disabled register={register} control={control} />
        </div>
      </div>
    </>
  )
}

export default AllInformation
