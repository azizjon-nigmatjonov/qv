import { useEffect, useMemo, useState } from 'react'
import Countdown from 'react-countdown'

export default function TimeCounter({ intervalMinutes = 1, counterKey, setIsTimeOver = () => {} }) {
  const computedMinutes = useMemo(() => {
    return Date.now() + intervalMinutes * 60 * 1000
  }, [intervalMinutes, counterKey])

  return (
    <div className="w-max">
      <Countdown
        date={computedMinutes}
        key={counterKey}
        renderer={({ minutes, seconds }) => {
          if (minutes === 0 && seconds === 0) {
            setIsTimeOver(true)
            // setIntervalMinutes(0)
          }
          return (
            <span className={`${minutes === 0 && seconds <= 10 ? 'text-[#F76659]' : ''}`}>
              {minutes.toString().length === 1 ? '0' + minutes : minutes} :{' '}
              {seconds.toString().length === 1 ? '0' + seconds : seconds}
            </span>
          )
        }}
      />
    </div>
  )
}
