import { useState } from "react";
import { CustomDatePicker } from "../../../components/CustomDatePicker";

export default function DatePicker() {
  const [range, setRange] = useState([
    {
      key: 'selection',
    },
  ])
  const [canClear, setCanClear] = useState(false)
  return (
    <CustomDatePicker
      type="range"
      maxDate={new Date()}
      range={range}
      setRange={setRange}
      style={{ width: canClear ? '270px' : '250px' }}
      rightIcon={false}
      months={2}
      direction="column"
      showBtn={false}
      placeholder="Sanani tanlang"
      canClear={canClear}
      setCanClear={setCanClear}
      onRangeFocusChange={() => setCanClear(true)}
      hasQuery
    />
  )
}
