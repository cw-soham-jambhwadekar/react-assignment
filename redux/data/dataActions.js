import { UPDATE_CAR_DATA, UPDATE_PAGINATED_CAR_DATA } from "./dataTypes"

export function updateCarData(payload) {
    return {
        type : UPDATE_CAR_DATA,
        payload
    }
}

export function updatePaginatedCarData(payload) {
    return {
        type : UPDATE_PAGINATED_CAR_DATA,
        payload
    }
}