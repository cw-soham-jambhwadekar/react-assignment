import { useSelector } from "react-redux";

export function useFilters() {
    const fuel = useSelector((state) => state.filters.fuel);
    const budget = useSelector((state) => state.filters.budget);
    const make = useSelector((state) => state.filters.make);
    const city = useSelector((state) => state.filters.city);

    return {fuel, budget, make, city};
}

export function useData() {
    const carData = useSelector((state) => state.data.carData);
    const paginatedCarData = useSelector((state) => state.data.paginatedCarData);

    return {carData , paginatedCarData};
}

export function useFiltersData() {
    const MAKE_MAP = useSelector(state => state.filtersData.makes);
    const CITY_MAP = useSelector(state => state.filtersData.cities);

    return {CITY_MAP , MAKE_MAP};
}