import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { h0 } from '../common/utils/fp';
import URI from 'urljs'
import dayjs from 'dayjs'
import {
    setFrom, setTo, setDepartDate, setHighSpeed, setSearchParsed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,

    prevDate,
    nextDate,

    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,

    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
} from './actions'

function App(props) {

    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

