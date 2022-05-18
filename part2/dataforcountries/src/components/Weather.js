import React, { useState, useEffect } from 'react'
import axios from 'axios'

const OPENWEATHER_API_URL = process.env.REACT_APP_OPENWEATHER_URL
const OPENWEATHER_APPID = process.env.REACT_APP_OPENWEATHER_APPID

const Weather = ({ name, latlng }) => {
	const [weather, setWeather] = useState(null)

	const [lat, lon] = latlng

	useEffect(() => {
		const getWeather = async () => {
			const res = await axios.get(
				`${OPENWEATHER_API_URL}?units=metric&lat=${lat}&lon=${lon}&appid=${OPENWEATHER_APPID}`
			)
			setWeather(res.data)
		}
		getWeather()
	}, [lat, lon])

	return (
		<>
			<h3>Weather in {name}</h3>
			{weather ? (
				<>
					<p>temperature: {weather.main.temp} Celcius</p>
					<img
						src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt={`${weather.weather.main} icon`}
					/>
					<p>wind: {weather.wind.speed} m/s</p>
				</>
			) : (
				'loading weather...'
			)}
		</>
	)
}

export default Weather
