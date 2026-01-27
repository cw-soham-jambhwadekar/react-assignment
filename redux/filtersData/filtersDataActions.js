import { UPDATE_CITIES, UPDATE_MAKES } from "./filtersDataTypes";

export function updateCities(payload) {
    return {
        type : UPDATE_CITIES,
        payload,
    }
}

export function updateMakes(payload) {
    return {
        type : UPDATE_MAKES,
        payload,
    }
}