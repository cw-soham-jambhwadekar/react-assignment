import { UPDATE_BUDGET, UPDATE_CITY, UPDATE_FUEL, UPDATE_MAKE } from "./filtersTypes";


const initialState = {
    fuel: [],
    budget: [0, 21],
    make: [],
    city: "",
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FUEL:
            return {
                ...state,
                fuel: state.fuel?.includes(action.payload)
                    ? state.fuel.filter(m => m !== action.payload)
                    : [...state.fuel, action.payload]
            }

        case UPDATE_BUDGET:
            return {
                ...state,
                budget: action.payload
            }

        case UPDATE_MAKE:
            return {
                ...state,
                make: state.make?.includes(action.payload)
                    ? state.make.filter(m => m !== action.payload)
                    : [...state.make, action.payload]
            }

        case UPDATE_CITY:
            return {
                ...state,
                city: action.payload
            }

        default: return state

    }
}

export default filtersReducer;