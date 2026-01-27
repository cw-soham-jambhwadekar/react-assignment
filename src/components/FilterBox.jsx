import { useState } from 'react';
import '../styles/FilterBox.css'
import { FUEL_MAP } from '../utils'
import { Range, getTrackBackground } from "react-range";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { VscDash } from "react-icons/vsc";
import { CiFilter } from "react-icons/ci";
import CityFilter from './CityFilter';
import { useDispatch, useSelector } from 'react-redux';
import { updateBudget, updateFuel, updateMake } from '../../redux/filters/filtersActions';

function FilterBox() {
    const fuel = useSelector(state => state.filters.fuel)
    const budget = useSelector(state => state.filters.budget)
    const make = useSelector(state => state.filters.make)
    const MAKE_MAP = useSelector(state => state.filtersData.makes);
    const dispatch = useDispatch();

    const [min, max] = budget;
    const values = budget || [0, 21]
    const [fuelOpen, setFuelOpen] = useState(false);
    const [makeOpen, setMakeOpen] = useState(false);
    const [budgetOpen, setBudgetOpen] = useState(true);

    const handleMinChange = (value) => {
        const newMin = Math.min(Number(value), max);
        dispatch(updateBudget([newMin, max]))
    }

    const handleMaxChange = (value) => {
        const newMax = Math.max(Number(value), min);
        dispatch(updateBudget([min, newMax]));
    }

    return (
        <div id='filter-box'>

            <div id='filter-header'>
                <div id='filter-icon'>
                    <CiFilter size={22} />
                    <h1>Filters</h1>
                </div>

                <h1 id='clear-all'>Clear All</h1>
            </div>

            <div id='budget-box'>
                <button id='budget-toggle' onClick={() => setBudgetOpen(prev => !prev)}>
                    <h1 id='filter-name'>Budget (Lakhs)</h1>
                    <h1>{budgetOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</h1>
                </button>

                <div className={`budget-option-list ${budgetOpen ? 'open' : ''}`}>

                    <Range
                        step={1}
                        min={0}
                        max={21}
                        values={values}
                        onChange={(vals) => dispatch(updateBudget(vals))}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: "36px",
                                    display: "flex",
                                    width: "100%"
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: "6px",
                                        width: "100%",
                                        borderRadius: "4px",
                                        alignSelf: "center",

                                        background: getTrackBackground({
                                            values: values,
                                            colors: ["#ddd", "#00857a", "#ddd"],
                                            min: 0,
                                            max: 21,
                                        }),
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: "18px",
                                    width: "18px",
                                    borderRadius: "50%",
                                    backgroundColor: "#00857a",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    boxShadow: "0px 2px 6px #AAA",
                                    outline: "none"
                                }}
                            >

                                <div
                                    style={{
                                        height: "6px",
                                        width: "6px",
                                        backgroundColor: isDragged ? "#fff" : "transparent",
                                        borderRadius: "50%"
                                    }}
                                />
                            </div>
                        )}
                    />

                    <div id='budget-inputs'>
                        <input type="number" placeholder="From" value={min}
                            onChange={(e) => handleMinChange(e.target.value)} />

                        <VscDash size={30} />

                        <input type="number" placeholder="To" value={max}
                            onChange={(e) => handleMaxChange(e.target.value)} />
                    </div>
                </div>

            </div>

            <div id='fuel-box'>
                <button id='fuel-toggle' onClick={() => setFuelOpen(prev => !prev)}>
                    <h1 id='filter-name'>Fuel</h1>
                    <h1>{fuelOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</h1>
                </button>

                <div className={`fuel-option-list ${fuelOpen ? 'open' : ''}`}>
                    {Object.entries(FUEL_MAP).map(([label, value]) => (
                        <label key={value} className='fuel-option'>
                            <input type="checkbox"
                                checked={fuel?.includes(value)}
                                onChange={() => dispatch(updateFuel(value))} />
                            {label}
                        </label>
                    ))}
                </div>
            </div>

            <div id='make-box'>
                <button id='make-toggle' onClick={() => setMakeOpen(prev => !prev)}>
                    <h1 id='filter-name'>Make</h1>
                    <h1>{makeOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</h1>
                </button>

                <div className={`make-option-list ${makeOpen ? 'open' : ''}`}>
                    {Object.entries(MAKE_MAP).map(([label, value]) => (
                        <label key={value} className='make-option'>
                            <input type="checkbox"
                                checked={make?.includes(value)}
                                onChange={() =>  dispatch(updateMake(value))} />
                            {label}
                        </label>
                    ))}
                </div>
            </div>

            <CityFilter />

        </div>
    )
}

export default FilterBox;