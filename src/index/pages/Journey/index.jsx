import React from 'react'
import switchImg from '../imgs/switch.svg'
import './index.css'
// 始发站终到站
export default function Journey(props) {
  const {
    from,
    to,
    exchangeFromTo,
    showCitySelector
  } = props

  return (
    <div className='journey'>
      <div className='journey-station' onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          value={from}
          className='journey-input journey-from'
        />
      </div>
      <div className='journey-switch' onClick={() => exchangeFromTo()}>
        <img src={switchImg} width={70} height={40} alt="switch" />
      </div>
      <div className='journey-station' onClick={() => showCitySelector(false)} >
        <input
          type="text"
          readOnly
          value={to}
          className='journey-input journey-to'
        />
      </div>
    </div>
  )
}