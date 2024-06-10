import { useContext, useEffect, useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import LabaratoryApplicationContext from './context'

export default function CalculatorOutput({
  index,
  dependency = [],
  calcFunction = () => {},
  consolable = false,
  name,
  ...restProps
}) {
  const { control, setValue } = useContext(LabaratoryApplicationContext)
  const watchSmetaData = useWatch({
    control,
    name: `smetas[${index}]`,
  })
  const dep = useMemo(() => {
    return dependency?.map((item) =>
      Array.isArray(item) ? parseFloat(watchSmetaData?.[item[0]]?.[item[1]]) : parseFloat(watchSmetaData?.[item]) || 0
    )
  }, [watchSmetaData, dependency])
  const result = useMemo(() => {
    return calcFunction(dep)
  }, [dep, calcFunction])
  useEffect(() => {
    setValue(`smetas[${index}].${name}`, result || 0)
  }, [result, name, index, setValue])
  return <p>{result}</p>
}
