import { Delete, RemoveOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useCallback, useContext, useEffect, useMemo } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import { AddIcon } from '../../../assets/icons'
import { BasicTable, BtnFiled, Card, Input, Select } from '../../../components'
import SmetaTableForm from '../../../forms/Laboratory/SmetaTableForm'
import { useTestTypes } from '../../../services/labaratory'
import CalculatorOutput from './CalculatorOutput'
import LabaratoryApplicationContext from './context'
import priceFormatter from '../../../utils/priceFormatter'

export default function SmetaTableLogicComp() {
  const { register, control, headTitle, testTypes, setValue, setDeletedSmetas } =
    useContext(LabaratoryApplicationContext)
  const { fields, append, remove } = useFieldArray({ control, name: 'smetas' })
  const watchCalculateWithoutTransportCost = useWatch({
    control,
    name: 'calculate_without_transport_cost',
  })
  const watchSmetaList = useWatch({
    control,
    name: 'smetas',
  })
  const computedTestTypes = useMemo(() => {
    return testTypes?.map((item) => ({
      value: item.id,
      label: item.name,
    }))
  }, [testTypes])
  const headData = useMemo(
    () => [
      {
        title: '№',
        key: 'order',
      },
      {
        title: 'Sinov turi',
        key: 'test_type',
        width: 414,
        render: (_, index) => (
          <Select
            withBorder={false}
            required
            control={control}
            register={register}
            options={computedTestTypes}
            name={`smetas[${index}].test_type`}
            customOnChange={(value) => {
              let selectedTestTypeInfo = testTypes.find((item) => item.id === value.value)
              setValue(`smetas[${index}].measurement`, selectedTestTypeInfo?.measurement_name)
              setValue(
                `smetas[${index}].price`,
                watchCalculateWithoutTransportCost
                  ? selectedTestTypeInfo.price_without_transport_cost
                  : selectedTestTypeInfo.price
              )
            }}
            widthFull
            onKeyDown={(e) => {
              e.target.style.height = 'inherit'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            className="border-none text-sm w-full table-input resize-none overflow-hidden"
          />
        ),
      },
      {
        title: 'O`lchov birligi',
        key: 'measurement',
        width: 100,
        render: (_, index) => (
          <Input
            register={register}
            name={`smetas[${index}].measurement`}
            disabled
            widthFull
            withBorder={false}
            className="border-none text-sm w-full max-w-180 bg-transparent overflow-hidden"
          />
        ),
      },
      {
        title: 'Miqdori',
        key: 'amount',
        width: 130,
        render: (_, index) => (
          <Input
            register={register}
            name={`smetas[${index}].amount`}
            required
            type="number"
            widthFull
            withBorder={false}
            min={0}
            className="border-none text-sm w-full max-w-180 bg-transparent overflow-hidden"
          />
        ),
      },
      {
        title: 'Narxi',
        key: 'price',
        width: 130,
        render: (_, index) => (
          <Input
            register={register}
            name={`smetas[${index}].price`}
            disabled
            type="number"
            widthFull
            withBorder={false}
            className="border-none text-sm w-full max-w-180 bg-transparent overflow-hidden"
          />
        ),
      },
      {
        title: 'Umumiy narxi',
        key: 'general_price',
        render: (_, index) => (
          <CalculatorOutput
            index={index}
            dependency={['amount', 'price', 'transport_cost']}
            name="general_price"
            calcFunction={generalPriceCalc}
          />
        ),
      },
      {
        title: 'QQS',
        key: 'tax',
        columns: [
          {
            title: 'Stavka %',
            key: 'tax_stavka',
            render: (_, index) => (
              <Input
                register={register}
                name={`smetas[${index}].tax.tax_stavka`}
                defaultValue={15}
                disabled
                type="number"
                widthFull
                withBorder={false}
                className="border-none text-sm w-full max-w-180 bg-transparent overflow-hidden"
              />
            ),
          },
          {
            title: 'Summa',
            key: 'tax_summa',
            render: (_, index) => (
              <CalculatorOutput
                index={index}
                dependency={['general_price', ['tax', 'tax_stavka'], 'transport_cost']}
                name="tax.tax_summa"
                calcFunction={taxSumCalc}
              />
            ),
          },
        ],
      },
      {
        title: 'Jami (QQS hisobga olgan holda)',
        key: 'with_tax',
        render: (_, index) => (
          <CalculatorOutput
            index={index}
            dependency={['general_price', ['tax', 'tax_summa']]}
            name="with_tax"
            calcFunction={(values) => values[0] + values[1]}
          />
        ),
      },
      {
        title: '',
        key: 'smetaId',
        render: (smetaId, index) => (
          <IconButton onClick={() => removeSmeta(index, smetaId)} variant="contained" color="error">
            <Delete />
          </IconButton>
        ),
      },
    ],
    [computedTestTypes, watchCalculateWithoutTransportCost]
  )
  const footerData = [
    {
      title: 'Jami',
      key: 'Total',
      colSpan: 5,
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
  function handleAppend() {
    append({ newData: true, price: 0, test_type: undefined, amount: undefined, tax: { tax_stavka: 15, tax_summa: 0 } })
  }
  function removeSmeta(index, id) {
    setDeletedSmetas((prev) => [...prev, id])
    remove(index)
  }

  function generalPriceCalc([amount, price], index) {
    const result = amount * price
    return result.toFixed(2)
  }
  //tax summa calculation
  function taxSumCalc([general_price, tax], index) {
    let result = (general_price * tax) / 100
    return result
  }
  function handleSum(a, b) {
    return (parseFloat(a) + parseFloat(b || 0)).toFixed(2)
  }
  const computedTotalPrice = useMemo(() => {
    return watchSmetaList?.reduce((acc, item) => {
      return handleSum(acc, item?.general_price)
    }, 0)
  }, [watchSmetaList])
  const computedTotalTaxSumma = useMemo(() => {
    return watchSmetaList?.reduce((acc, item) => {
      return handleSum(acc, item.tax?.tax_summa)
    }, 0)
  }, [watchSmetaList])
  const computedTotalWithTax = useMemo(() => {
    return watchSmetaList?.reduce((acc, item) => {
      return handleSum(acc, item?.with_tax)
    }, 0)
  }, [watchSmetaList])
  useEffect(() => {
    setValue('contract_price_numbers', computedTotalWithTax)
    setValue('contract_price', priceFormatter(computedTotalWithTax || 0))
  }, [computedTotalWithTax, setValue])

  //calculate without transort cost handler
  const handleCalculateWithoutTransportCost = useCallback(
    (checked) => {
      let priceKey = checked ? 'price_without_transport_cost' : 'price'
      watchSmetaList?.forEach((field, index) => {
        setValue(
          `smetas[${index}].price`,
          parseFloat(testTypes.find((item) => item.id === field?.test_type?.value)?.[priceKey])
        )
      })
    },
    [watchSmetaList, setValue, testTypes]
  )

  return (
    <SmetaTableForm
      headData={headData}
      handleCalculateWithoutTransportCost={handleCalculateWithoutTransportCost}
      handleAppendSmeta={handleAppend}
      bodyData={fields}
      footerData={footerData}
    />
  )
}
