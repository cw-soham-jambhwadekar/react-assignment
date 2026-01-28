import { useEffect, useState } from 'react'
import ContentBox from './components/ContentBox'
import FilterBox from './components/FilterBox'
import Navbar from './components/Navbar'
import './styles/App.css'
import { fetchCities, fetchMakes } from './helpers'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCities(dispatch);
    fetchMakes(dispatch);
  }, [])

  return (
    <>
      <Navbar />

      <div data-testid="parent" id='parent'>
        <FilterBox />
        <ContentBox />
      </div>
    </>
  )
}

export default App
