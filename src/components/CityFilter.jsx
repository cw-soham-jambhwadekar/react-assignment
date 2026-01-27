import { useEffect, useRef, useState } from 'react'
import '../styles/CityFilter.css'
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { getCityOptions, POPUlAR_CITY_MAP } from '../utils';
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { updateCity } from '../../redux/filters/filtersActions';

function CityFilter() {
    const city = useSelector(state => state.filters.city);
    const CITY_MAP = useSelector(state => state.filtersData.cities)
    const dispatch = useDispatch();

    const [cityOpen, setCityOpen] = useState(false);
    const [inputCity, setInputCity] = useState("");
    const timer = useRef(null);

    const [cityOptions, setCityOptions] = useState([]);
    const dropDownRef = useRef(null);

    const suggestWithDebounce = (value) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setCityOptions(getCityOptions(value , CITY_MAP));
        }, 700)
    }

    const inputHandler = (e) => {
        const value = e.target.value;
        setInputCity(value);

        if (!value) {
            clearTimeout(timer.current);
            setCityOptions([]);
        } else {
            suggestWithDebounce(value);
        }
    }

    const handleOptionClick = (ele) => {
        dispatch(updateCity(ele.cityId));
        setInputCity(ele.cityName);
    }

    const handlePopularCity = ([name, id]) => {
         dispatch(updateCity(id));
        setInputCity(name);
    }

    useEffect(() => {
        return () => clearTimeout(timer.current);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setCityOptions([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div data-testid="city-filter" id='city-box'>
            <button id='city-toggle' onClick={() => setCityOpen(prev => !prev)}>
                <h1 id='filter-name'>City</h1>
                <h1>{cityOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</h1>
            </button>

            <div className={`city-option-list ${cityOpen ? 'open' : ''}`}>

                <label>
                    <input id='city-input' type="text" value={inputCity} onChange={inputHandler} />
                    <GoSearch id='search-icon' size={22} />
                </label>

                {cityOptions.length > 0 &&
                    <ul id='city-results' ref={dropDownRef}>
                        {cityOptions.map(ele => (
                            <li key={ele.cityId} onClick={() => handleOptionClick(ele)}
                            >{ele.cityName}</li>
                        ))}
                    </ul>
                }

                <div id='popular-city-box'>
                    {Object.entries(POPUlAR_CITY_MAP).map(([name, id]) => (
                        <div className={`popular-city ${id === city ? 'active' : ''}`}
                            key={id} onClick={() => handlePopularCity([name, id])}>
                            {name}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default CityFilter