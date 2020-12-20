import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    exchangeFromTo,
    showCitySelector,
    setSelectedCity,
    hideCitySelector,
    fetchCityData,
    showDateSelector,
    hideDateSelector
} from './action'
import './App.css'
import {
    DepartDate,
    Journey,
    Submit,
    HighSpeed
} from './pages'
import Header from '../common/Header'
import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'

function App(props) {
    const {
        from,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        to,
        dispatch,
        departDate,
        isDateSelectorVisible
    } = props
    const onBack = useCallback(() => {
        window.history.back()
    })

    const doCb = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector
        }, dispatch)
    }, [])

    const doCitySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity
        }, dispatch)
    }, [])

    const doDepartDate = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector
        }, dispatch)
    }, [])

    const doDateSelector = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector,
        }, dispatch)
    }, [])

    return (
        <div>
            <div className='header-wrapper'>
                <Header title='首页' onBack={onBack} />
            </div>
            <form action="" className='form'>
                <Journey
                    from={from}
                    to={to}
                    {...doCb}
                />
                <DepartDate
                    time={departDate}
                    {...doDepartDate}
                />
                <HighSpeed />
                <Submit />
                <CitySelector
                    show={isCitySelectorVisible}
                    cityData={cityData}
                    isLoading={isLoadingCityData}
                    {...doCitySelectorCbs}
                />
                <DateSelector
                    show={isDateSelectorVisible}
                    {...doDateSelector}
                />
            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return state
}

export default connect(mapStateToProps)(App)

