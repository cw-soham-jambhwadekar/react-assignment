import {UPDATE_CAR_DATA, UPDATE_PAGINATED_CAR_DATA} from "./dataTypes"

const initialState = {
    carData : [],
    paginatedCarData : []
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CAR_DATA:
            return {
                ...state,
                carData : action.payload
            }

        case UPDATE_PAGINATED_CAR_DATA:
            return {
                ...state,
                paginatedCarData : action.payload
            }

        default: return state
    }
}

export default dataReducer;