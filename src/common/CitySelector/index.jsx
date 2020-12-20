import React, { useState, useMemo, useEffect, useCallback, memo } from 'react'
import classnames from 'classnames'
import './index.css'

function CityItem(props) {
  const { name, onSelect } = props
  return (
    <li className='city-li' onClick={() => onSelect(name)}>{name}</li>
  )
}

function CitySelection(props) {
  const { title, citys, onSelect } = props
  return (
    <ul className='city-ul'>
      <li className='city-li' key='title' data-cate={title}>{title}</li>
      {
        citys && citys.map(city => {
          return (
            <CityItem name={city.name} onSelect={onSelect} key={city.name} />
          )
        })
      }
    </ul>
  )
}

function AlphaIndex(props) {
  const { onClick, alpha } = props
  return (
    <i className='city-index-item' onClick={() => onClick(alpha)}>{alpha}</i>
  )
}

const alphaArray = Array.from(new Array(26), function (ele, index) {
  return String.fromCharCode(65 + index)
})

function CityList(props) {
  const { onSelect, sections, toCate } = props
  return (
    <div className='city-list'>
      <div className='city-cate'>
        {
          sections.map(section => {
            return (
              <CitySelection
                key={section.title}
                title={section.title}
                citys={section.citys}
                onSelect={onSelect}
              />
            )
          })
        }
      </div>
      <div className='city-index'>
        {
          alphaArray.map(item => {
            return <AlphaIndex alpha={item} key={item} onClick={toCate} />
          })
        }
      </div>
    </div>
  )
}

// 搜索

const SuggestItem = memo(function SuggestItem(props) {
  const { name, onClick } = props
  return (
    <li className='city-suggest-li' onClick={() => onClick(name)}>{name}</li>
  )
})

const SuggestList = memo(function SuggestList(props) {
  const { searchKey, onSelect } = props
  const [result, setResult] = useState([])

  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: skey } = data
        if (searchKey === skey) {
          setResult(result)
        }
      })
  })

  const searchResult = result.length ? result : [{ display: searchKey }]

  return (
    <div className='city-suggest'>
      <ul className='city-suggest-ul'>
        {
          searchResult.map(item => {
            return (
              <SuggestItem
                key={item.display}
                name={item.display}
                onClick={onSelect}
              />
            )
          })
        }
      </ul>
    </div>
  )
})

export default function Index(props) {
  const {
    show,
    isLoading,
    cityData,
    onBack,
    fetchCityData,
    onSelect
  } = props
  const [searchKey, setSearchKey] = useState('')
  const key = useMemo(() => searchKey.trim(), [searchKey]);
  const toCate = useCallback(function (alpha) {
    console.log(alpha)
    document.querySelector('[data-cate=' + alpha + ']').scrollIntoView()
  }, [])

  useEffect(() => {
    if (!show || isLoading || cityData) return;
    fetchCityData()
  }, [show, isLoading, cityData])

  const outputCitySelection = () => {
    if (isLoading) {
      return <div>loading</div>
    }

    if (cityData) {
      return (
        <CityList toCate={toCate} onSelect={onSelect} sections={cityData.cityList} />
      )
    }

    return (
      <div>error</div>
    )
  }

  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className='city-search'>
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <i
          onClick={() => setSearchKey('')}
          className={classnames('search-clean', {
            hidden: key.length === 0,
          })}>
          &#xf063;
          </i>
      </div>
      {
        outputCitySelection()
      }
      {
        Boolean(key) &&
        <SuggestList
          onSelect={onSelect}
          searchKey={key}
        />
      }
    </div>
  )
}
