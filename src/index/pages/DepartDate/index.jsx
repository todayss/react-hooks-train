import React from 'react'
import dayjs from 'dayjs'
import { h0 } from '../../../common/utils/fp'
import "./index.css"

export default function DepartDate(props) {
  const { time, onClick } = props
  const h0Time = h0(time)
  const departTime = new Date(h0Time)

  const formatTime = dayjs(time).format('YYYY-MM-DD')

  const isTody = h0Time === h0()



  const timeWeekString = "周" + ['天', '一', '二', '三', '四', '五', '六'][departTime.getDay()] + isTody ? '(今天)' : ""

  return (
    <div className='dapart-date' onClick={onClick}>
      <input type="hidden" name='date' value={formatTime} />
      {
        formatTime
      }
      <span>{timeWeekString}</span>
    </div>
  )
}
