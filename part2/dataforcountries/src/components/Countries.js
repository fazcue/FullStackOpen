import React from 'react'

const Countries = ({ name, setFindValue }) => {
	return (
		<>
			<p>{name}</p>
			<button onClick={() => setFindValue(name)}>show info</button>
		</>
	)
}

export default Countries
