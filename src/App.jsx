import { useEffect, useState } from 'react'
import Card from './components/Card'
import ContentBox from './components/ContentBox'
import FilterBox from './components/FilterBox'
import './styles/App.css'
import Navbar from './components/Navbar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateCities, updateMakes } from '../redux/filtersData/filtersDataActions'

function App() {
  const dispatch = useDispatch();

  const fetchCities = async () => {
    const url = `/api/location/cities`
    const res = await axios.get(url);
    const data = res.data;

    const cities = data?.allCities?.reduce((acc, ele) => {
      acc[ele.payload.cityName] = ele.payload.cityId;
      return acc;
    }, {})

    dispatch(updateCities(cities));
  }

  const fetchMakes = async () => {
    const url = `api/v2/makes/?type=new`
    const res = await axios.get(url);
    const data = res.data;

    const makes = data?.reduce((acc, ele) => {
      acc[ele.makeName] = ele.makeId;
      return acc;
    }, {})

    dispatch(updateMakes(makes));
  }

  useEffect(() => {
    fetchCities();
    fetchMakes();
  }, [])


  return (
    <>
      <Navbar />

      <div data-testId="parent" id='parent'>
        <FilterBox />
        <ContentBox />
      </div>
    </>
  )
}

export default App
