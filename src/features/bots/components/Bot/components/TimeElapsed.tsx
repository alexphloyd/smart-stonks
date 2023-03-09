import clsx from 'clsx'
import dayjs from 'dayjs'

interface TimeElapsedProps {
  date: Date
}

export const TimeElapsed = ({ date }: TimeElapsedProps) => {
  let text = ''
  let now = dayjs()
  let difD = now.diff(date, 'd', true)

  let isGold = false
  let is24h = false
  let isOld = difD > 1

  if (difD > 60) text = Math.round(difD / 30) + 'M'
  else if (difD > 2) text = Math.round(difD) + 'd'
  else {
    let hrs = difD * 24
    if (hrs > 1) text = Math.round(hrs) + 'h'
    else text = Math.round(hrs * 60) + 'm'

    if (hrs < 1) isGold = true
    else if (hrs < 24) is24h = true
  }

  return (
    <span
      className={clsx(
        isGold && 'text-orange-500',
        is24h && 'text-purple-400',
        isOld && 'text-gray-400 '
      )}
    >
      {text}
    </span>
  )
}
