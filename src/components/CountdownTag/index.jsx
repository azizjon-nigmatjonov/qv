import Countdown from 'react-countdown'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import { StatusTag } from '../StatusTag'
import SnoozeIcon from '@mui/icons-material/Snooze'
import { addZero } from '../../utils/addZero'

const CountdownTag = ({ serverTime, value, deadlineTime, isBigDeadline = false }) => {
  const serverDay = new Date(serverTime?.message).getDay()
  const serverHour = new Date(serverTime?.message).getHours()

  const showTimerStopped = isBigDeadline
    ? false
    : (serverDay === 5 && serverHour > 17) || (serverDay === 1 && serverHour < 9) || serverDay === 0 || serverDay === 6

  const deadline = typeof deadlineTime === 'object' ? deadlineTime : new Date(deadlineTime)

  return showTimerStopped ? (
    <StatusTag
      title={
        <div className="flex items-center gap-2 justify-center">
          <span>
            <SnoozeIcon />
          </span>
          <span>timer to'xtatildi</span>
        </div>
      }
      color="red"
    />
  ) : (
    <Countdown
      date={deadline}
      renderer={({ hours, minutes, seconds, days }) => {
        return (
          <StatusTag
            title={
              <div className="flex items-center gap-2 justify-center">
                <span>
                  <TimerOutlinedIcon />
                </span>
                <span className="font-medium">
                  {addZero(isBigDeadline || days > 1 ? (days * 24 !== 0 ? days * 24 - 1 : 0) : hours)}:
                  {addZero(minutes)}:{addZero(seconds)}
                </span>
              </div>
            }
            color={
              isBigDeadline
                ? days * 24 > 250
                  ? 'blue'
                  : days * 24 > 200
                  ? 'yellow'
                  : 'red'
                : hours > 15 || days >= 1
                ? 'blue'
                : hours > 6
                ? 'yellow'
                : 'red'
            }
          />
        )
      }}
    />
  )
}
export default CountdownTag
