import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import { ORDER_DEPART, ORDER_DURATION } from '../constant'
import { h0 } from '../../common/utils/fp'

export default createStore(combineReducers(reducers),
  {
    from: null,
    to: null,
    departDate: h0(Date.now()),
    highSpedd: false,
    trainList: [],
    orderType: ORDER_DEPART,
    onlyTickets: false,
    ticketTypes: [],
    checkTicketTypes: {},
    trainTypes: [],
    checkTrainTypes: {},
    departStations: [],
    checkDepartStations: {},
    arrivedStations: [],
    checkArrivedStations: {},
    departTimeStart: 0,
    departTimeEnd: 24,
    arriveTimeStart: 0,
    arriveTimeEnd: 24,
    isFiltersVisible: false,
    searchParsed: false
  },
  applyMiddleware(thunk)
)