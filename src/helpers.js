import axios from 'axios'
import { updateCities, updateMakes } from '../redux/filtersData/filtersDataActions'

export const fetchCities = async (dispatch) => {
    const url = `/api/location/cities`
    const res = await axios.get(url);
    const data = res.data;

    const cities = data?.allCities?.reduce((acc, ele) => {
        acc[ele.payload.cityName] = ele.payload.cityId;
        return acc;
    }, {})

    dispatch(updateCities(cities));
}

export const fetchMakes = async (dispatch) => {
    const url = `api/v2/makes/?type=new`
    const res = await axios.get(url);
    const data = res.data;

    const makes = data?.reduce((acc, ele) => {
        acc[ele.makeName] = ele.makeId;
        return acc;
    }, {})

    dispatch(updateMakes(makes));
}