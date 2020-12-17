import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData } from './action'
import './App.css'
import {
    DepartDate,
    Journey,
    Submit,
    HighSpeed
} from './pages'
import Header from '../common/Header'
import CitySelector from '../common/CitySelector'

function App(props) {
    const {
        from,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        to,
        dispatch
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
            fetchCityData
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
                <DepartDate />
                <HighSpeed />
                <Submit />
                <CitySelector
                    show={isCitySelectorVisible}
                    cityData={cityData}
                    isLoading={isLoadingCityData}
                    {...doCitySelectorCbs}
                />
            </form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return state
}

export default connect(mapStateToProps)(App)

