import React from 'react'
import classnames from 'classnames'
import Header from '../Header'
import './index.css'


function Month(props) {
  const { startingTimeInMonth } = props
  return (
    <div>

    </div>
  )
}

export default function Index(props) {
  const { onSelect, onBack, show } = props

  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  now.setDate(1)

  const monthSequence = [now.getTime()]


  return (
    <div className={classnames('date-selector', { hidden: !show })}>
      <Header title='日期选择' onBack={onBack} />
      <div className='date-selector-tables'>

      </div>
    </div>
  )
}
