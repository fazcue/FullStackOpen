import React from 'react'
import Weather from './Weather'

const Country = ({ name, capital, area, languages, flag, latlng }) => {
	const langNames = Object.values(languages)

	return (
		<>
			<h2>{name}</h2>
			<p>capital: {capital}</p>
			<p>area: {area}</p>
			{langNames.length > 0 && (
				<>
					<h3>languages:</h3>
					<ul>
						{langNames.map((lang) => (
							<li key={lang}>{lang}</li>
						))}
					</ul>
				</>
			)}
			<img src={flag} alt={`flag of ${name}`} />
			<Weather name={name} latlng={latlng} />
		</>
	)
}

export default Country
