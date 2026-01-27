import { UPDATE_BUDGET, UPDATE_CITY, UPDATE_FUEL, UPDATE_MAKE } from "./filtersTypes";


export function updateFuel(payload) {
    return {
        type : UPDATE_FUEL,
        payload
    }
}

export function updateBudget(payload) {
    return {
        type : UPDATE_BUDGET,
        payload
    }
}

export function updateMake(payload) {
    return {
        type : UPDATE_MAKE,
        payload
    }
}

export function updateCity(payload) {
    return {
        type : UPDATE_CITY,
        payload
    }
}