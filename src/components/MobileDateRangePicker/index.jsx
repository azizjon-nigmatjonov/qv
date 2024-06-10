import { useMemo, useState } from 'react'
import { DateRange } from 'react-date-range'
import CustomModal from '../CustomModal'
import { BtnOutlined } from '../Buttons/BtnOutlined'
import { BtnFiled } from '../Buttons/BtnFilled'
import { CalendarToday, CheckCircle } from '@mui/icons-material'
import { useSearchParams } from 'react-router-dom'

export default function MobileDateRangePicker({ setRange, usePramsForState = false }) {
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsMemo = useMemo(() => Object.fromEntries([...searchParams]), [searchParams])
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  return (
    <>
      <div
        className="h-[40px] rounded-md border-[#E5E9EB] max-w-[290px] w-[280px] border"
        onClick={() => setOpen(true)}
      >
        <CalendarToday color="primary" />
      </div>
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        bottomElements={
          <div className="flex justify-center gap-3">
            <BtnOutlined
              onClick={() => {
                setOpen(false)
                setState([
                  {
                    key: 'selection',
                  },
                ])
              }}
            >
              Tozalash
            </BtnOutlined>
            <BtnFiled
              leftIcon={<CheckCircle />}
              onClick={() => {
                if (usePramsForState) {
                  setSearchParams({
                    ...searchParamsMemo,
                    startDate: state[0].startDate,
                    endDate: state[0].endDate,
                  })
                }
                setRange({
                  startDate: state[0].startDate,
                  endDate: state[0].endDate,
                })
                setOpen(false)
              }}
            >
              Tasdiqlash
            </BtnFiled>
          </div>
        }
      >
        <DateRange
          editableDateInputs={false}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </CustomModal>
    </>
  )
}
