import {UPDATE_CITIES, UPDATE_MAKES} from './filtersDataTypes'

const initialState = {
    cities : {},
    makes : {}
}

const filtersDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CITIES:
            return {
                ...state,
                cities : action.payload
            }

        case UPDATE_MAKES:
            return {
                ...state,
                makes : action.payload
            }

        default: return state
    }
}

export default filtersDataReducer;