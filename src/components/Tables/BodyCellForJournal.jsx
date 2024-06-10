import { TableCell } from '@mui/material'
import { format } from 'date-fns'
import dateFormatter from '../../utils/dateFormatter'
import CustomMuiDatePicker from '../CustomMuiDatePicker'
import { Input } from '../Input'
import SignComponent from '../SignModal'

export default function BodyCellForJournal({
  row,
  item,
  element,
  child,
  setValue,
  key = '',
  colIndex,
  headColumns,
  control,
  tableName,
  rowIndex,
  register,
}) {
  const borderColorClass = 'border-r border-borderColor'
  const cellData = !!child
    ? row?.[item?.key]?.[element?.key]?.[child?.key]
    : !!element
    ? row?.[item?.key]?.[element?.key]
    : row?.[item?.key]
  const currentElement = child || element || item
  const cellKey = !!child
    ? `${item?.key}.${element?.key}.${child?.key}`
    : !!element
    ? `${item?.key}.${element?.key}`
    : item?.key

  return (
    <TableCell
      padding="none"
      sx={{ padding: '0 !important' }}
      align={currentElement.align}
      key={key}
      className={`${colIndex !== headColumns?.length - 1 ? borderColorClass : ''} p-0`}
    >
      <div className="text-center">
        {item.key === 'tartib_raqami' ? (
          rowIndex + +1
        ) : !!row?.newData ? (
          currentElement?.key?.includes('sign') || item?.key?.includes('sign') ? (
            <SignComponent signData={cellData} signKey={cellKey} setValue={setValue} />
          ) : currentElement?.key?.includes('date') ||
            currentElement?.key?.includes('time') ||
            currentElement?.key?.includes('created_at') ? (
            <CustomMuiDatePicker
              withoutBorder={true}
              // defaultValue={new Date()}
              control={control}
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              name={cellKey}
              className="table-input resize-none overflow-hidden"
            />
          ) : currentElement?.render ? (
            currentElement?.render(rowIndex, tableName)
          ) : (
            <Input
              withBorder={false}
              register={register}
              name={cellKey}
              widthFull
              onKeyDown={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              className="border-none text-sm table-input resize-none overflow-hidden"
            />
          )
        ) : currentElement?.key?.includes('sign') || item?.key?.includes('sign') ? (
          <div className="h-[40px]">
            <img
              className="h-full w-full object-contain"
              src={`${process.env.REACT_APP_CDN_IMAGE_URL}${row?.[currentElement?.key]}`}
              alt="signImage"
            />
          </div>
        ) : currentElement?.key?.includes('date') ||
          currentElement?.key?.includes('time') ||
          currentElement?.key?.includes('created_at') ? (
          dateFormatter(format, new Date(cellData), 'dd.MM.yyyy')
        ) : (
          cellData ?? 0
        )}
      </div>
    </TableCell>
  )
}
