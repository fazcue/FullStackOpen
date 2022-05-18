import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Countries from './components/Countries'

const RESTCOUNTRIES_API_URL = process.env.REACT_APP_RESTCOUNTRIES_API_URL

function App() {
	const [countriesData, setCountriesData] = useState([])
	const [findValue, setFindValue] = useState('')
	const [filteredCountries, setFilteredCountries] = useState([])

	const handleFindInput = (e) => {
		setFindValue(e.target.value)
	}

	useEffect(() => {
		const getCountriesData = async () => {
			const res = await axios.get(RESTCOUNTRIES_API_URL)
			setCountriesData(res.data)
			setFilteredCountries(res.data)
		}
		getCountriesData()
	}, [])

	useEffect(() => {
		const filterCountries = () => {
			let countries = countriesData.filter((country) => {
				return country.name.common
					.toLowerCase()
					.includes(findValue.toLowerCase())
			})

			setFilteredCountries(countries)
		}
		findValue && filterCountries()
	}, [findValue, countriesData])

	const countryInfo = filteredCountries.map((country) => (
		<Country
			name={country.name.common}
			capital={country.capital}
			area={country.area}
			languages={country.languages}
			flag={country.flags.svg ? country.flags.svg : country.flags.png}
			latlng={country.latlng}
			key={country.cca2}
		/>
	))

	const countriesName = filteredCountries.map((country) => (
		<Countries
			name={country.name.common}
			setFindValue={setFindValue}
			key={country.cca2}
		/>
	))

	const countriesList = () => {
		if (countriesData.length === 0) {
			return <p>loading data... please wait</p>
		}

		if (findValue) {
			if (filteredCountries.length > 10) {
				return <p>Too many matches, specify another filter</p>
			} else if (filteredCountries.length === 0) {
				return <p>No match found. Please, try another filter</p>
			} else if (filteredCountries.length === 1) {
				return countryInfo
			} else {
				return countriesName
			}
		}
	}

	return (
		<div>
			<h1>Data for countries</h1>
			<div>
				find countries{' '}
				<input value={findValue} onChange={handleFindInput} />
			</div>
			{countriesList()}
		</div>
	)
}

export default App
