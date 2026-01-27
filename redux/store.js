import {combineReducers, createStore} from 'redux'
import filtersReducer from './filters/filtersReducers';
import dataReducer from './data/dataReducers';
import filtersDataReducer from './filtersData/filtersDataReducers'

const rootReducer = combineReducers({
    filters : filtersReducer,
    data : dataReducer,
    filtersData : filtersDataReducer
})

const store = createStore(rootReducer);

export default store;